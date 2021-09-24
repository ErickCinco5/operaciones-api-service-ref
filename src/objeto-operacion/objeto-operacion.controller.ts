import { Body, Controller, Delete, Get, Param, Patch, Post, Res, UseGuards } from '@nestjs/common';
import { IsValidIdGuard } from 'src/common/guards/is-valid-id.guard';
import { ObjetoService } from 'src/objeto/objeto.service';
import { ObjetoOperacionDTO } from './dto/objeto-operacion.dto';
import { ObjetoOperacionService } from './objeto-operacion.service';

@Controller('api/v1/admin/objeto-operacion')
export class ObjetoOperacionController {
    
    constructor(
        private readonly _objetoOperacionService: ObjetoOperacionService,
        private readonly _objetoService: ObjetoService,
    ) {}

    @Post()
    async create( @Body() opObjeto: ObjetoOperacionDTO, @Res() res ) {
        if( !opObjeto.objeto.toString().match(/^[0-9a-fA-F]{24}$/) ) return res.status(200).send({message: 'La peticion no es valida !'});

        const objeto = await this._objetoService.findOne( opObjeto.objeto.toString() );
        if( !objeto ) return res.status(200).send({ message: 'El objeto no existe !' });

        /* Guardamos el Grupo de Operaciones y hacemos el Response de la data */
        
        const opObjetoSaved = await this._objetoOperacionService.create( opObjeto );
        if( !opObjetoSaved ) return res.status(200).send({ message: 'Error al guardar el objeto en la operacion !' });
        return res.status(200).send({ data: opObjetoSaved });
    }

    @Get()
    async findAll( @Res() res ) {
        /* Buscamos todas las catreglas registradas en la BD y hacemos el response de la data */
        const objetos = await this._objetoOperacionService.findAll();
        if( !objetos ) return res.status(200).send({ message: 'No se han encontrado objetos de la operacion !' });
        return res.status(200).send({ data: objetos });
    }

    @UseGuards(IsValidIdGuard)
    @Get(':id')
    async findOne( @Param('id') id: string, @Res() res ) {
        /* Buscamos la catregla y hacemos el response de la data */
        const objeto = await this._objetoOperacionService.findOne( id );
        if( !objeto ) return res.status(200).send({ message: 'No se ha encontrado el objeto de la operacion !' });
        return res.status(200).send({ data: objeto });
    }

    @UseGuards(IsValidIdGuard)
    @Patch(':id')
    async update( @Param('id') id: string, @Body() opObjeto: ObjetoOperacionDTO, @Res() res ) {
        /* Verificamos que la catregla exista */
        const objetoExists = await this._objetoService.findOne( opObjeto.objeto.toString() );
        if( !objetoExists ) return res.status(200).send({ message: 'El objeto de la operacion no ha sido encontrado !' });
        
        /* Actualizamos la catregla y hacemos el response de la data actualizada */
        const objetoUpdated = await this._objetoOperacionService.update( id, opObjeto );
        if( !objetoUpdated ) return res.status(200).send({ message: 'Error al actualizar el objeto de la operacion !' });
        return res.status(200).send({ data: objetoUpdated });
    }

    @UseGuards(IsValidIdGuard)
    @Delete(':id')
    async delete( @Param('id') id: string, @Res() res ) {
        /* Verificamos que la catregla exista */
        const objetoExists = await this._objetoOperacionService.findOne( id );
        if( !objetoExists ) return res.status(200).send({ message: 'El objeto de la operacion no ha sido encontrado !' });

        /* Eliminamos la catregla y hacemos el response de la data que se ha eliminado */
        const objetoDeleted = await this._objetoOperacionService.delete( id );
        if( !objetoDeleted ) return res.status(200).send({ message: 'Error al eliminar el objeto de la operacion !' });
        return res.status(200).send({ data: objetoDeleted });
    }
}
