import { Document, Schema } from 'mongoose';

export interface IObjetoOperacion extends Document {
    _id?: string;
    objeto: Schema.Types.ObjectId;
    cantidadMin: number;
    atributos: [Schema.Types.ObjectId];
    createdDate: string;
}