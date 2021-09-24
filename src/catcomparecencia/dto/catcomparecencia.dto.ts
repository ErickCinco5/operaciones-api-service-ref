import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Schema } from "mongoose";

export class CatComparecenciaDTO {
    @IsOptional()
    readonly _id?: string;

    @IsNotEmpty()
    @IsString()
    readonly nombre: string;

    @IsOptional()
    @IsNotEmpty()
    readonly tipoPersona: string;

    @IsOptional()
    readonly persona?: Schema.Types.ObjectId;

    @IsOptional()
    @IsBoolean()
    readonly activo?: boolean;


    @IsOptional()
    readonly atributos?: [Schema.Types.ObjectId];

    @IsOptional()
    @IsString()
    readonly createdDate?: string;
}