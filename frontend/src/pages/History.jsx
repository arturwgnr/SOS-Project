import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/History.css";

export default function History() {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [filter, setFilter] = useState({ startDate: "", endDate: "" });

  const [newReport, setNewReport] = useState({
    id: "",
    type: "paleteira",
    client: "",
    date: "",
    pdfFile: null,
  });

  // 🔹 Estado da paginação
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 5; // número de registros por página

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    async function fetchReports() {
      try {
        let res;
        if (user.role === "admin") {
          // 🔹 Admin vê todos os relatórios
          res = await axios.get(`${import.meta.env.VITE_API_URL}/reports`);
        } else {
          // 🔹 Funcionário vê só os dele
          res = await axios.get(
            `${import.meta.env.VITE_API_URL}/reports/user/${user.id}`
          );
        }

        const sorted = res.data.Reports?.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setReports(sorted || []);
        setFilteredReports(sorted || []);
      } catch (err) {
        console.error(err);
      }
    }

    fetchReports();
  }, []);

  const saveReports = (data) => {
    localStorage.setItem("reports", JSON.stringify(data));
    const sorted = [...data].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    setReports(sorted);
    setFilteredReports(sorted);
    setCurrentPage(1);
  };

  const handleManualAdd = async (e) => {
    e.preventDefault();
    if (
      !newReport.id ||
      !newReport.client ||
      !newReport.date ||
      !newReport.pdfFile
    ) {
      toast.warning("Preencha todos os campos e envie um PDF.");
      return;
    }

    const now = new Date();
    const formattedDateTime = now.toISOString();

    const reader = new FileReader();
    reader.onloadend = () => {
      const report = {
        id: newReport.id,
        type: newReport.type,
        client: newReport.client,
        date: formattedDateTime, // grava data + hora completa
        pdfUrl: reader.result,
      };

      const updated = [...reports, report];
      saveReports(updated);

      setNewReport({
        id: "",
        type: "paleteira",
        client: "",
        date: "",
        pdfFile: null,
      });
      toast.success("Documento adicionado ao histórico!");
    };

    reader.readAsDataURL(newReport.pdfFile);
  };

  const handleDownload = (url, id, type) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = `Relatorio-${type}-${id}.pdf`;
    link.click();
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...filter, [name]: value };
    setFilter(updated);
    applyFilter(updated);
  };

  const applyFilter = (updatedFilter) => {
    const { startDate, endDate } = updatedFilter;
    let filtered = [...reports];

    if (startDate)
      filtered = filtered.filter(
        (r) => new Date(r.date) >= new Date(startDate)
      );
    if (endDate)
      filtered = filtered.filter((r) => new Date(r.date) <= new Date(endDate));

    setFilteredReports(filtered);
    setCurrentPage(1);
  };

  // 🔹 Paginação
  const totalPages = Math.ceil(filteredReports.length / reportsPerPage);
  const startIndex = (currentPage - 1) * reportsPerPage;
  const currentReports = filteredReports.slice(
    startIndex,
    startIndex + reportsPerPage
  );

  return (
    <div className="history">
      <h1>Adicionar Relatórios</h1>

      <form className="manual-form" onSubmit={handleManualAdd}>
        <h2>Adicionar relatório manualmente</h2>
        <div className="form-row">
          <input
            type="text"
            placeholder="ID"
            value={newReport.id}
            onChange={(e) => setNewReport({ ...newReport, id: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Cliente"
            value={newReport.client}
            onChange={(e) =>
              setNewReport({ ...newReport, client: e.target.value })
            }
            required
          />
        </div>

        <div className="form-row">
          <select
            value={newReport.type}
            onChange={(e) =>
              setNewReport({ ...newReport, type: e.target.value })
            }
          >
            <option value="paleteira">Paleteira</option>
            <option value="empilhadeira">Empilhadeira</option>
          </select>

          <input
            type="date"
            value={newReport.date}
            onChange={(e) =>
              setNewReport({ ...newReport, date: e.target.value })
            }
            required
          />
        </div>

        <input
          type="file"
          accept="application/pdf"
          onChange={(e) =>
            setNewReport({
              ...newReport,
              pdfFile: e.target.files ? e.target.files[0] : null,
            })
          }
          required
        />

        <button className="addbtn" type="submit">
          + Adicionar ao histórico
        </button>
      </form>

      {/* 🔍 FILTRO POR DATA */}
      <div className="filter-container">
        <h2>Filtrar por Data</h2>
        <div className="form-row">
          <label>
            Início:
            <input
              type="date"
              name="startDate"
              value={filter.startDate}
              onChange={handleFilterChange}
            />
          </label>
          <label>
            Fim:
            <input
              type="date"
              name="endDate"
              value={filter.endDate}
              onChange={handleFilterChange}
            />
          </label>
        </div>
      </div>

      {/* 🔹 MOBILE VIEW */}
      <div className="history-cards">
        {currentReports.map((report) => (
          <div key={report.id} className="history-card">
            <h3>{report.client}</h3>
            <p>
              <strong>ID:</strong> {report.id}
            </p>
            <p>
              <strong>Tipo:</strong>{" "}
              {report.type === "paleteira" ? "Paleteira" : "Empilhadeira"}
            </p>
            <p>
              <strong>Data:</strong>{" "}
              {new Date(report.date).toLocaleDateString("pt-BR")}{" "}
              {new Date(report.date).toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <div className="history-actions">
              <button
                onClick={() =>
                  handleDownload(report.pdfUrl, report.id, report.type)
                }
              >
                ⬇ Baixar
              </button>
            </div>
          </div>
        ))}

        {totalPages > 1 && (
          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              ◀ Anterior
            </button>
            <span>
              {currentPage} / {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Próximo ▶
            </button>
          </div>
        )}
      </div>

      {/* 🔹 DESKTOP TABLE */}
      <table className="history-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Tipo</th>
            <th>Data / Hora</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {currentReports.map((report) => (
            <tr key={report.id}>
              <td>{report.id}</td>
              <td>{report.client}</td>
              <td>
                {report.type === "paleteira" ? "Paleteira" : "Empilhadeira"}
              </td>
              <td>
                {new Date(report.date).toLocaleDateString("pt-BR")}
                {" - "}
                {new Date(report.date).toLocaleTimeString("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>
              <td>
                <button
                  className="downloadbtn"
                  onClick={() =>
                    handleDownload(report.pdfUrl, report.id, report.type)
                  }
                >
                  Download
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
