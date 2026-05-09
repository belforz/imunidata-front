import type { HttpMethod } from "../types";
import { Forms } from "./forms";
import { ResponseArea } from "./ui/responseArea";
import { useImuniDataApi } from "../hooks/useImuniDataApi";

interface CardProps {
  httpMethod: HttpMethod;
  showGetFilter?: boolean;
}

export function Card({ httpMethod, showGetFilter = true }: CardProps) {
  const { loading, response, error, search, create, createWithFile, update, deleteData } = useImuniDataApi();

  function handleSubmit(data: Record<string, unknown>) {
    if (httpMethod === "GET") {
      search({ estado: data.estado as string, vacina: data.vacina as string });
    } else if (httpMethod === "POST") {
      create(data);
    } else if (httpMethod === "PUT") {
      update(data.id as string, data);
    } else if (httpMethod === "DELETE") {
      deleteData(data.id as string);
    }
  }

  return (
    <>
      <Forms httpMethod={httpMethod} loading={loading} onSubmit={handleSubmit} onSubmitFile={createWithFile} showGetFilter={showGetFilter} />
      <ResponseArea response={response} loading={loading} error={error} />
    </>
  );
}
