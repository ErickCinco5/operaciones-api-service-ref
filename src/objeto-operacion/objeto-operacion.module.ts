import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AtributoSchema } from 'src/atributo/schema/atributo.schema';
import { ATRIBUTO, OBJETO, OPOBJETO } from 'src/common/models/models';
import { ObjetoService } from 'src/objeto/objeto.service';
import { ObjetoSchema } from 'src/objeto/schema/objeto.schema';
import { ObjetoOperacionController } from './objeto-operacion.controller';
import { ObjetoOperacionService } from './objeto-operacion.service';
import { ObjetoOperacionSchema } from './schema/objeto-operacion.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      { name: OPOBJETO.name, useFactory: () => ( ObjetoOperacionSchema )},
      { name: OBJETO.name, useFactory: () => ( ObjetoSchema )},
      { name: ATRIBUTO.name, useFactory: () => ( AtributoSchema )},
    ]),
  ],
  controllers: [ObjetoOperacionController],
  providers: [ObjetoOperacionService, ObjetoService],
  exports: [ObjetoOperacionService]
})
export class ObjetoOperacionModule {}
