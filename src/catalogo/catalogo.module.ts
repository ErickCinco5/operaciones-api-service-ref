import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CATALOGO } from 'src/common/models/models';
import { CatalogoController } from './catalogo.controller';
import { CatalogoService } from './catalogo.service';
import { CatalogoSchema } from './schema/catalogo.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      { name: CATALOGO.name, useFactory: () => ( CatalogoSchema )},
    ]),
  ],
  controllers: [CatalogoController],
  providers: [CatalogoService],
  exports: [CatalogoService]
})
export class CatalogoModule {}
