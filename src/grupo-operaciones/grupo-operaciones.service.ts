import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { IGrupoOperaciones } from 'src/common/interfaces/grupo-operaciones.interface';
import { GPOPERACIONES } from 'src/common/models/models';
import { GrupoOperacionesDTO } from './dto/grupo-operaciones.dto';
import * as moment from 'moment';

@Injectable()
export class GrupoOperacionesService {

    constructor(
        @InjectModel( GPOPERACIONES.name ) private readonly grupoOperacionesModel: PaginateModel<IGrupoOperaciones>
    ) {}
    
    async create( grupoOperaciones: GrupoOperacionesDTO ): Promise<IGrupoOperaciones> {
        const newGrupoOperaciones = new this.grupoOperacionesModel({
            ...grupoOperaciones,
            createdDate: moment().format('MMMM Do YYYY, h:mm:ss a')
        });
        newGrupoOperaciones.save();
        if( !newGrupoOperaciones ) return null;
        return newGrupoOperaciones;
    }

    async findAll(): Promise<IGrupoOperaciones[]> {
        const gruposOperaciones = await this.grupoOperacionesModel.find().sort({ _id: -1 });
        if( !gruposOperaciones ) return null;
        return gruposOperaciones;
    }

    async findOne( id: string ): Promise<IGrupoOperaciones> {
        const grupoOperaciones = await this.grupoOperacionesModel.findById( id );
        if( !grupoOperaciones ) return null;
        return grupoOperaciones;
    }

    async update( id: string, grupoOperaciones: GrupoOperacionesDTO ): Promise<IGrupoOperaciones> {
        const grupoOperacionesUpdated = await this.grupoOperacionesModel.findOneAndUpdate({ _id: id }, grupoOperaciones, { new: true });
        if( !grupoOperacionesUpdated ) return null;
        return grupoOperacionesUpdated;
    }

    async activoToggle( id: string ): Promise<IGrupoOperaciones> {
        const grupoOperaciones = await this.findOne( id );
        if( !grupoOperaciones ) return null;

        const grupoOperacionesUpdated = await this.grupoOperacionesModel.findOneAndUpdate({ _id: id }, { activo: !grupoOperaciones.activo }, { new: true });
        if( !grupoOperacionesUpdated ) return null;
        return grupoOperacionesUpdated;
    }

    async delete( id: string ): Promise<IGrupoOperaciones> {
        const grupoOperacionesDeleted = await this.grupoOperacionesModel.findByIdAndDelete( id );
        if( !grupoOperacionesDeleted ) return null;
        return grupoOperacionesDeleted;
    }

}
