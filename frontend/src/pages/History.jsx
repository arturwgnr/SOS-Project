import { useEffect, useState } from "react";
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

  useEffect(() => {
    const saved = localStorage.getItem("reports");
    if (saved) {
      const parsed = JSON.parse(saved);
      const sorted = parsed.sort((a, b) => new Date(b.date) - new Date(a.date));
      setReports(sorted);
      setFilteredReports(sorted);
    }
  }, []);

  const saveReports = (data) => {
    localStorage.setItem("reports", JSON.stringify(data));
    setReports(data);
    setFilteredReports(
      [...data].sort((a, b) => new Date(b.date) - new Date(a.date))
    );
  };

  const handleManualAdd = async (e) => {
    e.preventDefault();
    if (
      !newReport.id ||
      !newReport.client ||
      !newReport.date ||
      !newReport.pdfFile
    ) {
      alert("⚠ Preencha todos os campos e envie um PDF.");
      return;
    }

    const file = newReport.pdfFile;
    const reader = new FileReader();

    reader.onloadend = () => {
      const pdfUrl = reader.result;

      const report = {
        id: newReport.id,
        type: newReport.type,
        client: newReport.client,
        date: newReport.date,
        pdfUrl,
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
      alert("✅ Documento adicionado ao histórico!");
    };

    reader.readAsDataURL(file);
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

    if (startDate) {
      filtered = filtered.filter(
        (r) => new Date(r.date) >= new Date(startDate)
      );
    }
    if (endDate) {
      filtered = filtered.filter((r) => new Date(r.date) <= new Date(endDate));
    }

    setFilteredReports(filtered);
  };

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

      <div className="history-cards">
        {filteredReports.map((report) => (
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
              {new Date(report.date).toLocaleDateString("pt-BR")}
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
      </div>

      <table className="history-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Tipo</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredReports.map((report) => (
            <tr key={report.id}>
              <td>{report.id}</td>
              <td>{report.client}</td>
              <td>
                {report.type === "paleteira" ? "Paleteira" : "Empilhadeira"}
              </td>
              <td>{new Date(report.date).toLocaleDateString("pt-BR")}</td>
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
