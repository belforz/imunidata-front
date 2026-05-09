import type { HttpMethod } from "../types";
import { Forms } from "./forms";
import { ResponseArea } from "./ui/responseArea";

interface CardProps {
  httpMethod: HttpMethod;
}

export function Card({ httpMethod }: CardProps) {
  return (
    <>
      <Forms httpMethod={httpMethod} />
      <ResponseArea response={`Resposta de exemplo para ${httpMethod}`} />
    </>
  );
}
