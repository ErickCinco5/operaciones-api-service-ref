import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { IAtributo } from 'src/common/interfaces/atributo.interface';
import { ATRIBUTO } from 'src/common/models/models';
import { AtributoDTO } from './dto/atributo.dto';
import * as moment from 'moment';

@Injectable()
export class AtributoService {

    constructor(
        @InjectModel( ATRIBUTO.name ) private readonly atributoModel: PaginateModel<IAtributo>,
    ) {}

    async create( atributo: AtributoDTO ): Promise<IAtributo> {
        const newAtributo = new this.atributoModel({
            ...atributo,
            activo: true,
            createdDate: moment().format('MMMM Do YYYY, h:mm:ss a')
        });
        console.log( newAtributo );
        newAtributo.save();
        if( !newAtributo ) return null;
        return newAtributo;
    }

    async findAll( options: any ): Promise<any> {
        const atributos = await this.atributoModel.paginate({}, options );
        if( !atributos ) return null;
        return atributos;
    }

    async findOne( id: string ): Promise<IAtributo> {
        const atributo = await this.atributoModel.findById( id );
        if( !atributo ) return null;
        return atributo;
    }

    async findByType( type: string, options: any ): Promise<any> {
        const atributos = await this.atributoModel.paginate({ tipo: type }, options );
        if( !atributos ) return null;
        return atributos;
    }

    async update( id: string, atributo: AtributoDTO ): Promise<IAtributo> {
        const atributoUpdated = await this.atributoModel.findOneAndUpdate({ _id: id }, atributo, { new: true });
        if( !atributoUpdated ) return null;
        return atributoUpdated;
    }

    async activoToggle( id: string ): Promise<IAtributo> {
        const atributo = await this.findOne( id );
        if( !atributo ) return null;

        const atributoUpdated = await this.atributoModel.findOneAndUpdate({ _id: id }, { activo: !atributo.activo }, { new: true });
        if( !atributoUpdated ) return null;
        return atributoUpdated;
    }

    async delete( id: string ): Promise<IAtributo> {
        const atributoDeleted = await this.atributoModel.findByIdAndDelete( id );
        if( !atributoDeleted ) return null;
        return atributoDeleted;
    }

}
