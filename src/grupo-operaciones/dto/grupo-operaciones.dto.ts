import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class GrupoOperacionesDTO {
    @IsOptional()
    readonly _id?: string;

    @IsNotEmpty()
    @IsString()
    readonly nombre: string;

    @IsOptional()
    @IsBoolean()
    readonly activo?: boolean;

    @IsOptional()
    @IsString()
    readonly createdDate?: string;
}