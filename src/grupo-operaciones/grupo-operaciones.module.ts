import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GPOPERACIONES } from 'src/common/models/models';
import { ProvidersModule } from 'src/providers/providers.module';
import { GrupoOperacionesController } from './grupo-operaciones.controller';
import { GrupoOperacionesService } from './grupo-operaciones.service';
import { GrupoOperacionesSchema } from './schema/grupo-operaciones.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([{
      name: GPOPERACIONES.name,
      useFactory: () => { 
        return GrupoOperacionesSchema;
      },
    }]),
    ProvidersModule,
  ],
  controllers: [GrupoOperacionesController],
  providers: [GrupoOperacionesService],
  exports: [GrupoOperacionesService]
})
export class GrupoOperacionesModule {}
