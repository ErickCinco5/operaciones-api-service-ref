import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { IReglas } from 'src/common/interfaces/reglas.interface';
import { REGLAS } from 'src/common/models/models';
import { ReglasDTO } from './dto/reglas.dto';
import * as moment from 'moment';

@Injectable()
export class ReglasService {

    constructor(
        @InjectModel( REGLAS.name ) private readonly reglasModel: PaginateModel<IReglas>
    ) {}

    async create( reglas: ReglasDTO ): Promise<IReglas> {
        const reglasToSave = new this.reglasModel({
            ...reglas,
            createdDate: moment().format('MMMM Do YYYY, h:mm:ss a')
        });
        reglasToSave.save();
        if( !reglasToSave ) return null;
        return reglasToSave;
    }

    async findAll(): Promise<IReglas[]> {
        const reglas = await this.reglasModel.find().sort({ _id: -1 });
        if( !reglas ) return null;
        return reglas;
    }

    async findOne( id: string ): Promise<IReglas> {
        const regla = await this.reglasModel.findById( id );
        if( !regla ) return null;
        return regla;
    }

    async update( id: string, reglas: ReglasDTO ): Promise<IReglas> {
        const regla = await this.reglasModel.findOneAndUpdate({ _id: id }, reglas, { new: true });
        if( !regla ) return null;
        return regla; 
    }

    async activoToggle( id: string ): Promise<IReglas> {
        const reglas = await this.findOne( id );
        if( !reglas ) return null;

        const reglasToggleactivo = await this.reglasModel.findOneAndUpdate({ _id: id }, { activo: !reglas.activo }, { new: true });
        if( !reglasToggleactivo ) return null;
        return reglasToggleactivo;
    }

    async delete( id: string ): Promise<IReglas> {
        const reglasDeleted = await this.reglasModel.findByIdAndDelete( id );
        if( !reglasDeleted ) return null;
        return reglasDeleted;
    }

}
