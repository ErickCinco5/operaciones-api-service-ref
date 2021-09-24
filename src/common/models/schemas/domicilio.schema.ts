import { Schema } from "mongoose";
import { DropDownItemSchema } from "./catalogos.schema";

const GeolocalizacionSchema = new Schema({
    formatted_address: { type: String, default: null },
    lat: { type: Number, default: null },
    lng: { type: Number, default: null },
    placeId: { type: String, default: null },
    sharedLink: { type: String, default: null },
});

export const DomicilioSchema = new Schema({
    codigoPostal: { type: String, required: true },
    calle: { type: String, required: true },
    numeroExterior: { type: String, required: true },
    numeroInterior: { type: String, default: null },
    colonia: { type: Schema.Types.Mixed, default: null },
    municipio: { type: Schema.Types.Mixed, default: null },
    entidadFederativa: { type: Schema.Types.Mixed, required: true },
    pais: { type: DropDownItemSchema, required: true },
    referencias: { type: String, default: null },
    geolocalizacion: { type: GeolocalizacionSchema, default: null },
});