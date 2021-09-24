import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { OperacionEsp } from './operacionEsp.schema';

export type OperacionDocument = Operacion & mongoose.Document;

@Schema()
export class Operacion {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'OperacionEsp', })
    operacionEsp: OperacionEsp;

    // @Prop({ type: String, required: true, trim: true })
    // comparecencias: string;

    // @Prop({ type: String, required: true, trim: true })
    // docsSoporte: string;

    // @Prop({ type: String, required: true, trim: true })
    // docsPrevios: string;

    // @Prop({ type: String, required: true, trim: true })
    // docsPostfirma: string;

    // @Prop({ type: String, required: true })
    // objetos: string;

    // @Prop({ type: Boolean, default: true })
    // atributos: string;

    // @Prop({ type: Array, trim: true })
    // reglas: [string];

    // @Prop({ type: mongoose.Schema.Types, ref: 'Operacion' })
    // rulesApplied: [Operacion];

    // @Prop({ type: String, required: true })
    // actividadVulnerable: string;

    @Prop({ type: String, required: true })
    createdDate: string;
}

export const OperacionSchema = SchemaFactory.createForClass( Operacion );
OperacionSchema.plugin( mongoosePaginate ); 