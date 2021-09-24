import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

export type GrupoOperacionesDocument = GrupoOperaciones & mongoose.Document;

@Schema()
export class GrupoOperaciones {
    @Prop({ type: String, required: true, unique: true, trim: true })
    nombre: string;

    @Prop({ type: Boolean, default: true })
    activo: boolean;
    
    @Prop({ type: String, required: true })
    createdDate: string;
}

export const GrupoOperacionesSchema = SchemaFactory.createForClass( GrupoOperaciones );
GrupoOperacionesSchema.plugin( mongoosePaginate ); 