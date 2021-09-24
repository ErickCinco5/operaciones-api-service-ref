import { Body, Controller, Delete, Get, Param, Patch, Post, Res, UseGuards } from '@nestjs/common';
import { IsValidIdGuard } from 'src/common/guards/is-valid-id.guard';
import { ValidatorService } from 'src/providers/validator.service';
import { CatreglasService } from './catreglas.service';
import { CatreglasDTO } from './dto/catreglas.dto';

@Controller('api/v1/admin/catreglas')
export class CatreglasController {

    constructor(
        private readonly _catreglasService: CatreglasService,
        private readonly _validatorService: ValidatorService,
    ) {}

    @Post()
    async create( @Body() catreglas: CatreglasDTO, @Res() res ) {
        /* Verificamos si el nombre de catreglas ya existe */
        const nameExists = await this._validatorService.catreglaNameExists( catreglas.nombre );
        if( nameExists ) return res.status(200).send({ message: 'El nombre de las Reglas de Categoria ya esta registrado !'})

        /* Guardamos la catreglas y hacemos el response de la data */
        const catreglasSaved = await this._catreglasService.create( catreglas );
        if( !catreglasSaved ) return res.status(200).send({ message: 'Error al guardar Reglas Categoria !' });
        return res.status(200).send({ data: catreglasSaved });
    }

    @Get()
    async findAll( @Res() res ) {
        /* Buscamos todas las catreglas registradas en la BD y hacemos el response de la data */
        const catreglas = await this._catreglasService.findAll();
        if( !catreglas ) return res.status(200).send({ message: 'No se han encontrado todas las Reglas de Categoria !' });
        return res.status(200).send({ data: catreglas });
    }

    @UseGuards(IsValidIdGuard)
    @Get(':id')
    async findOne( @Param('id') id: string, @Res() res ) {
        /* Buscamos la catregla y hacemos el response de la data */
        const catreglas = await this._catreglasService.findOne( id );
        if( !catreglas ) return res.status(200).send({ message: 'No se ha encontrado las Reglas de Categoria !' });
        return res.status(200).send({ data: catreglas });
    }

    @UseGuards(IsValidIdGuard)
    @Patch(':id')
    async update( @Param('id') id: string, @Body() catreglas: CatreglasDTO, @Res() res ) {
        /* Verificamos que la catregla exista */
        const catreglasExists = await this._catreglasService.findOne( id );
        if( !catreglasExists ) return res.status(200).send({ message: 'Las Reglas de Categoria no han sido encontradas !' });
        
        /* Verificamos que el nombre que se enviara en la actualizacion no se duplique */
        const nombreCatreglas = await this._validatorService.checkNombreCatregla( id, catreglas.nombre );
        if( nombreCatreglas ) return res.status(200).send({ message: nombreCatreglas });
        /* Actualizamos la catregla y hacemos el response de la data actualizada */
        const catreglasUpdated = await this._catreglasService.update( id, catreglas );
        if( !catreglasUpdated ) return res.status(200).send({ message: 'Error al actualizar las Reglas de Categoria !' });
        return res.status(200).send({ data: catreglasUpdated });
    }

    @UseGuards(IsValidIdGuard)
    @Patch('/activoToggle/:id')
    async activoToggle( @Param('id') id: string, @Res() res ) {
        /* Verificamos que la catregla exista */
        const catreglasExists = await this._catreglasService.findOne( id );
        if( !catreglasExists ) return res.status(200).send({ message: 'Las Reglas de Categoria no han sido encontradas !' });

         /* Actualizamos el estado "activo" de la catregla y hacemos el response de la data actualizada */
        const catreglasUpdated = await this._catreglasService.activoToggle( id );
        if( !catreglasUpdated ) return res.status(200).send({ message: 'Error al actualizar el estado de las Reglas de Categoria !' });
        return res.status(200).send({ data: catreglasUpdated });
    }

    @UseGuards(IsValidIdGuard)
    @Delete(':id')
    async delete( @Param('id') id: string, @Res() res ) {
        /* Verificamos que la catregla exista */
        const catreglasExists = await this._catreglasService.findOne( id );
        if( !catreglasExists ) return res.status(200).send({ message: 'Las Reglas de Categoria no han sido encontradas !' });

        /* Eliminamos la catregla y hacemos el response de la data que se ha eliminado */
        const catreglasDeleted = await this._catreglasService.delete( id );
        if( !catreglasDeleted ) return res.status(200).send({ message: 'Error al eliminar las Reglas de Categoria !' });
        return res.status(200).send({ data: catreglasDeleted });
    }

}
