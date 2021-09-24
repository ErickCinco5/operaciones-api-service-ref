import { Schema } from "mongoose";
import { DropDownItemSchema } from "./catalogos.schema";
import { ApoderadoSchema, AntecedenteSchema } from "./poder.schema";

export const DocumentoSoporteLargoSchema = new Schema({
    id: { type: String, required: true },
    idPersonaFisica: { type: String, required: false },
    idPersonaMoral: { type: String, required: false },
    idFideicomiso: { type: String, required: false },
    tipoDocumento: { type: DropDownItemSchema, default: null },
    plantillaOCR: { type: DropDownItemSchema, default: null },

    // Identificaciones
    numeroIdentificacion: { type: String, default: null },
    entidadEmisora: { type: DropDownItemSchema, default: null },
    fechaEmision: { type: Date, default: null },
    anioEmision: { type: DropDownItemSchema, default: null },
    anioVigencia: { type: DropDownItemSchema, default: null },

    // Poderes
    tipoEscritura: { type: DropDownItemSchema, default: null },
    origen: { type: DropDownItemSchema, default: null },
    numEscritura: { type: Number, default: null },
    numNotaria: { type: Number, default: null },
    fecha: { type: Date, default: null },
    municipio: { type: DropDownItemSchema, default: null },
    entidadFederativa: { type: DropDownItemSchema, default: null },
    caracterNotario: { type: DropDownItemSchema, default: null },
    nombreNotario: { type: DropDownItemSchema, default: null },
    notarioFirmanteDiferente: { type: Boolean, default: false },
    caracterNotarioFirmante: { type: DropDownItemSchema, default: null },
    nombreNotarioFirmante: { type: DropDownItemSchema, default: null },
    numNotariaNotarioFirmante: { type: Number, default: null },
    municipioNotarioFirmante: { type: DropDownItemSchema, default: null },
    entidadFederativaNotarioFirmante: { type: DropDownItemSchema, default: null },

    fechaEscritura: { type: Date, default: null },
    folioMercantil: { type: String, default: null },
    entidadRegistradora: { type: DropDownItemSchema, default: null },

    // Representacion
    apoderados: { type: [ApoderadoSchema], default: [] },

    // Constitucion y antecedentes
    antecedentes: { type: [AntecedenteSchema], default: [] },

    fileName: { type: String, required: true },
    fileFormat: { type: String, required: true },
    size: { type: Number, required: true },
    camposOCR: { type: [], default: [] },
    blobName: { type: String, required: true },
    fileUrl: { type: String, default: null },
    fechaCreacion: { type: Date, required: true },
    activo: { type: Boolean, default: true }
});