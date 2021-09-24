import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AtributoSchema } from 'src/atributo/schema/atributo.schema';
import { CatalogoSchema } from 'src/catalogo/schema/catalogo.schema';
import { CatComparecenciaSchema } from 'src/catcomparecencia/schema/catComparecencia.schema';
import { ATRIBUTO, CATALOGO, CATCOMPARECENCIA, EXPEDIENTE, GPOPERACIONES, OPERACION, OPOBJETO } from 'src/common/models/models';
import { GrupoOperacionesSchema } from 'src/grupo-operaciones/schema/grupo-operaciones.schema';
import { ObjetoOperacionSchema } from 'src/objeto-operacion/schema/objeto-operacion.schema';
import { OperacionService } from 'src/operacion/operacion.service';
import { OperacionSchema } from 'src/operacion/schema/operacion.schema';
import { ExpedienteController } from './expediente.controller';
import { ExpedienteService } from './expediente.service';
import { ExpedienteSchema } from './schema/expediente.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      { name: EXPEDIENTE.name, useFactory: () => ( ExpedienteSchema )},
      { name: OPERACION.name, useFactory: () => ( OperacionSchema )},
      { name: OPOBJETO.name, useFactory: () => ( ObjetoOperacionSchema )},
      { name: CATCOMPARECENCIA.name, useFactory: () => ( CatComparecenciaSchema )},
      { name: GPOPERACIONES.name, useFactory: () => ( GrupoOperacionesSchema )},
      { name: CATALOGO.name, useFactory: () => ( CatalogoSchema )},
      { name: ATRIBUTO.name, useFactory: () => ( AtributoSchema )},
    ])
  ],
  controllers: [ExpedienteController],
  providers: [ExpedienteService, OperacionService],
  exports: [ExpedienteService]
})
export class ExpedienteModule {}
