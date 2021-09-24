import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CATREGLAS } from 'src/common/models/models';
import { ProvidersModule } from 'src/providers/providers.module';
import { CatreglasController } from './catreglas.controller';
import { CatreglasService } from './catreglas.service';
import { CatReglasSchema } from './schema/catreglas.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([{
      name: CATREGLAS.name,
      useFactory: () => { 
        return CatReglasSchema;
      },
    }]),
    ProvidersModule,
  ],
  controllers: [CatreglasController],
  providers: [CatreglasService],
  exports: [CatreglasService]
})
export class CatreglasModule {}
