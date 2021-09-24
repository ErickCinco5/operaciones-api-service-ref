import { Document } from 'mongoose';

export interface ICatalogo extends Document {
    _id?: string;
    nombre: string;
    tipo: string;
    activo: boolean;
    createdDate: string;
}