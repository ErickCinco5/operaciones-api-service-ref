import { Body, Controller, Delete, Get, Param, Patch, Post, Res, UseGuards } from '@nestjs/common';
import { IsValidIdGuard } from 'src/common/guards/is-valid-id.guard';
import { ValidatorService } from 'src/providers/validator.service';
import { ReglasDTO } from './dto/reglas.dto';
import { ReglasService } from './reglas.service';

@Controller('api/v1/admin/reglas')
export class ReglasController {

    constructor(
        private readonly _reglasService: ReglasService,
        private readonly _validatorService: ValidatorService,
    ) {}

    @Post()
    async create( @Body() reglas: ReglasDTO, @Res() res ) {
        /* Verificamos si el nombre de las Reglas existe */
        const nombreExists = await this._validatorService.reglaNameExists( reglas.nombre );
        if( nombreExists ) return res.status(200).send({ message: 'El nombre de las Reglas ya se encuentra registrado !' });

        /* Guardamos las Reglas y hacemos el Response de la data */
        const reglasSaved = await this._reglasService.create( reglas );
        if( !reglasSaved ) return res.status(200).send({ message: 'Error al guardar las Reglas !' });
        return res.status(200).send({ data: reglasSaved });
    }

    @Get()
    async findAll( @Res() res ) {
        /* Obtenemos todas las reglas almacenadas en la BD y hacemos response de la data */
        const reglas = await this._reglasService.findAll();
        if( !reglas ) return res.status(200).send({ message: 'No se han encontrado Reglas registradas !' });
        return res.status(200).send({ data: reglas });
    }

    @UseGuards(IsValidIdGuard)
    @Get(':id')
    async findOne( @Param('id') id: string, @Res() res ) {
        /* Buscamos una sola regla mediante el id recibido y hacemos response de la data */
        const regla = await this._reglasService.findOne( id );
        if( !regla ) return res.status(200).send({ message: 'La Regla no ha sido encontrada !' });
        return res.status(200).send({ data: regla });
    }

    @UseGuards(IsValidIdGuard)
    @Patch(':id')
    async update( @Param('id') id: string, @Body() reglas: ReglasDTO, @Res() res ) {
        /* Verificamos que la regla que vamos actualizar exista */
        const reglaExists = await this._reglasService.findOne( id );
        if( !reglaExists ) return res.status(200).send({ message: 'La Regla no ha sido encontrada !' });

        /* Verificamos si la regla que actualizaremos actualizara su campo nombre y comprobamos si este ya esta en uso, si ya esta en uso los sacamos del endpoint */
        const reglaNombreExists = await this._validatorService.checkNombreRegla( id, reglas.nombre );
        if( reglaNombreExists ) return res.status(200).send({ message: reglaNombreExists });

        /* Actualizamos la regla y hacemos response de la data */
        const reglaUpdated = await this._reglasService.update( id, reglas );
        if( !reglaUpdated ) return res.status(200).send({ message: 'Error al actualizar la Regla !' });
        return res.status(200).send({ data: reglaUpdated });
    }

    @UseGuards(IsValidIdGuard)
    @Patch('/activoToggle/:id')
    async activoToggle( @Param('id') id: string, @Res() res ) {
        /* Verificamos que la Regla exista */
        const reglasExists = await this._reglasService.findOne( id );
        if( !reglasExists ) return res.status(200).send({ message: 'Las Reglas no han sido encontradas !' });

         /* Actualizamos el estado "activo" de la Regla y hacemos el response de la data actualizada */
        const reglasUpdated = await this._reglasService.activoToggle( id );
        if( !reglasUpdated ) return res.status(200).send({ message: 'Error al actualizar el estado de las Reglas !' });
        return res.status(200).send({ data: reglasUpdated });
    }

    @UseGuards(IsValidIdGuard)
    @Delete(':id')
    async delete( @Param('id') id: string, @Res() res ) {
        /* Verificamos que la regla que vamos actualizar exista */
        const reglaExists = await this._reglasService.findOne( id );
        if( !reglaExists ) return res.status(200).send({ message: 'La Regla no ha sido encontrada !' });

        /* Eliminamos la Regla y hacemos response de la data */
        const reglaDeleted = await this._reglasService.delete( id );
        if( !reglaDeleted ) return res.status(200).send({ message: 'Error al Eliminar la Regla !' });
        return res.status(200).send({ data: reglaDeleted });
    }

}
