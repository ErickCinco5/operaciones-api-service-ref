import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { Atributo } from 'src/atributo/schema/atributo.schema';

export type CatComparecenciaDocument = CatComparecencia & mongoose.Document;
@Schema()
export class CatComparecencia {
    @Prop({ type: String, required: true, trim: true })
    nombre: string;

    @Prop({ type: String, required: true, trim: true })
    tipoPersona: string;
    
    @Prop({ type: mongoose.Schema.Types.ObjectId })
    persona: mongoose.Schema.Types.ObjectId;

    @Prop({ type: Boolean, default: true })
    activo: boolean;

    @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Atributo' })
    atributos: [Atributo];
    
    @Prop({ type: String, required: true })
    createdDate: string;
}

export const CatComparecenciaSchema = SchemaFactory.createForClass( CatComparecencia );
CatComparecenciaSchema.plugin( mongoosePaginate ); 