import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

export type CatComparecenciaDocument = CatComparecencia & mongoose.Document;

@Schema()
export class CatComparecencia {
    
    @Prop({ type: String, required: true })
    createdDate: string;
}

export const CatComparecenciaSchema = SchemaFactory.createForClass( CatComparecencia );
CatComparecenciaSchema.plugin( mongoosePaginate ); 