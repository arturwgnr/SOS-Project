import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignaturePad from "../components/SignaturePad";
import { generatePalletReportPDF } from "../utils/pdfGenerator";
import { generatePalletReportId } from "../utils/idGenerator";
import { toast } from "react-toastify";
import axios from "axios";
import "../styles/PalletReport.css";

export default function PalletReport() {
  const nav = useNavigate();

  const [formData, setFormData] = useState({
    client: "",
    city: "",
    name: "",
    phone: "",
    model: "",
    email: "",
    defect: "",
    description: "",
    loan: "",
    loanModel: "",
    clientSignature: "",
    sosSignature: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!formData.loan) newErrors.loan = "Selecione uma opção.";
    if (!formData.clientSignature)
      newErrors.clientSignature = "Assinatura do cliente obrigatória.";
    if (!formData.sosSignature)
      newErrors.sosSignature = "Assinatura do responsável obrigatória.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const id = generatePalletReportId();
      const pdfUrl = await generatePalletReportPDF({ ...formData, id });

      const newReport = {
        id,
        type: "paleteira",
        client: formData.client,
        date: new Date().toISOString(),
        pdfUrl,
      };

      await axios.post(`${import.meta.env.VITE_API_URL}/reports`, newReport);

      toast.success("Relatório salvo no banco!");
      nav("/history");
    }
  };

  return (
    <div className="pallet-report">
      <div className="report-container">
        <h1>Relatório de Serviço Paleteira</h1>

        <form className="report-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>
              Cliente:
              <input
                type="text"
                name="client"
                value={formData.client}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Cidade:
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Nome:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Tel.:
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Marca/Modelo:
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              E-mail:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </label>
          </div>

          <label>
            Defeito relatado pelo cliente:
            <textarea
              name="defect"
              rows="2"
              value={formData.defect}
              onChange={handleChange}
              required
            ></textarea>
          </label>

          <label>
            Descrição do serviço:
            <textarea
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </label>

          <div className="form-row">
            <span>Empréstimo de paleteira:</span>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="loan"
                  value="yes"
                  checked={formData.loan === "yes"}
                  onChange={handleChange}
                />{" "}
                Sim
              </label>
              <label>
                <input
                  type="radio"
                  name="loan"
                  value="no"
                  checked={formData.loan === "no"}
                  onChange={handleChange}
                />{" "}
                Não
              </label>
            </div>
            {errors.loan && <p className="error">{errors.loan}</p>}
          </div>

          <label>
            Marca/Modelo (empréstimo):
            <input
              type="text"
              name="loanModel"
              value={formData.loanModel}
              onChange={handleChange}
            />
          </label>

          <div className="form-row signatures">
            <div>
              <SignaturePad
                label="Assinatura do Cliente"
                onEnd={(dataUrl) =>
                  setFormData((prev) => ({ ...prev, clientSignature: dataUrl }))
                }
              />
              {errors.clientSignature && (
                <p className="error">{errors.clientSignature}</p>
              )}
            </div>
            <div>
              <SignaturePad
                label="Assinatura do Responsável (SOS)"
                onEnd={(dataUrl) =>
                  setFormData((prev) => ({ ...prev, sosSignature: dataUrl }))
                }
              />
              {errors.sosSignature && (
                <p className="error">{errors.sosSignature}</p>
              )}
            </div>
          </div>

          <button type="submit">Salvar Relatório</button>
        </form>
      </div>
    </div>
  );
}
