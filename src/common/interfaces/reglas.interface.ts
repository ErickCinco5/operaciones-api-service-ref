import { Document } from 'mongoose';

export interface IReglas extends Document {
    _id?: string;
    nombre: string;
    grupo: string;
    tipo: string;
    conditions?: any;
    applied: boolean;
    activo: boolean;
    createdDate: string;
}