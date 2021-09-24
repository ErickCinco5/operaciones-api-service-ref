import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { Atributo } from 'src/atributo/schema/atributo.schema';
import { Catalogo } from 'src/catalogo/schema/catalogo.schema';
import { CatComparecencia } from 'src/catcomparecencia/schema/catComparecencia.schema';
import { GrupoOperaciones } from 'src/grupo-operaciones/schema/grupo-operaciones.schema';
import { ObjetoOperacion } from 'src/objeto-operacion/schema/objeto-operacion.schema';

export type OperacionDocument = Operacion & mongoose.Document;

@Schema()
export class Operacion {
    @Prop({ type: String, required: true, trim: true })
    nombre: string;

    @Prop({ type: Boolean, default: true })
    activo: boolean;
    
    @Prop({ type: Boolean, default: false })
    enEdicion: boolean;

    @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'GrupoOperaciones' })
    grupo: GrupoOperaciones;

    @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Catcomparecencia' })
    comparecencias: [CatComparecencia];

    @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'ObjetoOperacion' })
    objetos: [ObjetoOperacion];

    @Prop({ type: [mongoose.Schema.Types.Mixed], default: null })
    entidadFederativa: [mongoose.Schema.Types.Mixed];

    @Prop({ type: [mongoose.Schema.Types.Mixed], default: null })
    municipios: [mongoose.Schema.Types.Mixed];

    @Prop({ type: [mongoose.Schema.Types.ObjectId], default: null, ref: 'Catalogo' })
    documentos: [Catalogo];

    @Prop({ type: [mongoose.Schema.Types.ObjectId], default: null, ref: 'Atributo' })
    atributos: [Atributo];

    @Prop({ type: [mongoose.Schema.Types.Mixed], default: null })
    reglas: [mongoose.Schema.Types.Mixed];
    
    @Prop({ type: String, required: true })
    createdDate: string;
}

export const OperacionSchema = SchemaFactory.createForClass( Operacion );
OperacionSchema.plugin( mongoosePaginate );