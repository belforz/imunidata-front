import { useState, useEffect } from "react";
import { LucideSave, Search } from "lucide-react";
import { Button } from "../ui/button";
import { Field } from "../ui/field";
import { SectionTitle } from "../ui/sectionTitle";
import type { HttpMethod, GetMode } from "../types";
import { WarnBox } from "../ui/warnBox";
import { InfoBox} from "../ui/infoBox";

interface FormsProps {
  httpMethod: HttpMethod;
  loading: boolean;
  onSubmit: (data: Record<string, unknown>) => void;
  onSubmitFile?: (file: File) => void;
  response?: unknown;
  getMode?: GetMode;
}

export function Forms({ httpMethod, loading, onSubmit, onSubmitFile, response, getMode = "id" }: FormsProps) {
  // GET
  const [getId, setGetId] = useState("");
  const [getEstado, setGetEstado] = useState("");
  const [getVacina, setGetVacina] = useState("");

  function normalizeLocalDateTime(value: string) {
    if (!value) return undefined;
    // browser `datetime-local` usually yields YYYY-MM-DDTHH:MM
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value)) return `${value}:00`;
    // if user provided only date YYYY-MM-DD
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return `${value}T00:00:00`;
    return value;
  }

  // POST
  const [municipio, setMunicipio] = useState("");
  const [estado, setEstado] = useState("");
  const [vacina, setVacina] = useState("");
  const [dose, setDose] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [dataRegistro, setDataRegistro] = useState("");

  // PUT
  const [putId, setPutId] = useState("");
  const [putMunicipio, setPutMunicipio] = useState("");
  const [putEstado, setPutEstado] = useState("");
  const [putVacina, setPutVacina] = useState("");
  const [putDose, setPutDose] = useState("");
  const [putQuantidade, setPutQuantidade] = useState("");
  const [putDataRegistro, setPutDataRegistro] = useState("");

  // DELETE
  const [deleteId, setDeleteId] = useState("");
  const [motivo, setMotivo] = useState("");
  const [confirmar, setConfirmar] = useState("");

  // validadores
  const isInteger = (v: string) => /^[0-9]+$/.test(v || "");
  const isNonEmpty = (v: string) => typeof v === "string" && v.trim().length > 0;
  const safeParseInt = (v: string) => {
    const n = parseInt(v as string, 10);
    return Number.isNaN(n) ? undefined : n;
  };

  // when parent performs GET by id, `response` will contain payload; populate PUT fields
  useEffect(() => {
    if (httpMethod !== "PUT") return;
    const res: any = response as any;
    if (!res) return;
    const payload = res.data ?? res;
    if (!payload) return;
    setPutId(payload.id ? String(payload.id) : "");
    setPutMunicipio(payload.municipio ?? "");
    setPutEstado(payload.estado ?? "");
    setPutVacina(payload.vacina ?? "");
    setPutDose(payload.dose ?? "");
    setPutQuantidade(payload.quantidadeAplicada !== undefined ? String(payload.quantidadeAplicada) : "");
    setPutDataRegistro(payload.dataRegistro ?? "");
  }, [response]);

  return (
    <>
      {httpMethod === "GET" && (
        <div className="flex flex-col gap-5">
          <SectionTitle>Parametros de Busca</SectionTitle>
          <InfoBox>
            {getMode === "id" && <>O campo Id da Vacinação é obrigatório. Informe o valor e pressione Buscar.</>}
            {getMode === "estado" && <>Informe o Estado para filtrar as vacinações registradas.</>}
            {getMode === "vacina" && <>Informe o nome da Vacina para filtrar as vacinações registradas.</>}
            {getMode === "ambos" && <>Informe o Estado e/ou a Vacina para filtrar as vacinações.</>}
            {getMode === "todos" && <>Busca todas as vacinações registradas.</>}
          </InfoBox>
          <div className="flex gap-2.5 mb-6">
            <Field
              label="Id da Vacinação (obrigatório)"
              placeholder="Número inteiro"
              className="flex-1"
              value={getId}
              onChange={setGetId}
              isVisible={getMode === "id"}
            />
            <Field
              label="Por Estado"
              placeholder="String"
              className="flex-1"
              value={getEstado}
              onChange={setGetEstado}
              isVisible={getMode === "estado" || getMode === "ambos"}
            />
            <Field
              label="Por Vacina"
              placeholder="String"
              className="flex-1"
              value={getVacina}
              onChange={setGetVacina}
              isVisible={getMode === "vacina" || getMode === "ambos"}
            />
            <div className="flex items-end">
              <Button
                label="Buscar"
                colorClass="bg-green-700 hover:bg-green-800"
                onClick={() => {
                  if (getMode === "id") onSubmit({ id: getId });
                  else if (getMode === "estado") onSubmit({ estado: getEstado });
                  else if (getMode === "vacina") onSubmit({ vacina: getVacina });
                  else if (getMode === "todos") onSubmit({});
                  else onSubmit({ estado: getEstado, vacina: getVacina });
                }}
                icon={Search}
                disabled={
                  loading ||
                  (getMode === "id" ? !isInteger(getId) :
                   getMode === "estado" ? !isNonEmpty(getEstado) :
                   getMode === "vacina" ? !isNonEmpty(getVacina) :
                   getMode === "todos" ? false :
                   (!isNonEmpty(getEstado) && !isNonEmpty(getVacina)))
                }
              />
            </div>
          </div>
        </div>
      )}

      {httpMethod === "POST" && (
        <>
          <SectionTitle>Adicionar Nova Vacinação</SectionTitle>

          {/* Modo manual */}
          <div className="grid grid-cols-2 gap-3.5 mb-4">
            <Field label="Município" placeholder="String" value={municipio} onChange={setMunicipio} />
            <Field label="Estado" placeholder="String" value={estado} onChange={setEstado} />
            <Field label="Vacina" placeholder="String" value={vacina} onChange={setVacina} />
            <Field label="Dose" placeholder="String" value={dose} onChange={setDose} />
            <Field label="Quantidade Aplicada" placeholder="Número inteiro" type="number" value={quantidade} onChange={setQuantidade} />
            <Field label="Data de Registro" placeholder="YYYY-MM-DDTHH:MM" type="datetime-local" value={dataRegistro} onChange={setDataRegistro} />
          </div>
          <div className="flex items-center justify-between mb-5">
            <Button
              label="Cadastrar Vacinação"
              colorClass="bg-blue-800 hover:bg-blue-900"
              onClick={() => onSubmit({ municipio, estado, vacina, dose, quantidadeAplicada: safeParseInt(quantidade), dataRegistro: normalizeLocalDateTime(dataRegistro) })}
              disabled={loading || !isNonEmpty(municipio) || !isNonEmpty(estado) || !isNonEmpty(vacina) || !isNonEmpty(dose) || !isInteger(quantidade) || !isNonEmpty(dataRegistro)}
            />
          </div>

          {/* Separador */}
          <div className="flex items-center gap-3 my-2">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-[11px] text-slate-400 uppercase tracking-widest font-medium">ou via arquivo</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Upload JSON / CSV */}
          <div className="mt-3">
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
              Importar arquivo JSON ou CSV
            </label>
            <input
              type="file"
              accept=".json,.csv"
              disabled={loading}
              className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-800 hover:file:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) onSubmitFile?.(file);
              }}
            />
          </div>
        </>
      )}

      {httpMethod === "PUT" && (
        <>
          <SectionTitle>Atualizar Vacinação</SectionTitle>
          <div className="flex gap-2.5 mb-5 items-end">
            <Field
              label="ID da Vacinação"
              placeholder="Número inteiro"
              className="flex-1"
              value={putId}
              onChange={setPutId}
            />
            <Button
              label="Buscar"
              colorClass="bg-amber-600 hover:bg-amber-700"
              onClick={() => onSubmit({ id: putId })}
              icon={Search}
              disabled={loading || !isInteger(putId)}
            />
          </div>
          <div className="grid grid-cols-2 gap-3.5 mb-4">
            <Field label="Município" placeholder="String" value={putMunicipio} onChange={setPutMunicipio} />
            <Field label="Estado" placeholder="String" value={putEstado} onChange={setPutEstado} />
            <Field label="Vacina" placeholder="String" value={putVacina} onChange={setPutVacina} />
            <Field label="Dose" placeholder="String" value={putDose} onChange={setPutDose} />
            <Field label="Quantidade Aplicada" placeholder="Número inteiro" type="number" value={putQuantidade} onChange={setPutQuantidade} />
            <Field label="Data de Registro" placeholder="YYYY-MM-DDTHH:MM" type="datetime-local" value={putDataRegistro} onChange={setPutDataRegistro} />
          </div>
          <Button
            label="Atualizar Vacinação"
            colorClass="bg-amber-600 hover:bg-amber-700"
            icon={LucideSave}
            onClick={() => onSubmit({ id: putId, municipio: putMunicipio, estado: putEstado, vacina: putVacina, dose: putDose, quantidadeAplicada: safeParseInt(putQuantidade), dataRegistro: normalizeLocalDateTime(putDataRegistro) })}
            disabled={loading || !isInteger(putId)}
          />
        </>
      )}

      {httpMethod === "DELETE" && (
        <>
          <SectionTitle>Excluir Vacinação</SectionTitle>
          <WarnBox>
            Ação irreversível. Este registro será excluído permanentemente do
            sistema SUS. Certifique-se de que não há prontuários ou atendimentos
            vinculados ao paciente antes de continuar.
          </WarnBox>
          <div className="grid grid-cols-2 gap-3.5 mb-4">
            <Field label="ID do Vacinacao" placeholder="Numero inteiro" value={deleteId} onChange={setDeleteId} />
          </div>
          <Field
            label="Motivo da exclusão (Obrigatório)"
            options={["Erro na vacinação", "Cadastro duplicado", "Erro de cadastro", "Solicitação judicial"]}
            className="mb-4"
            value={motivo}
            onChange={setMotivo}
          />
          <Field
            label='Digite "CONFIRMAR" para prosseguir'
            placeholder="CONFIRMAR"
            className="mb-5"
            value={confirmar}
            onChange={setConfirmar}
          />
          <Button
            label="Excluir Vacinação"
            colorClass="bg-red-600 hover:bg-red-700"
            onClick={() => onSubmit({ id: deleteId, motivo, confirmar })}
            disabled={loading || confirmar !== "CONFIRMAR" || !isInteger(deleteId)}
          />
        </>
      )}
    </>
  );
}
