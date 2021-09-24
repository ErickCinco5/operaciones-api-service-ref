import { Document } from 'mongoose';

export interface ICatreglas extends Document {
    _id?: string;
    nombre: string;
    tipo: string;
    activo: boolean;
    createdDate: string;
}