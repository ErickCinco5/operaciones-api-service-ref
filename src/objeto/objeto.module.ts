import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OBJETO } from 'src/common/models/models';
import { ObjetoController } from './objeto.controller';
import { ObjetoService } from './objeto.service';
import { ObjetoSchema } from './schema/objeto.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([{
      name: OBJETO.name,
      useFactory: () => ObjetoSchema
    }]),
  ],
  controllers: [ObjetoController],
  providers: [ObjetoService],
  exports: [ObjetoService]
})
export class ObjetoModule {}
