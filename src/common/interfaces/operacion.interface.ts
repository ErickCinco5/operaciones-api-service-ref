import { Document, Schema } from 'mongoose';

export interface IOperacion extends Document {
    _id?: string;
    nombre: string;
    activo: boolean;
    enEdicion: boolean;
    grupo: Schema.Types.ObjectId;
    comparecencias?: [Schema.Types.ObjectId];
    objetos?: [Schema.Types.ObjectId];
    entidadFederativa: [any];
    municipios: [any];
    documentos: [Schema.Types.ObjectId];
    atributos: [Schema.Types.ObjectId];
    reglas: [any];
    createdDate: string;
}