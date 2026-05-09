import { imunidataApi } from "../api/axios-config";
import { Notifications } from "../components/notifications";

export const checkChatHealth = async() =>{
    try {
    const response = await imunidataApi.get('/healthz');
    return response.data;
    } catch(error: any){
        console.error("API fora do ar:", error)
        Notifications("error", "API fora do ar", error.message);
        throw error;
    }
}

// POST normal para enviar o body da requisição, sem arquivo

export const postBodyRequest = async( body: any) => {
    try {
        const response = await imunidataApi.post('/vacinacao',
            {
                "body": body
            }
        );
        return response.data;
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
        return response.data;
    }
    catch(error: any){
        console.error("Erro ao enviar a requisição:", error);
        Notifications("error", "Erro ao enviar a requisição", error.message);
        throw error;
    }
}

// GET /vacinacao  |  GET /vacinacao?vacina=BCG  |  GET /vacinacao?estado=SP

export const getVacinacaoData = async(params: {vacina?: string, estado?: string}) => {
    try {
        const response = await imunidataApi.get('/vacinacao', { params });
        if( params.vacina != null && params.estado != null) {
            return response.data.filter((item: any) => item.vacina === params.vacina && item.estado === params.estado);

        }
        if( params.vacina != null) { return response.data.filter((item: any) => item.vacina === params.vacina); }
        if( params.estado != null) { return response.data.filter((item: any) => item.estado === params.estado); }
        else{
            return response.data;
        }
    }
    catch(error: any){
        console.error("Erro ao buscar os dados de vacinação:", error);
        Notifications("error", "Erro ao buscar os dados de vacinação", error.message);
        throw error;
    }
}

// PUT /vacinacao?$id para atualizar os dados de vacinação

export const putVacinacaoData = async(id: string, body: any) => {
    try {
        const response = await imunidataApi.put(`/vacinacao?id=${id}`, body);
        return response.data;
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
        const response = await imunidataApi.delete(`/vacinacao?id=${id}`);
        return response.data;
    }
    catch(error: any){
        console.error("Erro ao deletar os dados de vacinação:", error);
        Notifications("error", "Erro ao deletar os dados de vacinação", error.message);
        throw error;
    }
}

