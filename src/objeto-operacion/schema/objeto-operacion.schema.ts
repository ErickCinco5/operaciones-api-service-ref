import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { Atributo } from 'src/atributo/schema/atributo.schema';
import { Objeto } from 'src/objeto/schema/objeto.schema';

export type ObjetoOperacionDocument = ObjetoOperacion & mongoose.Document;

@Schema()
export class ObjetoOperacion {
    @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Objeto' })
    objeto: Objeto;

    @Prop({ type: Number, required: true, trim: true })
    cantidadMin: number;

    @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Atributo' })
    atributos: [Atributo];
    
    @Prop({ type: String, required: true })
    createdDate: string;
}

export const ObjetoOperacionSchema = SchemaFactory.createForClass( ObjetoOperacion );
ObjetoOperacionSchema.plugin( mongoosePaginate );