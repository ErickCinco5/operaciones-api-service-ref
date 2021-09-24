import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { Atributo } from './atributo.schema';
import { Doc } from './doc.schema';

export type OperacionEspDocument = OperacionEsp & mongoose.Document;

@Schema()
export class OperacionEsp {
    @Prop({ type: String, trim: true })
    nombre: string;

    @Prop({ type: mongoose.Schema.Types.Mixed })
    reglas: mongoose.Schema.Types.Mixed;

    @Prop({ type: Boolean, default: true })
    activo: boolean;

    @Prop({ type: Boolean, default: true })
    enEdicion: boolean;

    @Prop({ type: mongoose.Schema.Types.DocumentArray })
    docsPostFirma: [Doc]

    @Prop({ type: mongoose.Schema.Types.DocumentArray })
    docsSoporte: [Doc]

    @Prop({ type: mongoose.Schema.Types.DocumentArray })
    docsPrevios: [Doc]

    @Prop({ type: mongoose.Schema.Types.DocumentArray })
    atributos: [Atributo]
    
    @Prop({ type: String, required: true })
    createdDate: string;
}

export const OperacionEspSchema = SchemaFactory.createForClass( OperacionEsp );
OperacionEspSchema.plugin( mongoosePaginate ); 