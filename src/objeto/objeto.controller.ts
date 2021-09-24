import { Body, Controller, Delete, Get, Param, Patch, Post, Res, UseGuards } from '@nestjs/common';
import { IsValidIdGuard } from 'src/common/guards/is-valid-id.guard';
import { ObjetoDTO } from './dto/objeto.dto';
import { ObjetoService } from './objeto.service';

@Controller('api/v1/admin/objeto')
export class ObjetoController {

    constructor(
        private readonly _objetoService: ObjetoService,
    ) {}

    @Post()
    async create( @Body() objeto: ObjetoDTO, @Res() res ) {
        /* Verificamos si el nombre de Grupo de Operaciones ya existe */
        // const nameGrupoOperacionesExists = await this._validatorService.grupoOperacionesNameExists( grupoOperaciones.nombre );
        // if( nameGrupoOperacionesExists ) return res.status(200).send({ message: 'El nombre de Grupo de Operaciones ya se encuentra registrado !' });

        /* Guardamos el Grupo de Operaciones y hacemos el Response de la data */
        
        const objetoSaved = await this._objetoService.create( objeto );
        if( !objetoSaved ) return res.status(200).send({ message: 'Error al guardar el objeto !' });
        return res.status(200).send({ data: objetoSaved });
    }

    @Get()
    async findAll( @Res() res ) {
        /* Buscamos todas las catreglas registradas en la BD y hacemos el response de la data */
        const objetos = await this._objetoService.findAll();
        if( !objetos ) return res.status(200).send({ message: 'No se han encontrado objetos !' });
        return res.status(200).send({ data: objetos });
    }

    @UseGuards(IsValidIdGuard)
    @Get(':id')
    async findOne( @Param('id') id: string, @Res() res ) {
        /* Buscamos la catregla y hacemos el response de la data */
        const objeto = await this._objetoService.findOne( id );
        if( !objeto ) return res.status(200).send({ message: 'No se ha encontrado el objeto !' });
        return res.status(200).send({ data: objeto });
    }

    @UseGuards(IsValidIdGuard)
    @Patch(':id')
    async update( @Param('id') id: string, @Body() objeto: ObjetoDTO, @Res() res ) {
        /* Verificamos que la catregla exista */
        const objetoExists = await this._objetoService.findOne( id );
        if( !objetoExists ) return res.status(200).send({ message: 'El objeto no ha sido encontrado !' });
        
        /* Actualizamos la catregla y hacemos el response de la data actualizada */
        const objetoUpdated = await this._objetoService.update( id, objeto );
        if( !objetoUpdated ) return res.status(200).send({ message: 'Error al actualizar el objeto !' });
        return res.status(200).send({ data: objetoUpdated });
    }

    @UseGuards(IsValidIdGuard)
    @Patch('/activoToggle/:id')
    async activoToggle( @Param('id') id: string, @Res() res ) {
        /* Verificamos que la catregla exista */
        const objetoExists = await this._objetoService.findOne( id );
        if( !objetoExists ) return res.status(200).send({ message: 'El objeto no ha sido encontrado !' });

         /* Actualizamos el estado "activo" de la catregla y hacemos el response de la data actualizada */
        const objetoUpdated = await this._objetoService.activoToggle( id );
        if( !objetoUpdated ) return res.status(200).send({ message: 'Error al actualizar el estado del objeto !' });
        return res.status(200).send({ data: objetoUpdated });
    }

    @UseGuards(IsValidIdGuard)
    @Delete(':id')
    async delete( @Param('id') id: string, @Res() res ) {
        /* Verificamos que la catregla exista */
        const objetoExists = await this._objetoService.findOne( id );
        if( !objetoExists ) return res.status(200).send({ message: 'El objeto no ha sido encontrado !' });

        /* Eliminamos la catregla y hacemos el response de la data que se ha eliminado */
        const objetoDeleted = await this._objetoService.delete( id );
        if( !objetoDeleted ) return res.status(200).send({ message: 'Error al eliminar el objeto !' });
        return res.status(200).send({ data: objetoDeleted });
    }
}
