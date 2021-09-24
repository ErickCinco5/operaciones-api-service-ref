import { Document, Schema } from 'mongoose';

export interface IDocument extends Document {
    _id?: string;
    numExpediente: string;
    numEscritura: string;
    numSolicitud: string;
    abogado: string;
    cliente: string;
    tags?: [Schema.Types.Mixed];
    activo: boolean;
    operaciones?: [Schema.Types.ObjectId];
    createdDate: string;
}