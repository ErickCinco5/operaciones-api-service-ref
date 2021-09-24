import { Document } from 'mongoose';

export interface IAtributo extends Document {
    _id?: string;
    nombre: string;
    tipoEntrada: string;
    valor?: [string];
    defaultValue?: string;
    tipo?: string;
    activo: boolean;
    createdDate: string;
}