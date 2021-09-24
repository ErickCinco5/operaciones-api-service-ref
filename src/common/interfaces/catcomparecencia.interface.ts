import { Document, Schema } from 'mongoose';

export interface ICatcomparecencia extends Document {
    _id?: string;
    nombre: string;
    tipoPersona: string;
    persona: Schema.Types.ObjectId;
    activo: boolean;
    atributos?: [Schema.Types.ObjectId];
    createdDate: string;
}