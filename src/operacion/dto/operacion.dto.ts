import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Schema } from "mongoose";

export class OperacionDTO {
    @IsOptional()
    readonly _id?: string;

    @IsNotEmpty()
    @IsString()
    readonly nombre: string;

    @IsOptional()
    @IsBoolean()
    readonly activo?: boolean;

    @IsOptional()
    @IsBoolean()
    readonly enEdicion?: boolean;

    @IsNotEmpty()
    readonly grupo: Schema.Types.ObjectId;

    @IsOptional()
    readonly comparecencias?: [Schema.Types.ObjectId];

    @IsOptional()
    readonly objetos?: [Schema.Types.ObjectId];

    @IsOptional()
    readonly entidadFederativa?: Schema.Types.Mixed;

    @IsOptional()
    readonly municipios?: Schema.Types.Mixed;

    @IsOptional()
    readonly documentos?: [Schema.Types.ObjectId];

    @IsOptional()
    readonly atributos?: [Schema.Types.ObjectId];

    @IsOptional()
    readonly reglas?: Schema.Types.Mixed;

    @IsOptional()
    @IsString()
    readonly createdDate?: string;
}