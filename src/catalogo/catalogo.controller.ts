import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Res, UseGuards } from '@nestjs/common';
import { IsValidIdGuard } from 'src/common/guards/is-valid-id.guard';
import { CatalogoService } from './catalogo.service';
import { CatalogoDTO } from './dto/catalogo.dto';

@Controller('api/v1/admin/catalogo')
export class CatalogoController {

    constructor(
        private readonly _catalogoService: CatalogoService,
    ) {}

    @Post()
    async create( @Body() catalogo: CatalogoDTO, @Res() res ) {
        /* Verificamos si el nombre de las Reglas existe */
        // const nombreExists = await this._validatorService.reglaNameExists( reglas.nombre );
        // if( nombreExists ) return res.status(200).send({ message: 'El nombre de las Reglas ya se encuentra registrado !' });

        /* Guardamos las Reglas y hacemos el Response de la data */
        const catalogoSaved = await this._catalogoService.create( catalogo );
        if( !catalogoSaved ) return res.status(200).send({ message: 'Error al guardar el catalogo !' });
        return res.status(200).send({ data: catalogoSaved });
    }

    @Get()
    async findAll(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Query('order') order: number = -1,
        @Query('type') type: string = 'all',
        @Res() res
    ) {
        /* Verificamos que los datos sean enviados correctamente */
        if( page.toString().trim() === '' || limit.toString().trim() === '' || order.toString().trim() === '' || type.trim() === '' ) {
            return res.status(200).send({ message: 'No se han enviado los datos necesarios !' });
        }

        /* Obtenemos todas las reglas almacenadas en la BD y hacemos response de la data */
        const catalogos = await this._catalogoService.findAll( type, { page, limit, sort: { _id: order }});
        if( !catalogos ) return res.status(200).send({ message: 'No se han encontrado catalogos registrados !' });
        return res.status(200).send({ data: catalogos });
    }

    @UseGuards(IsValidIdGuard)
    @Get(':id')
    async findOne( @Param('id') id: string, @Res() res ) {
        /* Buscamos una sola regla mediante el id recibido y hacemos response de la data */
        const catalogo = await this._catalogoService.findOne( id );
        if( !catalogo ) return res.status(200).send({ message: 'El catalogo no ha sido encontrado !' });
        return res.status(200).send({ data: catalogo });
    }


    @UseGuards(IsValidIdGuard)
    @Patch(':id')
    async update( @Param('id') id: string, @Body() catalogo: CatalogoDTO, @Res() res ) {
        /* Verificamos que la regla que vamos actualizar exista */
        const catalogoExists = await this._catalogoService.findOne( id );
        if( !catalogoExists ) return res.status(200).send({ message: 'El catalogo no ha sido encontrado !' });

        /* Verificamos si la regla que actualizaremos actualizara su campo nombre y comprobamos si este ya esta en uso, si ya esta en uso los sacamos del endpoint */
        // const reglaNombreExists = await this._validatorService.checkNombreRegla( id, reglas.nombre );
        // if( reglaNombreExists ) return res.status(200).send({ message: reglaNombreExists });

        /* Actualizamos la regla y hacemos response de la data */
        const catalogoUpdated = await this._catalogoService.update( id, catalogo );
        if( !catalogoUpdated ) return res.status(200).send({ message: 'Error al actualizar la Regla !' });
        return res.status(200).send({ data: catalogoUpdated });
    }

    @UseGuards(IsValidIdGuard)
    @Patch('/activoToggle/:id')
    async activoToggle( @Param('id') id: string, @Res() res ) {
        /* Verificamos que la Regla exista */
        const catalogoExists = await this._catalogoService.findOne( id );
        if( !catalogoExists ) return res.status(200).send({ message: 'El catalogo no ha sido encontrado !' });

         /* Actualizamos el estado "activo" de la Regla y hacemos el response de la data actualizada */
        const catalogoUpdated = await this._catalogoService.activoToggle( id );
        if( !catalogoUpdated ) return res.status(200).send({ message: 'Error al actualizar el estado del catalogo !' });
        return res.status(200).send({ data: catalogoUpdated });
    }

    @UseGuards(IsValidIdGuard)
    @Delete(':id')
    async delete( @Param('id') id: string, @Res() res ) {
        /* Verificamos que la regla que vamos actualizar exista */
        const catalogoExists = await this._catalogoService.findOne( id );
        if( !catalogoExists ) return res.status(200).send({ message: 'El catalogo no ha sido encontrado !' });

        /* Eliminamos la Regla y hacemos response de la data */
        const catalogoDeleted = await this._catalogoService.delete( id );
        if( !catalogoDeleted ) return res.status(200).send({ message: 'Error al Eliminar el catalogo !' });
        return res.status(200).send({ data: catalogoDeleted });
    }
}
