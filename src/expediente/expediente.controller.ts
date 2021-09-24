import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Res, UseGuards } from '@nestjs/common';
import { IsValidIdGuard } from 'src/common/guards/is-valid-id.guard';
import { OperacionService } from 'src/operacion/operacion.service';
import { ExpedienteDTO } from './dto/expediente.dto';
import { ExpedienteService } from './expediente.service';

@Controller('api/v1/admin/expediente')
export class ExpedienteController {

    constructor(
        private readonly _expedienteService: ExpedienteService,
        private readonly _operacionService: OperacionService,
    ) {}

    @Post()
    async create( @Body() expediente: ExpedienteDTO, @Res() res ) {
        /* Recibimos el expediente y si viene ingresadas las referencias de las operaciones que llevara, verificar que estas operaciones existan */
        if( expediente.operaciones && expediente.operaciones !== null ) {
            let operaciones = [];
            expediente.operaciones.map( async ( operacion ) => operaciones.push( operacion.toString() ) );
            for await( let operacion of operaciones ) {
                if( !operacion.match(/^[0-9a-fA-F]{24}$/) ) return res.status(200).send({ message: 'La operacion ingresada es invalida !' });
                const operacionFound = await this._operacionService.findOne( operacion );
                if( !operacionFound ) return res.status(200).send({ message: 'La operacion no ha sido encontrada !' });
            }
        }

        /* Crear y guardar el expediente, response de la data */
        const expedienteSaved = await this._expedienteService.create( expediente );
        if( !expedienteSaved ) return res.status(200).send({ message: 'Error al generar el expediente !'});
        return res.status(200).send({ data: expedienteSaved });
    }

    @Get()
    async findAll( 
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Query('order') order: number = -1,
        @Query('populated') populated: string = '1',
        @Res() res ) {
            console.log( populated );
        /* Obtenemos todos los expedientes con sus Filtros que envie el usuario ! */
        const operaciones = await this._expedienteService.findAll({ page, limit, sort: { _id: order }}, populated );
        if( !operaciones ) return res.status(200).send({ message: 'No se han encontrado expedientes !' });
        return res.status(200).send({ data: operaciones });
    }

    @UseGuards(IsValidIdGuard)
    @Get(':id')
    async findOne( @Param('id') id: string, @Res() res ) {
        /* Buscamos el expediente y hacemos el response de la data */
        const objeto = await this._expedienteService.findOne( id );
        if( !objeto ) return res.status(200).send({ message: 'No se ha encontrado el expediente !' });
        return res.status(200).send({ data: objeto });
    }

    @UseGuards(IsValidIdGuard)
    @Patch(':id')
    async update( @Param('id') id: string, @Body() expediente: ExpedienteDTO, @Res() res ) {
        /* Verificamos que el expediente exista */
        const expedienteExists = await this._expedienteService.findOne( id );
        if( !expedienteExists ) return res.status(200).send({ message: 'El expediente no ha sido encontrado !' });
        
        /* Actualizamos el expediente y hacemos el response de la data actualizada */
        const expedienteUpdated = await this._expedienteService.update( id, expediente );
        if( !expedienteUpdated ) return res.status(200).send({ message: 'Error al actualizar el expediente !' });
        return res.status(200).send({ data: expedienteUpdated });
    }

    @UseGuards(IsValidIdGuard)
    @Patch('/activoToggle/:id')
    async activoToggle( @Param('id') id: string, @Res() res ) {
        /* Verificamos que el expediente exista */
        const expedienteExists = await this._expedienteService.findOne( id );
        if( !expedienteExists ) return res.status(200).send({ message: 'El expediente no ha sido encontrado !' });

         /* Actualizamos el estado "activo" del expediente y hacemos el response de la data actualizada */
        const expedienteUpdated = await this._expedienteService.activoToggle( id );
        if( !expedienteUpdated ) return res.status(200).send({ message: 'Error al actualizar el expediente !' });
        return res.status(200).send({ data: expedienteUpdated });
    }

    @UseGuards(IsValidIdGuard)
    @Delete(':id')
    async delete( @Param('id') id: string, @Res() res ) {
        /* Verificamos que el expediente exista */
        const expedienteExists = await this._expedienteService.findOne( id );
        if( !expedienteExists ) return res.status(200).send({ message: 'El expediente no ha sido encontrado !' });

        /* Eliminamos el expediente y hacemos el response de la data que se ha eliminado */
        const expedienteDeleted = await this._expedienteService.delete( id );
        if( !expedienteDeleted ) return res.status(200).send({ message: 'Error al eliminar el expediente !' });
        return res.status(200).send({ data: expedienteDeleted });
    }

}
