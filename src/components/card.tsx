import { useState } from "react";
import type { HttpMethod, GetMode } from "../types";
import { Forms } from "./forms";
import { ResponseArea } from "./ui/responseArea";
import { useImuniDataApi } from "../hooks/useImuniDataApi";

interface CardProps {
  httpMethod: HttpMethod;
  getMode?: GetMode;
}

export function Card({ httpMethod, getMode = "id" }: CardProps) {
  const { loading, response, error, search, create, createWithFile, update, deleteData } = useImuniDataApi();
  const [formKey, setFormKey] = useState(0);
  const resetForm = () => setFormKey(k => k + 1);

  function handleSubmit(data: Record<string, unknown>) {
    if (httpMethod === "GET") {
      search({
        id: (data.id as string) || undefined,
        estado: (data.estado as string) || undefined,
        vacina: (data.vacina as string) || undefined,
      });
    } else if (httpMethod === "POST") {
      create(data, resetForm);
    } else if (httpMethod === "PUT") {
      update(data.id as string, data, resetForm);
    } else if (httpMethod === "DELETE") {
      deleteData(data.id as string);
    }
  }

  return (
    <>
      <Forms key={formKey} httpMethod={httpMethod} loading={loading} onSubmit={handleSubmit} onSubmitFile={createWithFile} getMode={getMode} />
      <ResponseArea response={response} loading={loading} error={error} />
    </>
  );
}
