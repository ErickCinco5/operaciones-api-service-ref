import { Body, Controller, Delete, Get, Param, Patch, Post, Res, UseGuards } from '@nestjs/common';
import { IsValidIdGuard } from 'src/common/guards/is-valid-id.guard';
import { ValidatorService } from 'src/providers/validator.service';
import { GrupoOperacionesDTO } from './dto/grupo-operaciones.dto';
import { GrupoOperacionesService } from './grupo-operaciones.service';

@Controller('api/v1/admin/grupo-operaciones')
export class GrupoOperacionesController {

    constructor(
        private readonly _grupoOperacionesService: GrupoOperacionesService,
        private readonly _validatorService: ValidatorService,
    ) {}

    @Post()
    async create( @Body() grupoOperaciones: GrupoOperacionesDTO, @Res() res ) {
        /* Verificamos si el nombre de Grupo de Operaciones ya existe */
        const nameGrupoOperacionesExists = await this._validatorService.grupoOperacionesNameExists( grupoOperaciones.nombre );
        if( nameGrupoOperacionesExists ) return res.status(200).send({ message: 'El nombre de Grupo de Operaciones ya se encuentra registrado !' });

        /* Guardamos el Grupo de Operaciones y hacemos el Response de la data */
        const grupoOperacionesSaved = await this._grupoOperacionesService.create( grupoOperaciones );
        if( !grupoOperacionesSaved ) return res.status(200).send({ message: 'Error al guardar el Grupo de Operaciones !' });
        return res.status(200).send({ data: grupoOperacionesSaved });
    }

    @Get()
    async findAll( @Res() res ) {
        /* Obtenemos todos los Grupos de operaciones almacenados en la BD y hacemos response de la data */
        const gruposOperaciones = await this._grupoOperacionesService.findAll();
        if( !gruposOperaciones ) return res.status(200).send({ message: 'No se han encontrado Grupos de Operaciones !' });
        return res.status(200).send({ data: gruposOperaciones });
    }

    @UseGuards(IsValidIdGuard)
    @Get(':id')
    async findOne( @Param('id') id: string, @Res() res ) {
        /* Buscamos un solo Grupo de Operaciones mediante el id recibido y hacemos response de la data */
        const grupoOperaciones = await this._grupoOperacionesService.findOne( id );
        if( !grupoOperaciones ) return res.status(200).send({ message: 'El Grupo de Operaciones no ha sido encontrado !' });
        return res.status(200).send({ data: grupoOperaciones });
    }

    @UseGuards(IsValidIdGuard)
    @Patch(':id')
    async update( @Param('id') id: string, @Body() grupoOperaciones: GrupoOperacionesDTO, @Res() res ) {
        /* Verificamos que el Grupo de Operaciones que vamos actualizar exista */
        const grupoOperacionesExists = await this._grupoOperacionesService.findOne( id );
        if( !grupoOperacionesExists ) return res.status(200).send({ message: 'El Grupo de Operaciones no ha sido encontrado !' });

        /* Verificamos si el grupo que actualizaremos actualizara su campo nombre y comprobamos si este ya esta en uso, si ya esta en uso los sacamos del endpoint */
        const nombreGrupoOperacionesExists = await this._validatorService.checkNombreGrupoOperaciones( id, grupoOperaciones.nombre );
        if( nombreGrupoOperacionesExists ) return res.status(200).send({ message: nombreGrupoOperacionesExists });

        /* Actualizamos el Grupo de Operaciones y hacemos response de la data */
        const grupoOperacionesUpdated = await this._grupoOperacionesService.update( id, grupoOperaciones );
        if( !grupoOperacionesUpdated ) return res.status(200).send({ message: 'Error al actualizar el Grupo de Operaciones !' });
        return res.status(200).send({ data: grupoOperacionesUpdated });
    }

    @UseGuards(IsValidIdGuard)
    @Patch('/activoToggle/:id')
    async activoToggle( @Param('id') id: string, @Res() res ) {
        /* Verificamos que el Grupo de Operaciones que vamos actualizar exista */
        const grupoOperacionesExists = await this._grupoOperacionesService.findOne( id );
        if( !grupoOperacionesExists ) return res.status(200).send({ message: 'El Grupo de Operaciones no ha sido encontrado !' });

         /* Actualizamos el estado "activo" del Grupo de operaciones y hacemos el response de la data actualizada */
        const grupoOperacionesUpdated = await this._grupoOperacionesService.activoToggle( id );
        if( !grupoOperacionesUpdated ) return res.status(200).send({ message: 'Error al actualizar el estado del Grupo de Operaciones !' });
        return res.status(200).send({ data: grupoOperacionesUpdated });
    }

    @UseGuards(IsValidIdGuard)
    @Delete(':id')
    async delete( @Param('id') id: string, @Res() res ) {
         /* Verificamos que el Grupo de Operaciones que vamos actualizar exista */
        const grupoOperacionesExists = await this._grupoOperacionesService.findOne( id );
        if( !grupoOperacionesExists ) return res.status(200).send({ message: 'El Grupo de Operaciones no ha sido encontrado !' });

        /* Eliminamos el Grupo de Operaciones y hacemos response de la data */
        const grupoOperacionesDeleted = await this._grupoOperacionesService.delete( id );
        if( !grupoOperacionesDeleted ) return res.status(200).send({ message: 'Error al Eliminar el Grupo de Operaciones !' });
        return res.status(200).send({ data: grupoOperacionesDeleted });
    }

}
