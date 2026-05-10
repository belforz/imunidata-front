/// <reference types="react/client" />


export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
export type GetMode = 'id' | 'estado' | 'vacina' | 'ambos' | 'todos'

export type ImuniData = {
    id: string;
    município: string;
    estado: string;
    vacina: string;
    dose: string;
    quantidadeAplicada: number;
    dataRegistro: Date;
}
