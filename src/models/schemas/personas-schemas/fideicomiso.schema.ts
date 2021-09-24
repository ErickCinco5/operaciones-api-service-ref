import { Schema } from "mongoose";
import { DropDownItemSchema } from "./catalogos.schema";
import { DomicilioSchema } from "./domicilio.schema";
import { IdentificacionSchema } from "./persona-fisica.schema";
import { PoderSchema } from "./poder.schema";

// Documentos Soporte

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


const ContactoTelefonoSchema = new Schema({
    tipoTelefono: { type: DropDownItemSchema, required: true },
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

export const FideicomisoSchema = new Schema({
    idFideicomiso: { type: String, required: true },
    tipoSociedad: { type: DropDownItemSchema, required: true },
    tipoFideicomiso: { type: DropDownItemSchema, required: true },
    // estado: { type: String, required: true },
    razonSocial: { type: String, required: true },
    rfc: { type: String, required: true },
    fiduciario: { type: DropDownItemSchema, required: true },
    actividadEconomica: { type: DropDownItemSchema, required: true },
    domicilioFiscal: { type: DomicilioSchema, default: null },
    mutacionesDenominacion: { type: String, default: null },
    grupoCorporativo: { type: DropDownItemSchema, default: null },
    palabrasClave: { type: [String], default: [] },
    datosFiscales: { type: [DatosFiscalesSchema], required: true },

    estaRepresentado: { type: Boolean, default: false },
    poderes: { type: [PoderSchema], default: [] },

    constitucion: { type: [PoderSchema], default: [] },

    domicilioPrincipal: { type: DomicilioSchema, default: null },
    contactoPrincipal: { type: ContactoPrincipalSchema, default: null },
    contactosAdicionales: { type: [ContactoAdicionalSchema], default: [] },
    identificaciones: { type: [IdentificacionSchema], default: [] },

    fechaCreacion: { type: Date, required: true },
    activo: { type: Boolean, default: true }
});