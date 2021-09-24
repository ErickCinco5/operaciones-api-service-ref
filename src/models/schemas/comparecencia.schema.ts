import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { Atributo, AtributoSchema } from './atributo.schema';
import { FideicomisoSchema } from './personas-schemas/fideicomiso.schema';
import { PersonaFisicaSchema } from './personas-schemas/persona-fisica.schema';
import { PersonaMoralSchema } from './personas-schemas/persona-moral.schema';

export type ComparecenciaDocument = Comparecencia & mongoose.Document;

@Schema()
export class Comparecencia {
    @Prop({ type: String, required: true })
    nombre: string;
    
    @Prop({ type: AtributoSchema })
    atributos: [];

    @Prop({ type: Number, trim: true })
    cantidadMin: number;

    @Prop({ type: Boolean, default: true })
    requiereFirma: boolean;

    @Prop({ type: Boolean, default: false })
    conyugeComparece: boolean;

    @Prop({ type: PersonaFisicaSchema || PersonaMoralSchema || FideicomisoSchema })
    persona: [];

    @Prop({ type: Boolean, default: true })
    activo: boolean;

    @Prop()
    comparecencia: string;

    @Prop({ type: String, required: true })
    createdDate: string;
}

export const ComparecenciaSchema = SchemaFactory.createForClass( Comparecencia );
ComparecenciaSchema.plugin( mongoosePaginate ); 