import { useState } from "react";
import {
  getVacinacaoData,
  postBodyRequest,
  putVacinacaoData,
  deleteVacinacaoData,
  postBodyFileRequest,
} from "../config/imunidataService";
import { Notifications } from "../components/notifications";

type NotifyLevel = "success" | "warn" | "error" | "info";

const notify = (level: NotifyLevel, title: string, description?: string) => {
  Notifications(level, title, description ?? "");
};

// not made by me, but adapted from https://stackoverflow.com/a/77086709/14347562
function extractServerError(resp: any) {
  if (!resp) return null;
  const d = resp.data;
  if (!d) return null;
  const message = d.message || d.error || null;
  const statusString = d.status || resp.status || null; 
  const parsedStatus = typeof statusString === "string" ? parseInt(statusString.split(" ")[0], 10) : statusString;
  const description = d.error || (d.status ? String(d.status) : undefined) || undefined;
  return { message, status: parsedStatus || 0, description };
}

// not made by me, but adapted from https://stackoverflow.com/a/77086709/14347562
function notifyError(err: any) {
  const resp = err?.response;
  const server = extractServerError(resp);
  if (server && server.message) {
    const level: NotifyLevel = server.status >= 500 ? "error" : server.status >= 400 ? "warn" : "error";
    Notifications(level, server.message, server.description ?? `Status ${server.status}`);
    return;
  }

  const status = resp?.status;
  if (status === 208 || status === 409) notify("warn", "Conflito/registro existente", `Status ${status}`);
  else if (status === 404) notify("warn", "Não encontrado", `Status ${status}`);
  else if (status === 500) notify("error", "Erro interno", `Status ${status}`);
  else notify("error", "Erro na requisição", `Status ${status ?? 0}`);
}

interface ApiState {
  loading: boolean;
  response: unknown;
  error: string | null;
}

export function useImuniDataApi() {
  const [state, setState] = useState<ApiState>({
    loading: false,
    response: undefined,
    error: null,
  });

  function setLoading() {
    setState({ loading: true, response: undefined, error: null });
  }

  function setSuccess(response: unknown) {
    setState({ loading: false, response, error: null });
  }

  function setError(error: string) {
    setState({ loading: false, response: undefined, error });
  }

  async function search(params: { id?: string; vacina?: string; estado?: string }, onSuccess?: (res: any) => void) {
    setLoading();
    try {
      const res = await getVacinacaoData(params);
      setSuccess(res.data);
      notify("success", "Busca concluída", `Status ${res.status}`);
      if (onSuccess) onSuccess(res);
    } catch (err: any) {
      notifyError(err);
      setError(err.message);
    }
  }

  async function create(body: Record<string, unknown>, onSuccess?: (res: any) => void) {
    setLoading();
    try {
      const res = await postBodyRequest(body);
      setSuccess(res.data);
      notify("success", "Criado com sucesso", `Status ${res.status}`);
      if (onSuccess) onSuccess(res);
    } catch (err: any) {
      notifyError(err);
      setError(err.message);
    }
  }

  async function createWithFile(file: File, onSuccess?: (res: any) => void) {
    setLoading();
    try {
      const res = await postBodyFileRequest(file);
      setSuccess(res.data);
      const status = res.status;
      if (status === 201) notify("success", "Arquivo importado com sucesso", `Status ${status}`);
      else if (status === 409) notify("warn", "Arquivo já existe ou conflito de dados", `Status ${status}`);
      else notify("success", "Arquivo importado", `Status ${status}`);
      if (onSuccess) onSuccess(res);
    } catch (err: any) {
      notifyError(err);
      setError(err.message);
    }
  }

  async function update(id: string, body: Record<string, unknown>, onSuccess?: (res: any) => void) {
    setLoading();
    try {
      const res = await putVacinacaoData(id, body);
      setSuccess(res.data);
      notify("success", "Atualizado com sucesso", `Status ${res.status}`);
      if (onSuccess) onSuccess(res);
      if (res.status === 404) notify("warn", "Registro não encontrado para atualização", `Status ${res.status}`);
      if (res.status === 409) notify("warn", "Conflito de dados na atualização", `Status ${res.status}`);
    } catch (err: any) {
      notifyError(err);
      setError(err.message);
    }
  }

  async function deleteData(id: string, onSuccess?: (res: any) => void) {
    setLoading();
    try {
      const res = await deleteVacinacaoData(id);
      setSuccess(res.data);
      notify("success", "Removido com sucesso", `Status ${res.status}`);
      if (onSuccess) onSuccess(res);
    } catch (err: any) {
      notifyError(err);
      setError(err.message);
    }
  }

  return {
    loading: state.loading,
    response: state.response,
    error: state.error,
    search,
    create,
    update,
    deleteData,
    createWithFile,
  };
}
