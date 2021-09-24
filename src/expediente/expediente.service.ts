import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { IOperacion } from 'src/common/interfaces/operacion.interface';
import { CATCOMPARECENCIA, EXPEDIENTE, GPOPERACIONES, OPERACION, OPOBJETO } from 'src/common/models/models';
import * as moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { IObjetoOperacion } from 'src/common/interfaces/objeto-operacion.interface';
import { ICatcomparecencia } from 'src/common/interfaces/catcomparecencia.interface';
import { IGrupoOperaciones } from 'src/common/interfaces/grupo-operaciones.interface';
import { ExpedienteDTO } from './dto/expediente.dto';
import { IExpediente } from 'src/common/interfaces/expediente.interface';

@Injectable()
export class ExpedienteService {

    constructor(
        @InjectModel( EXPEDIENTE.name ) private readonly expedienteModel: PaginateModel<IExpediente>,
        @InjectModel( OPERACION.name ) private readonly operacionModel: PaginateModel<IOperacion>,
        @InjectModel( OPOBJETO.name ) private readonly opobjetoModel: PaginateModel<IObjetoOperacion>,
        @InjectModel( CATCOMPARECENCIA.name ) private readonly comparecenciaModel: PaginateModel<ICatcomparecencia>,
        @InjectModel( GPOPERACIONES.name ) private readonly gpoperacionModel: PaginateModel<IGrupoOperaciones>,
    ) {}

    async create( expediente: ExpedienteDTO ): Promise<IExpediente> {
        console.log( expediente );
        const date = moment().format();
        const dateNum = date.replace(/-|:/g,'');
        const newExpediente = new this.expedienteModel({
            ...expediente,
            numExpediente: `${ uuidv4() }-${ dateNum }`,
            numSolicitud: `${ uuidv4() }-${ dateNum }`,
            createdDate: moment().format('MMMM Do YYYY, h:mm:ss a')
        });
        newExpediente.save();
        if( !newExpediente ) return null;
        return newExpediente;
    }
    
    async findAll( options: any, populated: string ): Promise<any> {
        if( populated === '1' ) {
            const expedientes = await this.expedienteModel.paginate({} , 
                { ...options, populate: { path: 'operaciones', select: '-atributos -docsPrevios -reglas -docsSoporte', model: this.operacionModel, populate: [
                    { path: 'comparecencias', model: this.comparecenciaModel },
                    { path: 'objetos', model: this.opobjetoModel },
                    { path: 'grupo', model: this.gpoperacionModel },
                ]}});
            if( !expedientes || expedientes.docs.length === 0 ) return null;
            return expedientes;
        } else {
            const expedientes = await this.expedienteModel.paginate({}, options );
            if( !expedientes || expedientes.docs.length === 0 ) return null;
            return expedientes;
        }
    }

    async findOne( id: string ): Promise<IExpediente> {
        const expediente = await this.expedienteModel.findById( id ).populate({ path: 'operaciones', select: '', model: this.operacionModel, populate: [
            { path: 'comparecencias', model: this.comparecenciaModel },
            { path: 'objetos', model: this.opobjetoModel },
            { path: 'grupo', model: this.gpoperacionModel },
        ]});
        if( !expediente ) return null;
        return expediente;
    }

    async update( id: string, expediente: any ): Promise<IExpediente> {
        const expedienteUpdated = await this.expedienteModel.findOneAndUpdate({ _id: id }, expediente, { new: true })
            .populate({ path: 'operaciones', select: '', model: this.operacionModel });
        if( !expedienteUpdated ) return null;
        return expedienteUpdated;
    }

    async activoToggle( id: string ): Promise<IExpediente> {
        const expediente = await this.findOne( id );
        if( !expediente ) return null;

        const expedienteUpdated = await this.expedienteModel.findOneAndUpdate({ _id: id }, { activo: !expediente.activo }, { new: true })
            .populate({ path: 'operaciones', select: '', model: this.operacionModel });
        if( !expedienteUpdated ) return null;
        return expedienteUpdated;
    }

    async delete( id: string ): Promise<IExpediente> {
        const expedienteUpdated = await this.expedienteModel.findByIdAndDelete( id )
            .populate({ path: 'operaciones', select: '', model: this.operacionModel });
        if( !expedienteUpdated ) return null;
        return expedienteUpdated;
    }
}