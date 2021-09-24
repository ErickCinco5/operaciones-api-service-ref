import { Schema } from "mongoose";
import { DropDownItemSchema } from "./catalogos.schema";

export const ContactoTelefonoSchema = new Schema({
    tipoTelefono: { type: DropDownItemSchema, required: true },
    numeroTelefono: { type: String, default: null },
    extension: { type: Number, default: null },
});

export const ContactoCorreoSchema = new Schema({
    tipoCorreo: { type: DropDownItemSchema, required: true },
    correo: { type: String, default: null },
});