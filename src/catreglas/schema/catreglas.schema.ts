import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

export type CatReglasDocument = CatReglas & mongoose.Document;

@Schema()
export class CatReglas {
    @Prop({ type: String, required: true, unique: true, trim: true })
    nombre: string;
    
    @Prop({ type: String, required: true, trim: true })
    tipo: string;

    @Prop({ type: Boolean, default: true })
    activo: boolean;
    
    @Prop({ type: String, required: true })
    createdDate: string;
}

export const CatReglasSchema = SchemaFactory.createForClass( CatReglas );
CatReglasSchema.plugin( mongoosePaginate ); 