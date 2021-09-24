import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { ICatcomparecencia } from 'src/common/interfaces/catcomparecencia.interface';
import { ATRIBUTO, CATCOMPARECENCIA } from 'src/common/models/models';
import { CatComparecenciaDTO } from './dto/catcomparecencia.dto';
import * as moment from 'moment';
import { IAtributo } from 'src/common/interfaces/atributo.interface';

@Injectable()
export class CatcomparecenciaService {

    constructor(
        @InjectModel( CATCOMPARECENCIA.name ) private readonly catcomparecenciaModel: PaginateModel<ICatcomparecencia>,
        @InjectModel( ATRIBUTO.name ) private readonly atributoModel: PaginateModel<IAtributo>,
    ) {}

    async create( catcomparecencia: CatComparecenciaDTO ): Promise<ICatcomparecencia> {
        const newCatcomparecencia = new this.catcomparecenciaModel({
            ...catcomparecencia,
            createdDate: moment().format('MMMM Do YYYY, h:mm:ss a')
        });
        newCatcomparecencia.save();
        if( !newCatcomparecencia ) return null;
        return newCatcomparecencia;
    }

    async findAll( options: any ): Promise<any> {
        const catcomparecencias = await this.catcomparecenciaModel.paginate({}, 
            { ...options, populate: ({ path: 'atributos', model: this.atributoModel })});
        if( !catcomparecencias || catcomparecencias.docs.length === 0 ) return null;
        return catcomparecencias;
    }

    async findOne( id: string ): Promise<ICatcomparecencia> {
        const catcomparecencia = await this.catcomparecenciaModel.findById( id );
        if( !catcomparecencia ) return null;
        return catcomparecencia;
    }

    async update( id: string, catcomparecencia: any ): Promise<ICatcomparecencia> {
        const catcomparecenciaUpdated = await this.catcomparecenciaModel.findOneAndUpdate({ _id: id }, catcomparecencia, { new: true });
        if( !catcomparecenciaUpdated ) return null;
        return catcomparecenciaUpdated;
    }

    async activoToggle( id: string ): Promise<ICatcomparecencia> {
        const catcomparecencia = await this.findOne( id );
        if( !catcomparecencia ) return null;

        const catcomparecenciaUpdated = await this.catcomparecenciaModel.findOneAndUpdate({ _id: id }, { activo: !catcomparecencia.activo }, { new: true });
        if( !catcomparecenciaUpdated ) return null;
        return catcomparecenciaUpdated;
    }

    async delete( id: string ): Promise<ICatcomparecencia> {
        const catcomparecenciaDeleted = await this.catcomparecenciaModel.findByIdAndDelete( id );
        if( !catcomparecenciaDeleted ) return null;
        return catcomparecenciaDeleted;
    }

}
