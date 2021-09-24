import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class AtributoDTO {
    @IsOptional()
    readonly _id?: string;

    @IsNotEmpty()
    @IsString()
    readonly nombre: string;

    @IsNotEmpty()
    @IsString()
    readonly tipoEntrada: string;

    @IsOptional()
    @IsArray()
    readonly valor?: [string];

    @IsOptional()
    @IsString()
    readonly defaultValue?: string;

    @IsOptional()
    @IsString()
    readonly tipo?: string;

    @IsOptional()
    @IsBoolean()
    readonly activo?: boolean;

    @IsOptional()
    @IsString()
    readonly createdDate?: string;
}