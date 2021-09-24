import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { ICatalogo } from 'src/common/interfaces/catalogo.interface';
import { CATALOGO } from 'src/common/models/models';
import { CatalogoDTO } from './dto/catalogo.dto';
import * as moment from 'moment';

@Injectable()
export class CatalogoService {

    constructor(
        @InjectModel( CATALOGO.name ) private readonly catalogoModel: PaginateModel<ICatalogo>,
    ) {}

    async create( catalogo: CatalogoDTO ): Promise<ICatalogo> {
        const newCatalogo = new this.catalogoModel({
            ...catalogo,
            activo: true,
            createdDate: moment().format('MMMM Do YYYY, h:mm:ss a')
        });
        newCatalogo.save();
        if( !newCatalogo ) return null;
        return newCatalogo;
    }

    async findAll( type, options: any ): Promise<any> {
        console.log( type );
        let catalogos: any;
        switch (true) {
            case type === 'all':
                catalogos = await this.catalogoModel.paginate({}, options );
                break;

            case type !== 'all':
                catalogos = await this.catalogoModel.paginate({ tipo: type }, options );
                break;
            default:
                break;
        }
       
        if( !catalogos || catalogos.docs.length === 0 ) return null;
        return catalogos;
    }

    async findOne( id: string ): Promise<ICatalogo> {
        const catalogo = await this.catalogoModel.findById( id );
        if( !catalogo ) return null;
        return catalogo;
    }

    async findByType( type: string, options: any ): Promise<any> {
        const catalogos = await this.catalogoModel.paginate({ tipo: type }, options );
        if( !catalogos ) return null;
        return catalogos;
    }

    async update( id: string, catalogo: CatalogoDTO ): Promise<ICatalogo> {
        const catalogoUpdated = await this.catalogoModel.findOneAndUpdate({ _id: id }, catalogo, { new: true });
        if( !catalogoUpdated ) return null;
        return catalogoUpdated;
    }

    async activoToggle( id: string ): Promise<ICatalogo> {
        const catalogo = await this.findOne( id );
        if( !catalogo ) return null;

        const catalogoUpdated = await this.catalogoModel.findOneAndUpdate({ _id: id }, { activo: !catalogo.activo }, { new: true });
        if( !catalogoUpdated ) return null;
        return catalogoUpdated;
    }

    async delete( id: string ): Promise<ICatalogo> {
        const catalogoDeleted = await this.catalogoModel.findByIdAndDelete( id );
        if( !catalogoDeleted ) return null;
        return catalogoDeleted;
    }

}
