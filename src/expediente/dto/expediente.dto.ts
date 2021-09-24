import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Schema } from "mongoose";

export class ExpedienteDTO {
    @IsOptional()
    readonly _id?: string;

    @IsNotEmpty()
    @IsString()
    readonly tipoExpediente: string;

    @IsOptional()
    @IsString()
    readonly numExpediente: string;

    @IsOptional()
    @IsString()
    readonly solicitud: Schema.Types.ObjectId;

    @IsOptional()
    @IsBoolean()
    readonly activo?: boolean;

    @IsNotEmpty()
    @IsString()
    readonly numEscritura: string;

    @IsOptional()
    @IsString()
    readonly numSolicitud?: string;

    @IsNotEmpty()
    @IsString()
    readonly abogado: string;

    @IsOptional()
    @IsString()
    readonly auxiliar: string;

    @IsOptional()
    @IsString()
    readonly facturar: string;

    @IsOptional()
    @IsString()
    readonly folio?: Schema.Types.ObjectId;

    @IsOptional()
    @IsArray()
    readonly operaciones?: [Schema.Types.ObjectId];

    @IsOptional()
    @IsArray()
    readonly documentos?: [Schema.Types.ObjectId];

    @IsOptional()
    @IsArray()
    readonly testimonio?: [Schema.Types.ObjectId];

    @IsOptional()
    @IsArray()
    readonly escritura?: [Schema.Types.ObjectId];

    @IsOptional()
    @IsString()
    readonly createdDate?: string;
}