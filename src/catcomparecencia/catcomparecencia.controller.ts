import { Body, Controller, Delete, Get, Param, Patch, Post, Res, UseGuards } from '@nestjs/common';
import { IsValidIdGuard } from 'src/common/guards/is-valid-id.guard';
import { CatcomparecenciaService } from './catcomparecencia.service';
import { CatComparecenciaDTO } from './dto/catcomparecencia.dto';

@Controller('api/v1/admin/catcomparecencia')
export class CatcomparecenciaController {

    constructor(
        private readonly _catcomparecenciaService: CatcomparecenciaService,
    ) {}
    
    @Post()
    async create( @Body() catcomparecencia: CatComparecenciaDTO, @Res() res ) {
        /* Verificamos si el nombre de Grupo de Operaciones ya existe */
        // const nameGrupoOperacionesExists = await this._validatorService.grupoOperacionesNameExists( grupoOperaciones.nombre );
        // if( nameGrupoOperacionesExists ) return res.status(200).send({ message: 'El nombre de Grupo de Operaciones ya se encuentra registrado !' });

        /* Guardamos el Grupo de Operaciones y hacemos el Response de la data */
        
        const catcomparecenciaSaved = await this._catcomparecenciaService.create( catcomparecencia );
        if( !catcomparecenciaSaved ) return res.status(200).send({ message: 'Error al guardar la catcomparecencia !' });
        return res.status(200).send({ data: catcomparecenciaSaved });
    }

    @Get()
    async findAll( @Res() res ) {
        /* Buscamos todas las catreglas registradas en la BD y hacemos el response de la data */
        const catcomparecencias = await this._catcomparecenciaService.findAll({});
        if( !catcomparecencias ) return res.status(200).send({ message: 'No se han encontrado catcomparecencias !' });
        return res.status(200).send({ data: catcomparecencias });
    }

    @UseGuards(IsValidIdGuard)
    @Get(':id')
    async findOne( @Param('id') id: string, @Res() res ) {
        /* Buscamos la catregla y hacemos el response de la data */
        const catcomparecencia = await this._catcomparecenciaService.findOne( id );
        if( !catcomparecencia ) return res.status(200).send({ message: 'No se ha encontrado la catcomparecencia !' });
        return res.status(200).send({ data: catcomparecencia });
    }

    @UseGuards(IsValidIdGuard)
    @Patch(':id')
    async update( @Param('id') id: string, @Body() catcomparecencia: CatComparecenciaDTO, @Res() res ) {
        /* Verificamos que la catregla exista */
        const catcomparecenciaExists = await this._catcomparecenciaService.findOne( id );
        if( !catcomparecenciaExists ) return res.status(200).send({ message: 'La catcomparecencia no ha sido encontrada !' });
        
        /* Actualizamos la catregla y hacemos el response de la data actualizada */
        const catcomparecenciaUpdated = await this._catcomparecenciaService.update( id, catcomparecencia );
        if( !catcomparecenciaUpdated ) return res.status(200).send({ message: 'Error al actualizar la catcomparecencia !' });
        return res.status(200).send({ data: catcomparecenciaUpdated });
    }

    @UseGuards(IsValidIdGuard)
    @Patch('/activoToggle/:id')
    async activoToggle( @Param('id') id: string, @Res() res ) {
        /* Verificamos que la catregla exista */
        const catcomparecenciaExists = await this._catcomparecenciaService.findOne( id );
        if( !catcomparecenciaExists ) return res.status(200).send({ message: 'La catcomparecencia no ha sido encontrada !' });

         /* Actualizamos el estado "activo" de la catregla y hacemos el response de la data actualizada */
        const catcomparecenciaUpdated = await this._catcomparecenciaService.activoToggle( id );
        if( !catcomparecenciaUpdated ) return res.status(200).send({ message: 'Error al actualizar el estado de las Reglas de Categoria !' });
        return res.status(200).send({ data: catcomparecenciaUpdated });
    }

    @UseGuards(IsValidIdGuard)
    @Delete(':id')
    async delete( @Param('id') id: string, @Res() res ) {
        /* Verificamos que la catregla exista */
        const catcomparecenciaExists = await this._catcomparecenciaService.findOne( id );
        if( !catcomparecenciaExists ) return res.status(200).send({ message: 'La catcomparecencia no ha sido encontrada !' });

        /* Eliminamos la catregla y hacemos el response de la data que se ha eliminado */
        const catcomparecenciaDeleted = await this._catcomparecenciaService.delete( id );
        if( !catcomparecenciaDeleted ) return res.status(200).send({ message: 'Error al eliminar la catcomparecencia !' });
        return res.status(200).send({ data: catcomparecenciaDeleted });
    }
}
