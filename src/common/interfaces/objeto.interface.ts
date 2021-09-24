import { Document } from 'mongoose';

export interface IObjeto extends Document {
    _id?: string;
    nombre: string;
    tipoObjeto: boolean;
    activo: boolean;
    docsSoporte: [any];
    atributos: [any];
    reglas: [any];
    createdDate: string;
}