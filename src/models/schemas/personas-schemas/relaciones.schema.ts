import { Schema } from "mongoose";
import { DropDownGroupSchema, DropDownItemSchema } from "./catalogos.schema";

export const DocumentoRelacionSchema = new Schema({
    id: { type: String, required: true },
    tipoDocumento: { type: DropDownGroupSchema, default: null },
    plantillaOCR: { type: DropDownItemSchema, default: null },

    // Actas
    entidad: { type: DropDownItemSchema, default: null },
    delegacion: { type: String, default: null },
    oficialia: { type: Number, default: null },
    libro: { type: Number, default: null },
    numero: { type: Number, default: null },
    anio: { type: Number, default: null },

    // Identificaciones
    numeroIdentificacion: { type: String, default: null },
    entidadEmisora: { type: DropDownItemSchema, default: null },
    fechaEmision: { type: DropDownItemSchema, default: null },
    fechaVigencia: { type: DropDownItemSchema, default: null },

    // Poderes
    origen: { type: String, default: null },
    tipoEscritura: { type: String, default: null },
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

    fileName: { type: String, required: true },
    fileFormat: { type: String, required: true },
    size: { type: Number, required: true },
    camposOCR: { type: [], default: [] },
    blobName: { type: String, required: true },
    fileUrl: { type: String, default: null },
});

const PersonaSchema = new Schema({
    tipoPersona: { type: DropDownItemSchema, required: true },
    persona: { type: DropDownItemSchema, required: true },
})

const PersonaRelacionadaSchema = new Schema({
    id: { type: String, required: true },
    tipoPersona: { type: DropDownItemSchema, required: true },
    persona: { type: DropDownItemSchema, required: true },
    tipoPoder: { type: String, default: null },
    revocabilidad: { type: String, default: null },
    facultades: { type: Schema.Types.Mixed, default: null },
    limitaciones: { type: String, default: null }
})

export const RelacionSchema = new Schema({
    idRelacion: { type: String, required: true },
    personaPrincipal: { type: PersonaSchema, required: true },
    tipoRelacion: { type: DropDownItemSchema, required: true },
    personasRelacionadas: { type: [PersonaRelacionadaSchema], required: true },
    poderes: { type: [DocumentoRelacionSchema], required: true },
    fechaCreacion: { type: Date, required: true },
    activo: { type: Boolean, default: true },

    // Conyuge
    regimenConyugal: { type: DropDownItemSchema, default: null },
    fechaMatrimonio: { type: Date, default: null },
    fechaDivorcio: { type: Date, default: null },
    entidadFederativaMatrimonio: { type: DropDownItemSchema, default: null },
    paisMatrimonio: { type: DropDownItemSchema, default: null },
    anotaciones: { type: String, default: null },

    // Poder
    delegadoTipo: { type: DropDownItemSchema, required: false },
    redaccionCorta: { type: String, required: false },
    redaccionLarga: { type: String, required: false },
})