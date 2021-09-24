import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

export type CatalogoDocument = Catalogo & mongoose.Document;

@Schema()
export class Catalogo {
    @Prop({ type: String, required: true, unique: true, trim: true })
    nombre: string;
    
    @Prop({ type: String, trim: true })
    tipo: string;

    @Prop({ type: Boolean, default: true })
    activo: boolean;
    
    @Prop({ type: String, required: true })
    createdDate: string;
}

export const CatalogoSchema = SchemaFactory.createForClass( Catalogo );
CatalogoSchema.plugin( mongoosePaginate ); 