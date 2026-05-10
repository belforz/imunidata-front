import { useState } from "react";
import {
  getVacinacaoData,
  postBodyRequest,
  putVacinacaoData,
  deleteVacinacaoData,
  postBodyFileRequest,
} from "../config/imunidataService";

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

  async function search(params: { id?: string; vacina?: string; estado?: string }) {
    setLoading();
    try {
      const data = await getVacinacaoData(params);
      setSuccess(data);
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function create(body: Record<string, unknown>) {
    setLoading();
    try {
      const data = await postBodyRequest(body);
      setSuccess(data);
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function createWithFile(file: File) {
    setLoading();
    try {
      const data = await postBodyFileRequest(file);
      setSuccess(data);
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function update(id: string, body: Record<string, unknown>) {
    setLoading();
    try {
      const data = await putVacinacaoData(id, body);
      setSuccess(data);
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function deleteData(id: string) {
    setLoading();
    try {
      const data = await deleteVacinacaoData(id);
      setSuccess(data);
    } catch (err: any) {
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
