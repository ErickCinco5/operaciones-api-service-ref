import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { ICatreglas } from 'src/common/interfaces/catreglas.interface';
import { IGrupoOperaciones } from 'src/common/interfaces/grupo-operaciones.interface';
import { IReglas } from 'src/common/interfaces/reglas.interface';
import { CATREGLAS, GPOPERACIONES, REGLAS } from 'src/common/models/models';

@Injectable()
export class ValidatorService {

    constructor(
        @InjectModel( CATREGLAS.name ) private readonly catreglasModel: PaginateModel<ICatreglas>,
        @InjectModel( REGLAS.name ) private readonly reglasModel: PaginateModel<IReglas>,
        @InjectModel( GPOPERACIONES.name ) private readonly grupoOperacionesModel: PaginateModel<IGrupoOperaciones>,
    ) {}
    
    async isValidId( id: string ): Promise<Boolean> {
        if( id.match(/^[0-9a-fA-F]{24}$/) ) return true;
        return false;
    }

    /* CATREGLAS FILTERS */

    async catreglaNameExists( name: string ): Promise<Boolean> {
        const nameExists = await this.catreglasModel.findOne({
            "nombre":
                { $regex: new RegExp(["^", name, "$"].join(""), "i") }
        });
        if( !nameExists ) return null;
        return true;
    }

    async checkNombreCatregla( id: string, nombre: string ): Promise<any> {
        const nombreExists = await this.catreglasModel.findOne({
            "nombre":
                { $regex: new RegExp(["^", nombre, "$"].join(""), "i") }
        });
        if( nombreExists && nombreExists._id.toString() !== id ) return 'El nombre de Reglas de Categoria ya esta siendo utilizado ! ';
        return null;
    }

    /* REGLAS FILTERS */

    async reglaNameExists( nombre: string ): Promise<Boolean> {
        const nameExists = await this.reglasModel.findOne({
            "nombre":
                { $regex: new RegExp(["^", nombre, "$"].join(""), "i") }
        });
        if( !nameExists ) return null;
        return true;
    }

    async checkNombreRegla( id: string, nombre: string ): Promise<any> {
        const nombreExists = await this.reglasModel.findOne({
            "nombre":
                { $regex: new RegExp(["^", nombre, "$"].join(""), "i") }
        });
        if( nombreExists && nombreExists._id.toString() !== id ) return 'El nombre de Reglas ya esta siendo utilizado ! ';
        return null;
    }

    /* GRUPO OPERACIONES FILTERS */

    async grupoOperacionesNameExists( nombre: string ): Promise<Boolean> {
        const nameExists = await this.grupoOperacionesModel.findOne({
            "nombre":
                { $regex: new RegExp(["^", nombre, "$"].join(""), "i") }
        });
        if( !nameExists ) return null;
        return true;
    }

    async checkNombreGrupoOperaciones( id: string, nombre: string ): Promise<any> {
        const nombreExists = await this.grupoOperacionesModel.findOne({
            "nombre":
                { $regex: new RegExp(["^", nombre, "$"].join(""), "i") }
        });
        if( nombreExists && nombreExists._id.toString() !== id ) return 'El nombre de Grupo de Operaciones ya esta siendo utilizado ! ';
        return null;
    }

}
