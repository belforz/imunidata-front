import { useState } from "react";
import {
  getVacinacaoData,
  postBodyRequest,
  putVacinacaoData,
  deleteVacinacaoData,
  postBodyFileRequest,
} from "../config/imunidataService";
import { Notifications } from "../components/notifications";

function notify(type: "success" | "warn" | "error" | "info", message: string, status: number) {
  Notifications(type, message, `Status ${status}`);
}

function notifyError(err: any) {
  const status = err?.response?.status;
  if (status === 404) notify("warn", "Não encontrado", status);
  else if (status === 500) notify("error", "Erro interno", status);
  else notify("error", "Erro na requisição", status ?? 0);
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
      notify("success", "Busca concluída", res.status);
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
      notify("success", "Criado com sucesso", res.status);
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
      notify("success", "Arquivo importado com sucesso", res.status);
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
      notify("success", "Atualizado com sucesso", res.status);
      if (onSuccess) onSuccess(res);
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
      notify("success", "Removido com sucesso", res.status);
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
