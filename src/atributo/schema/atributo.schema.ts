import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

export type AtributoDocument = Atributo & mongoose.Document;

@Schema()
export class Atributo {
    @Prop({ type: String, required: true, trim: true })
    nombre: string;
    
    @Prop({ type: String, trim: true })
    tipo: string;

    @Prop({ type: String, required: true, trim: true })
    tipoEntrada: string;

    @Prop({ type: Array, trim: true })
    valor: [string];

    @Prop({ type: String, trim: true })
    defaultValue: string;

    @Prop({ type: Boolean, default: true })
    activo: boolean;
    
    @Prop({ type: String, required: true })
    createdDate: string;
}

export const AtributoSchema = SchemaFactory.createForClass( Atributo );
AtributoSchema.plugin( mongoosePaginate ); 