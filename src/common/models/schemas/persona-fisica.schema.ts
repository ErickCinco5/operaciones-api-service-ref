import { Schema } from "mongoose";
import { DropDownItemSchema } from "./catalogos.schema";
import { DomicilioSchema } from "./domicilio.schema";
import { PoderSchema } from "./poder.schema";

// Documentos Soporte

export const IdentificacionSchema = new Schema({
    id: { type: String, required: true },
    tipoDocumento: { type: DropDownItemSchema, required: true },
    plantillaOCR: { type: DropDownItemSchema, default: null },

    numeroIdentificacion: { type: String, default: null }, // tambien es número de documento, etc
    entidadEmisora: { type: DropDownItemSchema, default: null },
    fechaEmision: { type: Date, default: null }, // también es fecha de matrimonio
    anioEmision: { type: DropDownItemSchema, default: null },
    anioVigencia: { type: DropDownItemSchema, default: null },

    regimenConyugal: { type: DropDownItemSchema, default: null },
    nombreConyuge: { type: DropDownItemSchema, default: null },
    esConyugeActual: { type: Boolean, default: false },
    fechaDivorcio: { type: Date, default: null },
    pais: { type: DropDownItemSchema, default: null }, // tambien es pais de matrimonio
    entidad: { type: Schema.Types.Mixed, default: null }, // tambien es entidad federativa de matrimonio
    delegacion: { type: String, default: null },
    oficialia: { type: Number, default: null },
    libro: { type: Number, default: null },
    numero: { type: Number, default: null },
    anio: { type: Number, default: null },
    anotaciones: { type: String, default: null },

    fileName: { type: String, default: null },
    fileFormat: { type: String, default: null },
    size: { type: Number, default: null },
    camposOCR: { type: [], default: [] },
    blobName: { type: String, default: null },
    fileUrl: { type: String, default: null },
})

const DatosFiscalesSchema = new Schema({
    id: { type: String, required: true },
    tipoDocumento: { type: DropDownItemSchema, required: true },
    plantillaOCR: { type: DropDownItemSchema, default: null },

    numeroIdentificacion: { type: String, default: null },
    entidadEmisora: { type: DropDownItemSchema, default: null },
    fechaEmision: { type: Date, default: null },
    anioEmision: { type: DropDownItemSchema, default: null },
    anioVigencia: { type: DropDownItemSchema, default: null },


    fileName: { type: String, default: null },
    fileFormat: { type: String, default: null },
    size: { type: Number, default: null },
    camposOCR: { type: [], default: [] },
    blobName: { type: String, default: null },
    fileUrl: { type: String, default: null },
})


const EstadoCivilSchema = new Schema({
    estadoCivil: { type: DropDownItemSchema, required: true },
    regimenConyugal: { type: DropDownItemSchema, default: null },
    nombreConyuge: { type: DropDownItemSchema, default: null },
    esConyugeActual: { type: Boolean, default: true },
    casadosEntreSi: { type: Boolean, default: true },
    fechaMatrimonio: { type: Date, default: null },
    fechaDivorcio: { type: Date, default: null },
    entidadFederativaMatrimonio: { type: Schema.Types.Mixed, default: null },
    paisMatrimonio: { type: DropDownItemSchema, default: null },
    entidad: { type: Schema.Types.Mixed, default: null },
    delegacion: { type: String, default: null },
    oficialia: { type: Number, default: null },
    libro: { type: Number, default: null },
    numero: { type: Number, default: null },
    anio: { type: Number, default: null },
    anotaciones: { type: String, default: null },
})

const ContactoTelefonoSchema = new Schema({
    tipoTelefono: { type: DropDownItemSchema, required: true },
    lada: { type: String, default: null },
    numeroTelefono: { type: String, default: null },
    extension: { type: Number, default: null },
});

const ContactoCorreoSchema = new Schema({
    tipoCorreo: { type: DropDownItemSchema, required: true },
    correo: { type: String, default: null },
});

const ContactoPrincipalSchema = new Schema({
    telefono1: { type: ContactoTelefonoSchema, required: true },
    telefono2: { type: ContactoTelefonoSchema, required: true },
    telefono3: { type: ContactoTelefonoSchema, required: true },
    telefono4: { type: ContactoTelefonoSchema, required: true },
    correo1: { type: ContactoCorreoSchema, required: true },
    correo2: { type: ContactoCorreoSchema, required: true },
    correo3: { type: ContactoCorreoSchema, required: true },
    webPage: { type: String, default: null },
    redSocial1: { type: String, default: null },
    redSocial2: { type: String, default: null },
    redSocial3: { type: String, default: null },
});

const ContactoAdicionalSchema = new Schema({
    id: { type: String, required: true },
    tipoContacto: { type: DropDownItemSchema, default: null },
    nombreContacto: { type: String, default: null },
    correo: { type: ContactoCorreoSchema, default: null },
    telefono: { type: ContactoTelefonoSchema, default: null },
});

// Persona Fisica

export const PersonaFisicaSchema = new Schema({
    idPersonaFisica: { type: String, required: true },
    ocupacion: { type: DropDownItemSchema, default: null },
    nombre: { type: String, required: true },
    primerApellido: { type: String, required: true },
    segundoApellido: { type: String, default: null },
    alias: { type: String, default: null },

    genero: { type: DropDownItemSchema, default: null },
    fechaNacimiento: { type: Date, default: null },
    edad: { type: Number, default: null },
    municipioNacimiento: { type: Schema.Types.Mixed, default: null },
    entidadFederativaNacimiento: { type: Schema.Types.Mixed, default: null },
    nacionalidad: { type: DropDownItemSchema, default: null },
    paisNacimiento: { type: DropDownItemSchema, default: null },
    curp: { type: String, default: null },
    rfc: { type: String, default: null },
    otraClaveIdentificacion: { type: String, default: null },
    identificaciones: { type: [IdentificacionSchema], default: [] },
    domicilioParticular: { type: DomicilioSchema, default: null },
    datosFiscales: { type: [DatosFiscalesSchema], default: [] },
    estadoCivil: { type: EstadoCivilSchema, default: null },
    esCasado: { type: Boolean, default: false },
    grupoCorporativo: { type: DropDownItemSchema, default: null },
    palabrasClave: { type: [String], default: [] },

    actividadEconomica: { type: DropDownItemSchema, default: null },
    domicilioFiscal: { type: DomicilioSchema, default: null },

    contactoPrincipal: { type: ContactoPrincipalSchema, default: null },
    contactosAdicionales: { type: [ContactoAdicionalSchema], default: [] },

    estaRepresentado: { type: Boolean, default: false },
    poderes: { type: [PoderSchema], default: [] },

    fechaCreacion: { type: Date, required: true },
    activo: { type: Boolean, default: true },
})
    .index({ nombre: 'text', primerApellido: 'text', segundoApellido: 'text', alias: 'text', 'genero.label': 'text', curp: 'text', rfc: 'text', palabrasClave: 'text' });