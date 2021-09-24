import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { IObjeto } from 'src/common/interfaces/objeto.interface';
import { OBJETO } from 'src/common/models/models';
import { ObjetoDTO } from './dto/objeto.dto';
import * as moment from 'moment';

@Injectable()
export class ObjetoService {

    constructor(
        @InjectModel( OBJETO.name ) private readonly objetoModel: PaginateModel<IObjeto>,
    ) {}

    async create( objeto: ObjetoDTO ): Promise<IObjeto> {
        const newObjeto = new this.objetoModel({
            ...objeto,
            createdDate: moment().format('MMMM Do YYYY, h:mm:ss a')
        });
        newObjeto.save();
        if( !newObjeto ) return null;
        return newObjeto;
    }

    async findAll(): Promise<IObjeto[]> {
        const objetos = await this.objetoModel.find().sort({ _id: -1 });
        if( !objetos ) return null;
        return objetos;
    }

    async findOne( id: string ): Promise<IObjeto> {
        const objeto = await this.objetoModel.findById( id );
        if( !objeto ) return null;
        return objeto;
    }

    async update( id: string, objeto: any ): Promise<IObjeto> {
        const objetoUpdated = await this.objetoModel.findOneAndUpdate({ _id: id }, objeto, { new: true });
        if( !objetoUpdated ) return null;
        return objetoUpdated;
    }

    async activoToggle( id: string ): Promise<IObjeto> {
        const objeto = await this.findOne( id );
        if( !objeto ) return null;

        const objetoUpdated = await this.objetoModel.findOneAndUpdate({ _id: id }, { activo: !objeto.activo }, { new: true });
        if( !objetoUpdated ) return null;
        return objetoUpdated;
    }

    async delete( id: string ): Promise<IObjeto> {
        const objetoDeleted = await this.objetoModel.findByIdAndDelete( id );
        if( !objetoDeleted ) return null;
        return objetoDeleted;
    }
}
