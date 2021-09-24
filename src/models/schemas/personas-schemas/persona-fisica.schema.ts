import { Schema } from "mongoose";
import { DropDownItemSchema } from "./catalogos.schema";
import { DomicilioSchema } from "./domicilio.schema";
import { PoderSchema } from "./poder.schema";

// Documentos Soporte

export const IdentificacionSchema = new Schema({
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
    esConyugeActual: { type: Boolean, default: false },
    fechaMatrimonio: { type: Date, default: null },
    fechaDivorcio: { type: Date, default: null },
    entidadFederativaMatrimonio: { type: Schema.Types.Mixed, default: null },
    paisMatrimonio: { type: DropDownItemSchema, default: null },
    anotaciones: { type: String, default: null },
    entidad: { type: Schema.Types.Mixed, default: null },
    delegacion: { type: String, default: null },
    oficialia: { type: Number, default: null },
    libro: { type: Number, default: null },
    numero: { type: Number, default: null },
    anio: { type: Number, default: null },
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
    idPersonaFisica: { type: String, required: false },
    ocupacion: { type: DropDownItemSchema, required: false },
    nombre: { type: String, required: false },
    primerApellido: { type: String, required: false },
    segundoApellido: { type: String, required: false },
    alias: { type: String, default: null },
    // estado: { type: String, required: true },

    fechaNacimiento: { type: Date, default: null },
    edad: { type: Number, default: null },
    genero: { type: DropDownItemSchema, default: null },
    entidadFederativaNacimiento: { type: Schema.Types.Mixed, default: null },
    municipioNacimiento: { type: Schema.Types.Mixed, default: null },
    paisNacimiento: { type: DropDownItemSchema, default: null },
    nacionalidad: { type: DropDownItemSchema, default: null },
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

    estaRepresentado: { type: Boolean, default: false },
    poderes: { type: [PoderSchema], default: [] },

    contactoPrincipal: { type: ContactoPrincipalSchema, default: null },
    contactosAdicionales: { type: [ContactoAdicionalSchema], default: [] },

    fechaCreacion: { type: Date, required: false },
    activo: { type: Boolean, default: false },
    
});