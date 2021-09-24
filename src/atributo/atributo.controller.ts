import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Res, UseGuards } from '@nestjs/common';
import { IsValidIdGuard } from 'src/common/guards/is-valid-id.guard';
import { AtributoService } from './atributo.service';
import { AtributoDTO } from './dto/atributo.dto';

@Controller('api/v1/admin/atributo')
export class AtributoController {

    constructor(
        private readonly _atributoService: AtributoService,
    ) {}

    @Post()
    async create( @Body() atributo: AtributoDTO, @Res() res ) {
        /* Verificamos si el nombre de las Reglas existe */
        // const nombreExists = await this._validatorService.reglaNameExists( reglas.nombre );
        // if( nombreExists ) return res.status(200).send({ message: 'El nombre de las Reglas ya se encuentra registrado !' });

        /* Guardamos las Reglas y hacemos el Response de la data */
        const atributoSaved = await this._atributoService.create( atributo );
        if( !atributoSaved ) return res.status(200).send({ message: 'Error al guardar el Atributo !' });
        return res.status(200).send({ data: atributoSaved });
    }

    @Get()
    async findAll(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Query('order') order: number = -1,
        @Res() res
    ) {
        /* Verificamos que los datos sean enviados correctamente */
        if( page.toString().trim() === '' || limit.toString().trim() === '' || order.toString().trim() === '' ) {
            return res.status(200).send({ message: 'No se han enviado los datos necesarios !' });
        }

        /* Obtenemos todas las reglas almacenadas en la BD y hacemos response de la data */
        const atributos = await this._atributoService.findAll({ page, limit, sort: { _id: order }});
        if( !atributos ) return res.status(200).send({ message: 'No se han encontrado Atributos registrados !' });
        return res.status(200).send({ data: atributos });
    }

    @UseGuards(IsValidIdGuard)
    @Get(':id')
    async findOne( @Param('id') id: string, @Res() res ) {
        /* Buscamos una sola regla mediante el id recibido y hacemos response de la data */
        const atributo = await this._atributoService.findOne( id );
        if( !atributo ) return res.status(200).send({ message: 'El atributo no ha sido encontrado !' });
        return res.status(200).send({ data: atributo });
    }

    @Get('/tipo/:type')
    async findByType( 
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Query('order') order: number = -1,
        @Param('type') type: string, @Res() res 
    ) {
        /* Verificamos que los datos sean enviados correctamente */
        if( page.toString().trim() === '' || limit.toString().trim() === '' || order.toString().trim() === '' ) {
            return res.status(200).send({ message: 'No se han enviado los datos necesarios !' });
        }

        /* Buscamos una sola regla mediante el id recibido y hacemos response de la data */
        const atributos = await this._atributoService.findByType( type, { page, limit, sort: { _id: order }});
        if( !atributos ) return res.status(200).send({ message: 'No se han encontrado atributos !' });
        return res.status(200).send({ data: atributos });
    }

    @UseGuards(IsValidIdGuard)
    @Patch(':id')
    async update( @Param('id') id: string, @Body() atributo: AtributoDTO, @Res() res ) {
        /* Verificamos que la regla que vamos actualizar exista */
        const atributoExists = await this._atributoService.findOne( id );
        if( !atributoExists ) return res.status(200).send({ message: 'El atributo no ha sido encontrado !' });

        /* Verificamos si la regla que actualizaremos actualizara su campo nombre y comprobamos si este ya esta en uso, si ya esta en uso los sacamos del endpoint */
        // const reglaNombreExists = await this._validatorService.checkNombreRegla( id, reglas.nombre );
        // if( reglaNombreExists ) return res.status(200).send({ message: reglaNombreExists });

        /* Actualizamos la regla y hacemos response de la data */
        const atributoUpdated = await this._atributoService.update( id, atributo );
        if( !atributoUpdated ) return res.status(200).send({ message: 'Error al actualizar la Regla !' });
        return res.status(200).send({ data: atributoUpdated });
    }

    @UseGuards(IsValidIdGuard)
    @Patch('/activoToggle/:id')
    async activoToggle( @Param('id') id: string, @Res() res ) {
        /* Verificamos que la Regla exista */
        const atributoExists = await this._atributoService.findOne( id );
        if( !atributoExists ) return res.status(200).send({ message: 'El atributo no ha sido encontrado !' });

         /* Actualizamos el estado "activo" de la Regla y hacemos el response de la data actualizada */
        const atributoUpdated = await this._atributoService.activoToggle( id );
        if( !atributoUpdated ) return res.status(200).send({ message: 'Error al actualizar el estado del Atributo !' });
        return res.status(200).send({ data: atributoUpdated });
    }

    @UseGuards(IsValidIdGuard)
    @Delete(':id')
    async delete( @Param('id') id: string, @Res() res ) {
        /* Verificamos que la regla que vamos actualizar exista */
        const atributoExists = await this._atributoService.findOne( id );
        if( !atributoExists ) return res.status(200).send({ message: 'El atributo no ha sido encontrado !' });

        /* Eliminamos la Regla y hacemos response de la data */
        const atributoDeleted = await this._atributoService.delete( id );
        if( !atributoDeleted ) return res.status(200).send({ message: 'Error al Eliminar el atributo !' });
        return res.status(200).send({ data: atributoDeleted });
    }
}
