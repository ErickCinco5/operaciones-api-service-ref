import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

export type ReglasDocument = Reglas & mongoose.Document;

@Schema()
export class Reglas {
    @Prop({ type: String, required: true, unique: true, trim: true })
    nombre: string;
    
    @Prop({ type: String, required: true, trim: true })
    grupo: string;

    @Prop({ type: String, required: true, trim: true })
    tipo: string;

    @Prop({ type: mongoose.Schema.Types.Mixed, default: null })
    conditions: mongoose.Schema.Types.Mixed;

    @Prop({ type: Boolean, default: false })
    applied: boolean;

    @Prop({ type: Boolean, default: true })
    activo: boolean;
    
    //@Prop() Conclusion que se hara referencia en el Schema de Conclusion hacia el ID de la Reglas Schema

    @Prop({ type: String, required: true })
    createdDate: string;
}

export const ReglasSchema = SchemaFactory.createForClass( Reglas );
ReglasSchema.plugin( mongoosePaginate ); 