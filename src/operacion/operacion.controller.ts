import { Body, Controller, Delete, Get, Param, Patch, Post, Res, UseGuards } from '@nestjs/common';
import { CatcomparecenciaService } from 'src/catcomparecencia/catcomparecencia.service';
import { IsValidIdGuard } from 'src/common/guards/is-valid-id.guard';
import { GrupoOperacionesService } from 'src/grupo-operaciones/grupo-operaciones.service';
import { ObjetoOperacionService } from 'src/objeto-operacion/objeto-operacion.service';
import { OperacionDTO } from './dto/operacion.dto';
import { OperacionService } from './operacion.service';

@Controller('api/v1/admin/operacion')
export class OperacionController {

    constructor(
        private readonly _operacionService: OperacionService,
        private readonly _grupoOperacionesService: GrupoOperacionesService,
        private readonly _catComparecenciaService: CatcomparecenciaService,
        private readonly _opobjetosService: ObjetoOperacionService,
    ) {}

    @Post()
    async create( @Body() operacion: OperacionDTO, @Res() res ) {
        /* Validar que existan las comparecencias, los objetos creados para la operacion y el grupo asignado */
        if( !await this._grupoOperacionesService.findOne( operacion.grupo.toString() )) {
            return res.status(200).send({ message: 'El grupo de operaciones no ha sido encontrado !'});
        }

        if( operacion.comparecencias && operacion.comparecencias !== null ) {
            let comparecencias = [];
            operacion.comparecencias.map( async ( comparecencia ) => comparecencias.push( comparecencia.toString() ) );
            for await( let comparecencia of comparecencias ) {
                const comparecenciaFound = await this._catComparecenciaService.findOne( comparecencia );
                if( !comparecenciaFound ) return res.status(200).send({ message: 'La comparecencia no ha sido encontrada !' });
            }
        }

        if( operacion.objetos && operacion.objetos !== null ) {
            let objetos = [];
            operacion.objetos.map( async ( objeto ) => objetos.push( objeto.toString() ) );
            for await( let objeto of objetos ) {
                const objetoFound = await this._opobjetosService.findOne( objeto );
                if( !objetoFound ) return res.status(200).send({ message: 'El objeto para la operacion no ha sido encontrado !' });
            }
        }

        const operacionSaved = await this._operacionService.create( operacion );
        if( !operacionSaved ) return res.status(200).send({ message: 'Error al la operacion !'});
        return res.status(200).send({ data: operacionSaved });
    }
    
    @Get()
    async findAll( @Res() res ) {
        /* Obtenemos todas las reglas almacenadas en la BD y hacemos response de la data */
        const operaciones = await this._operacionService.findAll();
        if( !operaciones ) return res.status(200).send({ message: 'No se han encontrado operaciones registradas !' });
        return res.status(200).send({ data: operaciones });
    }

    @UseGuards(IsValidIdGuard)
    @Get(':id')
    async findOne( @Param('id') id: string, @Res() res ) {
        /* Buscamos la catregla y hacemos el response de la data */
        const objeto = await this._operacionService.findOne( id );
        if( !objeto ) return res.status(200).send({ message: 'No se ha encontrado el objeto !' });
        return res.status(200).send({ data: objeto });
    }

    @UseGuards(IsValidIdGuard)
    @Patch(':id')
    async update( @Param('id') id: string, @Body() operacion: OperacionDTO, @Res() res ) {
        /* Verificamos que la catregla exista */
        const operacionExists = await this._operacionService.findOne( id );
        if( !operacionExists ) return res.status(200).send({ message: 'La operacion no ha sido encontrada !' });
        
        /* Actualizamos la catregla y hacemos el response de la data actualizada */
        const operacionUpdated = await this._operacionService.update( id, operacion );
        if( !operacionUpdated ) return res.status(200).send({ message: 'Error al actualizar la operacion !' });
        return res.status(200).send({ data: operacionUpdated });
    }

    @UseGuards(IsValidIdGuard)
    @Patch('/activoToggle/:id')
    async activoToggle( @Param('id') id: string, @Res() res ) {
        /* Verificamos que la catregla exista */
        const operacionExists = await this._operacionService.findOne( id );
        if( !operacionExists ) return res.status(200).send({ message: 'La operacion no ha sido encontrada !' });

         /* Actualizamos el estado "activo" de la catregla y hacemos el response de la data actualizada */
        const operacionUpdated = await this._operacionService.activoToggle( id );
        if( !operacionUpdated ) return res.status(200).send({ message: 'Error al actualizar la operacion !' });
        return res.status(200).send({ data: operacionUpdated });
    }

    @UseGuards(IsValidIdGuard)
    @Delete(':id')
    async delete( @Param('id') id: string, @Res() res ) {
        /* Verificamos que la catregla exista */
        const operacionExists = await this._operacionService.findOne( id );
        if( !operacionExists ) return res.status(200).send({ message: 'La operacion no ha sido encontrada !' });

        /* Eliminamos la catregla y hacemos el response de la data que se ha eliminado */
        const operacionDeleted = await this._operacionService.delete( id );
        if( !operacionDeleted ) return res.status(200).send({ message: 'Error al eliminar la operacion !' });
        return res.status(200).send({ data: operacionDeleted });
    }

}
