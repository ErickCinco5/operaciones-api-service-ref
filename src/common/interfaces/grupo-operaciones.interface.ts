import { Document } from 'mongoose';

export interface IGrupoOperaciones extends Document {
    _id?: string;
    nombre: string;
    activo: boolean;
    createdDate: string;
}