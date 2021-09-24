import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { REGLAS } from 'src/common/models/models';
import { ProvidersModule } from 'src/providers/providers.module';
import { ReglasController } from './reglas.controller';
import { ReglasService } from './reglas.service';
import { ReglasSchema } from './schema/reglas.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([{
      name: REGLAS.name,
      useFactory: () => { 
        return ReglasSchema;
      },
    }]),
    ProvidersModule,
  ],
  controllers: [ReglasController],
  providers: [ReglasService],
  exports: [ReglasService]
})
export class ReglasModule {}
