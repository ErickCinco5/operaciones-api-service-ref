import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class ReglasDTO {
    @IsOptional()
    readonly _id?: string;

    @IsNotEmpty()
    @IsString()
    readonly nombre: string;

    @IsNotEmpty()
    @IsString()
    readonly grupo: string;

    @IsNotEmpty()
    @IsString()
    readonly tipo: string;

    @IsOptional()
    readonly conditions?: any;

    @IsOptional()
    @IsBoolean()
    readonly applied?: boolean;

    @IsOptional()
    @IsBoolean()
    readonly activo?: boolean;

    @IsOptional()
    @IsString()
    readonly createdDate?: string;
}