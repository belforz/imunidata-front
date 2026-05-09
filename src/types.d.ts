/// <reference types="react/client" />


export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export type ImuniData = {
    id: string;
    município: string;
    estado: string;
    vacina: string;
    dose: string;
    quantidadeAplicada: number;
    dataDeRegistro: string;
}
