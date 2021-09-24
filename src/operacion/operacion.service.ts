import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { ICatcomparecencia } from 'src/common/interfaces/catcomparecencia.interface';
import { IGrupoOperaciones } from 'src/common/interfaces/grupo-operaciones.interface';
import { IObjetoOperacion } from 'src/common/interfaces/objeto-operacion.interface';
import { IOperacion } from 'src/common/interfaces/operacion.interface';
import { ATRIBUTO, CATALOGO, CATCOMPARECENCIA, GPOPERACIONES, OPERACION, OPOBJETO } from 'src/common/models/models';
import { OperacionDTO } from './dto/operacion.dto';
import * as moment from 'moment';
import { IAtributo } from 'src/common/interfaces/atributo.interface';
import { ICatalogo } from 'src/common/interfaces/catalogo.interface';

@Injectable()
export class OperacionService {

    constructor(
        @InjectModel( OPERACION.name ) private readonly operacionModel: PaginateModel<IOperacion>,
        @InjectModel( OPOBJETO.name ) private readonly opobjetoModel: PaginateModel<IObjetoOperacion>,
        @InjectModel( CATCOMPARECENCIA.name ) private readonly comparecenciaModel: PaginateModel<ICatcomparecencia>,
        @InjectModel( GPOPERACIONES.name ) private readonly gpoperacionModel: PaginateModel<IGrupoOperaciones>,
        @InjectModel( ATRIBUTO.name ) private readonly atributoModel: PaginateModel<IAtributo>,
        @InjectModel( CATALOGO.name ) private readonly catalogoModel: PaginateModel<ICatalogo>,
    ) {}

    async create( operacion: OperacionDTO ): Promise<IOperacion> {
        const newOperacion = new this.operacionModel({
            ...operacion,
            createdDate: moment().format('MMMM Do YYYY, h:mm:ss a')
        });
        newOperacion.save();
        if( !newOperacion ) return null;
        return newOperacion;
    }

    async findAll(): Promise<IOperacion[]> {
        const operaciones = await this.operacionModel.find()
            .sort({ _id: -1 })
            .populate({ path: 'grupo', select: '', model: this.gpoperacionModel })
            .populate({ path: 'comparecencias', select: '', model: this.comparecenciaModel, populate: { path: 'atributos', model: this.atributoModel }})
            .populate({ path: 'objetos', select: '', model: this.opobjetoModel, populate: { path: 'atributos', model: this.atributoModel }})
            .populate({ path: 'documentos', select: '', model: this.catalogoModel })
            .populate({ path: 'atributos', select: '', model: this.atributoModel });
        if( !operaciones ) return null;
        return operaciones;
    }

    async findOne( id: string ): Promise<IOperacion> {
        const operacion = await this.operacionModel.findById( id )
            .populate({ path: 'grupo', select: '', model: this.gpoperacionModel })
            .populate({ path: 'comparecencias', select: '', model: this.comparecenciaModel, populate: { path: 'atributos', model: this.atributoModel }})
            .populate({ path: 'objetos', select: '', model: this.opobjetoModel, populate: { path: 'atributos', model: this.atributoModel }})
            .populate({ path: 'documentos', select: '', model: this.catalogoModel })
            .populate({ path: 'atributos', select: '', model: this.atributoModel });
        if( !operacion ) return null;
        return operacion;
    }

    async update( id: string, operacion: any ): Promise<IOperacion> {
        const operacionUpdated = await this.operacionModel.findOneAndUpdate({ _id: id }, operacion, { new: true })
            .populate({ path: 'grupo', select: '', model: this.gpoperacionModel })
            .populate({ path: 'comparecencias', select: '', model: this.comparecenciaModel, populate: { path: 'atributos', model: this.atributoModel }})
            .populate({ path: 'objetos', select: '', model: this.opobjetoModel, populate: { path: 'atributos', model: this.atributoModel }})
            .populate({ path: 'documentos', select: '', model: this.catalogoModel })
            .populate({ path: 'atributos', select: '', model: this.atributoModel });
        if( !operacionUpdated ) return null;
        return operacionUpdated;
    }

    async activoToggle( id: string ): Promise<IOperacion> {
        const operacion = await this.findOne( id );
        if( !operacion ) return null;

        const operacionUpdated = await this.operacionModel.findOneAndUpdate({ _id: id }, { activo: !operacion.activo }, { new: true })
            .populate({ path: 'grupo', select: '', model: this.gpoperacionModel })
            .populate({ path: 'comparecencias', select: '', model: this.comparecenciaModel, populate: { path: 'atributos', model: this.atributoModel }})
            .populate({ path: 'objetos', select: '', model: this.opobjetoModel, populate: { path: 'atributos', model: this.atributoModel }})
            .populate({ path: 'documentos', select: '', model: this.catalogoModel })
            .populate({ path: 'atributos', select: '', model: this.atributoModel });
        if( !operacionUpdated ) return null;
        return operacionUpdated;
    }

    async delete( id: string ): Promise<IOperacion> {
        const operacionDeleted = await this.operacionModel.findByIdAndDelete( id )
            .populate({ path: 'grupo', select: '', model: this.gpoperacionModel })
            .populate({ path: 'comparecencias', select: '', model: this.comparecenciaModel, populate: { path: 'atributos', model: this.atributoModel }})
            .populate({ path: 'objetos', select: '', model: this.opobjetoModel, populate: { path: 'atributos', model: this.atributoModel }})
            .populate({ path: 'documentos', select: '', model: this.catalogoModel })
            .populate({ path: 'atributos', select: '', model: this.atributoModel });
        if( !operacionDeleted ) return null;
        return operacionDeleted;
    }

}
