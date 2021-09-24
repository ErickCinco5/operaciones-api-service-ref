import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { Operacion } from './operacion.schema';

export type ExpedienteDocument = Expediente & mongoose.Document;

@Schema()
export class Expediente {
    @Prop({ type: String, required: true, trim: true })
    numExpediente: string;

    @Prop({ type: String, required: true, trim: true })
    numEscritura: string;

    @Prop({ type: String, required: true, trim: true })
    numSolicitud: string;

    @Prop({ type: String, required: true, trim: true })
    abogado: string;

    @Prop({ type: String, required: true, trim: true })
    cliente: string;

    @Prop({ type: String, required: true })
    type: string;

    @Prop({ type: Boolean, default: true })
    activo: string;

    @Prop({ type: Array, trim: true })
    tags: [string];

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Operacion' })
    operaciones: [Operacion];

    @Prop({ type: String, required: true })
    createdDate: string;
}

export const ExpedienteSchema = SchemaFactory.createForClass( Expediente );
ExpedienteSchema.plugin( mongoosePaginate ); 