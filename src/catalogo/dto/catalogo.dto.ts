import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CatalogoDTO {
    @IsOptional()
    readonly _id?: string;

    @IsNotEmpty()
    @IsString()
    readonly nombre: string;

    @IsNotEmpty()
    @IsString()
    readonly tipo: string;

    @IsOptional()
    @IsBoolean()
    readonly activo?: boolean;

    @IsOptional()
    @IsString()
    readonly createdDate?: string;
}