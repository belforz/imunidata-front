import { LucideSave, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Field } from "./ui/field";
import { SectionTitle } from "./ui/sectionTitle";
import type { HttpMethod } from "../types";
import { WarnBox } from "./ui/warnBox";
import { InfoBox} from "./ui/infoBox";

export function Forms({ httpMethod }: { httpMethod: HttpMethod }) {
  return (
    <>
      {httpMethod === "GET" && (
        <div className="flex flex-col gap-5">
          <SectionTitle>Parametros de Busca</SectionTitle>
          <InfoBox>
            O campo Id da Vacinação é obrigatório. Informe o valor e pressione
            Buscar — os dados do paciente serão carregados automaticamente sem
            recarregar a página.
          </InfoBox>
          <div className="flex gap-2.5 mb-6">
            <Field
              label="Id da Vacinação (obrigatório)"
              placeholder="Número inteiro"
              className="flex-1"
            />
            <Field
              label="Por Estado ou Cidade (opcional)"
              placeholder="String"
              className="flex-1"
            />
            <div className="flex items-end">
              <Button
                label="Buscar"
                colorClass="bg-green-700 hover:bg-green-800"
                onClick={() => alert("Será implementado depois!")}
                icon={Search}
              />
            </div>
          </div>
        </div>
      )}{" "}
      :
      {httpMethod === "POST" && (
        <>
          <SectionTitle>Adicionar Nova Vacinação</SectionTitle>
          <div className="grid grid-cols-2 gap-3.5 mb-4">
            {/* municipio,estado,vacina,dose,quantidadeAplicada,dataRegistro */}
            <Field label="Município" placeholder="String" />
            <Field label="Estado" placeholder="String" />
            <Field label="Vacina" placeholder="String" />
            <Field label="Dose" placeholder="String" />
            <Field label="Quantidade Aplicada" placeholder="Número inteiro" />
            <Field label="Data de Registro" placeholder="YYYY-MM-DD" />
          </div>
          <div className="flex items-center justify-between mb-5">
            <Button
              label="Cadastrar Paciente"
              style="bg-blue-800 hover:bg-blue-900"
            />
          </div>
        </>
      )}
      :
      {httpMethod === "PUT" && (
        <>
          <SectionTitle>Atualizar Vacinação</SectionTitle>
          <div className="flex gap-2.5 mb-5 item-end">
            <Field
              label="ID da Vacinação"
              placeholder="Número inteiro"
              className="flex-1"
            />
            <Button
              label="Buscar"
              colorClass="bg-amber-600 hover:bg-amber-700"
              onClick={() => alert("Será implementado depois!")}
              icon={Search}
            />
          </div>
          <div className="grid grid-cols-2 gap-3.5 mb-4">
            {/* municipio,estado,vacina,dose,quantidadeAplicada,dataRegistro */}
            <Field label="Município" placeholder="String" />
            <Field label="Estado" placeholder="String" />
            <Field label="Vacina" placeholder="String" />
            <Field label="Dose" placeholder="String" />
            <Field label="Quantidade Aplicada" placeholder="Número inteiro" />
            <Field label="Data de Registro" placeholder="YYYY-MM-DD" />
          </div>
          <Button
            label="Atualizar Vacinação"
            style="bg-amber-600 hover:bg-amber-700"
            icon={LucideSave}
          />
        </>
      )}{" "}
      :{" "}
      {httpMethod === "DELETE" && (
        <>
          <SectionTitle>Excluir Vacinação</SectionTitle>
          <WarnBox>
            Ação irreversível. Este registro será excluído permanentemente do
            sistema SUS. Certifique-se de que não há prontuários ou atendimentos
            vinculados ao paciente antes de continuar.
          </WarnBox>
          <div className="grid grid-cols-2 gap-3.5 mb-4">
            <Field label="ID do Vacinacao" placeholder="Numero inteiro" />
          </div>
          <Field
            label="Motivo da exclusão (Obrigatório)"
            options={[
              "Erro na vacinação",
              "Cadastro duplicado",
              "Erro de cadastro",
              "Solicitação judicial",
            ]}
            className="mb-4"
          />

          <Field
            label='Digite "CONFIRMAR" para prosseguir'
            placeholder="CONFIRMAR"
            className="mb-5"
          />
          <Button
            label="Excluir Vacinação"
            style="bg-red-600 hover:bg-red-700"
            onClick={() => alert("Será implementado depois!")}
          />
        </>
      )}
    </>
  );
}
