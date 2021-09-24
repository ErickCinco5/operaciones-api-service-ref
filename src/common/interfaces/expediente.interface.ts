import { Document, Schema } from 'mongoose';

export interface IExpediente extends Document {
    _id?: string;
    tipoExpediente: string;
    numExpediente: string;
    solicitud: Schema.Types.ObjectId;
    activo: boolean;
    numEscritura: string;
    numSolicitud?: Schema.Types.Mixed;
    abogado: string;
    auxiliar?: string;
    facturar: string;
    folio: Schema.Types.ObjectId;
    operaciones?: [Schema.Types.ObjectId];
    documentos: [Schema.Types.ObjectId];
    testimonio?: [Schema.Types.ObjectId];
    escritura?: [Schema.Types.ObjectId];
    createdDate: string;
}