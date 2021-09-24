import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

export type DocDocument = Doc & mongoose.Document;

@Schema()
export class Doc {
    @Prop({ type: String, required: true, trim: true })
    nombre: string;

    @Prop({ type: Boolean, default: false })
    requerido: boolean;
}

export const DocSchema = SchemaFactory.createForClass( Doc );
DocSchema.plugin( mongoosePaginate ); 