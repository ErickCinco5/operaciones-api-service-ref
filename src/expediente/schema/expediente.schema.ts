import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { Operacion } from 'src/operacion/schema/operacion.schema';

export type ExpedienteDocument = Expediente & mongoose.Document;

@Schema()
export class Expediente {
    @Prop({ type: String, required: true, trim: true })
    tipoExpediente: string;

    @Prop({ type: String, required: true, trim: true })
    numExpediente: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId })
    solicitud: mongoose.Schema.Types.ObjectId;

    @Prop({ type: [mongoose.Schema.Types.Mixed] })
    tags: [mongoose.Schema.Types.Mixed];

    @Prop({ type: Boolean, default: true })
    activo: boolean;

    @Prop({ type: String, required: true, trim: true })
    numEscritura: string;

    @Prop({ type: String, required: true, trim: true })
    numSolicitud: string;
    
    @Prop({ type: String, required: true, trim: true })
    abogado: string;

    @Prop({ type: String, trim: true })
    auxiliar: string;

    @Prop({ type: String, trim: true})
    facturar: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId })
    folio: mongoose.Schema.Types.ObjectId;

    @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Operacion' })
    operaciones: [Operacion];

    @Prop({ type: [mongoose.Schema.Types.ObjectId] })
    documentos: [mongoose.Schema.Types.ObjectId];

    @Prop({ type: mongoose.Schema.Types.ObjectId })
    testimonio: mongoose.Schema.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId })
    escritura: mongoose.Schema.Types.ObjectId;
    
    @Prop({ type: String, required: true })
    createdDate: string;
}

export const ExpedienteSchema = SchemaFactory.createForClass( Expediente );
ExpedienteSchema.plugin( mongoosePaginate ); 