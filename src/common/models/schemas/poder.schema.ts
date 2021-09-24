import { Schema } from "mongoose"
import { DropDownGroupSchema, DropDownItemSchema } from "./catalogos.schema"


export const ApoderadoSchema = new Schema({
    id: { type: String, required: true },
    tipoRepresentante: { type: String, default: 'apoderado' },
    nombreApoderado: { type: DropDownGroupSchema, default: null },
    tipoPoder: { type: String, default: 'general' },
    revocabilidad: { type: String, default: 'revocable' },
    facultades: { type: Schema.Types.Mixed, default: [] },
    limitaciones: { type: String, default: null },
    redaccionCorta: { type: String, default: null },
    redaccionLarga: { type: String, default: null },
    delegadoTipo: { type: DropDownItemSchema, default: null },
})

const FideicomisarioSchema = new Schema({
    id: { type: String, required: true },
    tipo: { type: DropDownItemSchema, default: null },
    nombre: { type: String, default: null },
    tipoPersona: { type: DropDownItemSchema, default: null },
});

const FideicomitenteSchema = new Schema({
    id: { type: String, required: true },
    tipo: { type: DropDownItemSchema, default: null },
    nombre: { type: String, default: null },
    tipoPersona: { type: DropDownItemSchema, default: null },
});


export const AntecedenteSchema = new Schema({
    tipoAntecedente: { type: DropDownItemSchema, default: null },

    // Para antecedentes de Personas Morales
    razonSocial: { type: String, default: null },
    regimenLegal: { type: DropDownItemSchema, default: null },
    entidadFederativa: { type: Schema.Types.Mixed, default: null },
    nacionalidad: { type: DropDownItemSchema, default: null },
    duracion: { type: DropDownItemSchema, default: null },
    organoAdministracion: { type: DropDownItemSchema, default: null },
    capitalInicialFijo: { type: String, default: null },
    tipoMoneda: { type: DropDownItemSchema, default: null },
    aceptaExtranjeros: { type: Boolean, default: false },
    objetoSocial: { type: String, default: null },

    // Para antecedentes de Fideicomisos
    fideicomitentes: { type: [FideicomitenteSchema], default: [] },
    fiduciario: { type: DropDownItemSchema, default: null },
    fideicomisarios: { type: [FideicomisarioSchema], default: [] },
    finesFideicomiso: { type: String, default: null },

    // Otro tipo de antecedentes
    notas: { type: String, default: null },

    antecedente: { type: String, default: null },
});


export const PoderSchema = new Schema({
    id: { type: String, required: true },
    tipoDocumento: { type: DropDownItemSchema, required: true },
    plantillaOCR: { type: DropDownItemSchema, default: null },

    // Escritura pública
    tipoEscritura: { type: DropDownItemSchema, default: null },
    origen: { type: DropDownItemSchema, default: null },
    numEscritura: { type: Number, default: null },
    numNotaria: { type: Number, default: null },
    fecha: { type: Date, default: null },
    municipio: { type: Schema.Types.Mixed, default: null },
    entidadFederativa: { type: Schema.Types.Mixed, default: null },
    caracterNotario: { type: DropDownItemSchema, default: null },
    nombreNotario: { type: DropDownItemSchema, default: null },
    notarioFirmanteDiferente: { type: Boolean, default: false },
    caracterNotarioFirmante: { type: DropDownItemSchema, default: null },
    nombreNotarioFirmante: { type: DropDownItemSchema, default: null },
    numNotariaNotarioFirmante: { type: Number, default: null },
    municipioNotarioFirmante: { type: Schema.Types.Mixed, default: null },
    entidadFederativaNotarioFirmante: { type: Schema.Types.Mixed, default: null },
    fechaEscritura: { type: Date, default: null },
    folioMercantil: { type: String, default: null },
    entidadRegistradora: { type: DropDownItemSchema, default: null },

    // Otro tipo de escritura
    numeroIdentificacion: { type: String, default: null },
    entidadEmisora: { type: DropDownItemSchema, default: null },
    fechaEmision: { type: Date, default: null },
    anioEmision: { type: DropDownItemSchema, default: null },
    anioVigencia: { type: DropDownItemSchema, default: null },

    // Representacion
    apoderados: { type: [ApoderadoSchema], default: [] },

    // Constitucion y antecedentes
    antecedentes: { type: [AntecedenteSchema], default: [] },

    fileName: { type: String, required: true },
    fileFormat: { type: String, required: true },
    size: { type: Number, required: true },
    camposOCR: { type: [], default: [] },
    blobName: { type: String, required: true },
    fileUrl: { type: String, required: true },
})