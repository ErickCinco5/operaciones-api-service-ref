import { Schema } from "mongoose";
import { DropDownItemSchema } from "./catalogos.schema";

export const DatosEscrituraSchema = new Schema({
    escrituraEmitidaEnMexico: {
        type: Boolean,
        required: false
    },
    numeroEscritura: {
        type: Number,
        required: true
    },
    fechaEscritura: {
        type: Date,
        required: true
    },
    lugarEscritura: {
        type: String,
        required: false
    }
});


export const DatosNotarioSchema = new Schema({
    caracterNotario: {
        type: String,
        required: false
    },
    numeroNotaria: {
        type: Number,
        required: true
    },
    numeroNotario: {
        type: Number,
        required: false
    },
    nombreNotario: {
        type: String,
        required: true
    },
    lugarNotaria: {
        type: DropDownItemSchema,
        required: true
    },
    paisEjercicio: {
        type: DropDownItemSchema,
        required: false
    }
});


export const DatosRegistralesSchema = new Schema({
    folioMercantil: {
        type: Number,
        required: true
    },
    tomo: {
        type: Number,
        required: false
    },
    libro: {
        type: Number,
        required: false
    },
    asiento: {
        type: Number,
        required: false
    },
    autoridadRegistradora: {
        type: String,
        required: true
    },
    lugarRegistro: {
        type: DropDownItemSchema,
        required: true
    },
    paisRegistro: {
        type: DropDownItemSchema,
        required: false
    },
    fechaRegistro: {
        type: Date,
        required: true
    },
});


export const DatosApostillaSchema = new Schema({
    autoridadEmisora: {
        type: DropDownItemSchema,
        required: true
    },
    lugarEmisora: {
        type: DropDownItemSchema,
        required: true
    },
    fechaEmision: {
        type: Date,
        required: true
    },
    numeroApostilla: {
        type: Number,
        required: true
    },
});
