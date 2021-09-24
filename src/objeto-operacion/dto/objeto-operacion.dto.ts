import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Schema } from "mongoose";

export class ObjetoOperacionDTO {
    @IsOptional()
    readonly _id?: string;

    @IsNotEmpty()
    readonly objeto: Schema.Types.ObjectId;

    @IsNotEmpty()
    @IsNumber()
    readonly cantidadMin: number;

    @IsOptional()
    @IsArray()
    readonly atributos?: [Schema.Types.ObjectId];

    @IsOptional()
    @IsString()
    readonly createdDate?: string;
}