import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { IObjetoOperacion } from 'src/common/interfaces/objeto-operacion.interface';
import { IObjeto } from 'src/common/interfaces/objeto.interface';
import { ATRIBUTO, OBJETO, OPOBJETO } from 'src/common/models/models';
import { ObjetoOperacionDTO } from './dto/objeto-operacion.dto';
import * as moment from 'moment';
import { IAtributo } from 'src/common/interfaces/atributo.interface';

@Injectable()
export class ObjetoOperacionService {

    constructor(
        @InjectModel( OPOBJETO.name ) private readonly opobjetoModel: PaginateModel<IObjetoOperacion>,
        @InjectModel( OBJETO.name ) private readonly objetoModel: PaginateModel<IObjeto>,
        @InjectModel( ATRIBUTO.name ) private readonly atributoModel: PaginateModel<IAtributo>,
    ) {}

    async create( opObjeto: ObjetoOperacionDTO ): Promise<IObjetoOperacion> {
        const newOpobjeto = new this.opobjetoModel({
            ...opObjeto,
            createdDate: moment().format('MMMM Do YYYY, h:mm:ss a')
        });
        newOpobjeto.save();
        if( !newOpobjeto ) return null;
        return newOpobjeto;
    }

    async findAll(): Promise<IObjetoOperacion[]> {
        const objetos = await this.opobjetoModel.find().sort({ _id: -1 })
            .populate({ path: 'objeto', select: '', model: this.objetoModel })
            .populate({ path: 'atributos', model: this.atributoModel });
        if( !objetos ) return null;
        return objetos;
    }

    async findOne( id: string ): Promise<IObjetoOperacion> {
        const objeto = await this.opobjetoModel.findById( id )
            .populate({ 'path': 'objeto', select: '', model: this.objetoModel });
        if( !objeto ) return null;
        return objeto;
    }

    async update( id: string, objeto: any ): Promise<IObjetoOperacion> {
        const objetoUpdated = await this.opobjetoModel.findOneAndUpdate({ _id: id }, objeto, { new: true })
            .populate({ 'path': 'objeto', select: '', model: this.objetoModel });
        if( !objetoUpdated ) return null;
        return objetoUpdated;
    }

    async delete( id: string ): Promise<IObjetoOperacion> {
        const objetoDeleted = await this.opobjetoModel.findByIdAndDelete( id )
            .populate({ 'path': 'objeto', select: '', model: this.objetoModel });
        if( !objetoDeleted ) return null;
        return objetoDeleted;
    }

}
