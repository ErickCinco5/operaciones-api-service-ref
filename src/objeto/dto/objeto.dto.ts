import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Schema } from "mongoose";

export class ObjetoDTO {
    @IsOptional()
    readonly _id?: string;

    @IsNotEmpty()
    @IsString()
    readonly nombre: string;

    @IsNotEmpty()
    @IsString()
    readonly tipoObjeto: string;

    @IsOptional()
    @IsBoolean()
    readonly activo?: boolean;

    @IsOptional()
    readonly docsSoporte?: Schema.Types.Mixed;

    @IsOptional()
    readonly atributos?: Schema.Types.Mixed;

    @IsOptional()
    readonly reglas?: Schema.Types.Mixed;

    @IsOptional()
    @IsString()
    readonly createdDate?: string;
}