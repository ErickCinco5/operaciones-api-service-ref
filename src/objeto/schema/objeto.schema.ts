import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

export type ObjetoDocument = Objeto & mongoose.Document;

@Schema()
export class Objeto {
    @Prop({ type: String, required: true, trim: true })
    nombre: string;

    @Prop({ type: String, required: true, trim: true })
    tipoObjeto: string;
    
    @Prop({ type: Boolean, default: true })
    activo: boolean;

    @Prop({ type: [mongoose.Schema.Types.Mixed], default: null })
    docsSoporte: [mongoose.Schema.Types.Mixed];

    @Prop({ type: [mongoose.Schema.Types.Mixed], default: null })
    atributos: [mongoose.Schema.Types.Mixed];

    @Prop({ type: [mongoose.Schema.Types.Mixed], default: null })
    reglas: [mongoose.Schema.Types.Mixed];
    
    @Prop({ type: String, required: true })
    createdDate: string;
}

export const ObjetoSchema = SchemaFactory.createForClass( Objeto );
ObjetoSchema.plugin( mongoosePaginate );