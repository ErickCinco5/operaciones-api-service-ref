import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { ICatreglas } from 'src/common/interfaces/catreglas.interface';
import { CATREGLAS } from 'src/common/models/models';
import { CatreglasDTO } from './dto/catreglas.dto';
import * as moment from 'moment';

@Injectable()
export class CatreglasService {

    constructor(
        @InjectModel( CATREGLAS.name ) private readonly catreglasModel: PaginateModel<ICatreglas> 
    ) {}

    async create( catreglas: CatreglasDTO ): Promise<ICatreglas> {
        const newCatreglas = new this.catreglasModel({
            ...catreglas,
            activo: true,
            createdDate: moment().format('MMMM Do YYYY, h:mm:ss a')
        });
        newCatreglas.save();
        if( !newCatreglas ) return null;
        return newCatreglas;
    }

    async findAll(): Promise<ICatreglas[]> {
        const catreglas = await this.catreglasModel.find().sort({ _id: -1 });
        if( !catreglas ) return null;
        return catreglas;
    }

    async findOne( id: string ): Promise<ICatreglas> {
        const catreglas = await this.catreglasModel.findById( id );
        if( !catreglas ) return null;
        return catreglas;
    }

    async update( id: string, catreglas: any ): Promise<any> {
        const catreglasUpdated = await this.catreglasModel.findOneAndUpdate({ _id: id }, catreglas, { new: true });
        if( !catreglasUpdated ) return null;
        return catreglasUpdated;
    }

    async activoToggle( id: string ): Promise<ICatreglas> {
        const catreglas = await this.findOne( id );
        if( !catreglas ) return null;

        const catreglasToggleactivo = await this.catreglasModel.findOneAndUpdate({ _id: id }, { activo: !catreglas.activo }, { new: true });
        if( !catreglasToggleactivo ) return null;
        return catreglasToggleactivo;
    }

    async delete( id: string ): Promise<ICatreglas> {
        const catreglasDeleted = await this.catreglasModel.findByIdAndDelete( id );
        if( !catreglasDeleted ) return null;
        return catreglasDeleted;
    }

}
