import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ATRIBUTO } from 'src/common/models/models';
import { AtributoSchema } from './schema/atributo.schema';
import { ProvidersModule } from 'src/providers/providers.module';
import { AtributoController } from './atributo.controller';
import { AtributoService } from './atributo.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([{
      name: ATRIBUTO.name,
      useFactory: () => { 
        return AtributoSchema;
      },
    }]),
    ProvidersModule,
  ],
  controllers: [AtributoController],
  providers: [AtributoService]
})
export class AtributoModule {}