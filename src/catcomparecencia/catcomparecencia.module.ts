import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ATRIBUTO, CATCOMPARECENCIA } from 'src/common/models/models';
import { CatComparecenciaSchema } from './schema/catComparecencia.schema';
import { CatcomparecenciaController } from './catcomparecencia.controller';
import { CatcomparecenciaService } from './catcomparecencia.service';
import { AtributoSchema } from 'src/atributo/schema/atributo.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      { name: CATCOMPARECENCIA.name, useFactory: () =>  ( CatComparecenciaSchema )},
      { name: ATRIBUTO.name, useFactory: () => ( AtributoSchema )},
    ])
  ],
  controllers: [CatcomparecenciaController],
  providers: [CatcomparecenciaService],
  exports: [CatcomparecenciaService]
})
export class CatcomparecenciaModule {}
