import { imunidataApi } from "../api/axios-config";
import { Notifications } from "../components/notifications";

export const checkChatHealth = async() =>{
    try {
    const response = await imunidataApi.get('/healthz');
    return { data: response.data, status: response.status };
    } catch(error: any){
        console.error("API fora do ar:", error)
        Notifications("error", "API fora do ar", error.message);
        throw error;
    }
}

// POST normal para enviar o body da requisição, sem arquivo

export const postBodyRequest = async( body: any) => {
    try {
        const response = await imunidataApi.post('/vacinacao', body);
        return { data: response.data, status: response.status };
    }
    catch(error: any){
        console.error("Erro ao enviar a requisição:", error);
        Notifications("error", "Erro ao enviar a requisição", error.message);
        throw error;
    }
}

// POST /para csv ou json de uma vez

export const postBodyFileRequest = async(file: File) => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        const response = await imunidataApi.post('/vacinacao/with-file', formData);
        return { data: response.data, status: response.status };
    }
    catch(error: any){
        console.error("Erro ao enviar a requisição:", error);
        Notifications("error", "Erro ao enviar a requisição", error.message);
        throw error;
    }
}

// GET /vacinacao  |  GET /vacinacao?vacina=BCG  |  GET /vacinacao?estado=SP

export const getVacinacaoData = async (params: { id?: string; vacina?: string; estado?: string } = {}) => {
    try {
        const id = params?.id ?? undefined;
        const vacina = params?.vacina ?? undefined;
        const estado = params?.estado ?? undefined;

        const hasId = id !== undefined && String(id).trim() !== "";
        const hasVacina = vacina !== undefined && String(vacina).trim() !== "";
        const hasEstado = estado !== undefined && String(estado).trim() !== "";

        // com id
        if (hasId) {
            const response = await imunidataApi.get(`/vacinacao/${encodeURIComponent(String(id))}`);
            const payload = Array.isArray(response.data) ? (response.data.length ? response.data[0] : null) : response.data;
            return { data: payload, status: response.status };
        }

        // sem filtro, get all
        if (!hasVacina && !hasEstado) {
            const response = await imunidataApi.get("/vacinacao");
            return { data: response.data, status: response.status };
        }

        // com filtros opcionais (vacina, estado ou ambos) — sempre construir um único query
        const query: Record<string, string> = {};
        if (hasVacina) query.vacina = String(vacina);
        if (hasEstado) query.estado = String(estado);

        const queryString = new URLSearchParams(query).toString();
        const url = queryString ? `/vacinacao?${queryString}` : `/vacinacao`;

        const response = await imunidataApi.get(url);
        return { data: response.data, status: response.status };
    } catch (error: any) {
        console.error("Erro ao buscar os dados de vacinação:", error);
        Notifications("error", "Erro ao buscar os dados de vacinação", error.message);
        throw error;
    }
};

// PUT /vacinacao?$id para atualizar os dados de vacinação

export const putVacinacaoData = async(id: string, body: any) => {
    try {
        const response = await imunidataApi.put(`/vacinacao/${encodeURIComponent(String(id))}`, body);
        return { data: response.data, status: response.status };
    }
    catch(error: any){
        console.error("Erro ao atualizar os dados de vacinação:", error);
        Notifications("error", "Erro ao atualizar os dados de vacinação", error.message);
        throw error;
    }
}

// DELETE /vacinacao?$id para deletar os dados de vacinação

export const deleteVacinacaoData = async(id: string) => {
    try {
        const response = await imunidataApi.delete(`/vacinacao/${encodeURIComponent(String(id))}`);
        return { data: response.data, status: response.status };
    }
    catch(error: any){
        console.error("Erro ao deletar os dados de vacinação:", error);
        Notifications("error", "Erro ao deletar os dados de vacinação", error.message);
        throw error;
    }
}

