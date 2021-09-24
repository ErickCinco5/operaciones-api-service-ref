import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AtributoSchema } from 'src/atributo/schema/atributo.schema';
import { CatalogoSchema } from 'src/catalogo/schema/catalogo.schema';
import { CatcomparecenciaService } from 'src/catcomparecencia/catcomparecencia.service';
import { CatComparecenciaSchema } from 'src/catcomparecencia/schema/catComparecencia.schema';
import { ATRIBUTO, CATALOGO, CATCOMPARECENCIA, GPOPERACIONES, OBJETO, OPERACION, OPOBJETO } from 'src/common/models/models';
import { GrupoOperacionesService } from 'src/grupo-operaciones/grupo-operaciones.service';
import { GrupoOperacionesSchema } from 'src/grupo-operaciones/schema/grupo-operaciones.schema';
import { ObjetoOperacionService } from 'src/objeto-operacion/objeto-operacion.service';
import { ObjetoOperacionSchema } from 'src/objeto-operacion/schema/objeto-operacion.schema';
import { ObjetoSchema } from 'src/objeto/schema/objeto.schema';
import { OperacionController } from './operacion.controller';
import { OperacionService } from './operacion.service';
import { OperacionSchema } from './schema/operacion.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      { name: OPERACION.name, useFactory: () => ( OperacionSchema )},
      { name: ATRIBUTO.name, useFactory: () => ( AtributoSchema )},
      { name: OBJETO.name, useFactory: () => ( ObjetoSchema )},
      { name: OPOBJETO.name, useFactory: () => ( ObjetoOperacionSchema )},
      { name: CATCOMPARECENCIA.name, useFactory: () => ( CatComparecenciaSchema )},
      { name: GPOPERACIONES.name, useFactory: () => ( GrupoOperacionesSchema )},
      { name: CATALOGO.name, useFactory: () => ( CatalogoSchema )},
    ]),
  ],
  controllers: [OperacionController],
  providers: [
    OperacionService,
    GrupoOperacionesService,
    CatcomparecenciaService,
    ObjetoOperacionService,
  ],
  exports: [OperacionService]
})
export class OperacionModule {}
