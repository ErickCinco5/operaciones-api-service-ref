import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatReglasSchema } from 'src/catreglas/schema/catreglas.schema';
import { CATREGLAS, GPOPERACIONES, REGLAS } from 'src/common/models/models';
import { GrupoOperacionesSchema } from 'src/grupo-operaciones/schema/grupo-operaciones.schema';
import { ReglasSchema } from 'src/reglas/schema/reglas.schema';
import { ValidatorService } from './validator.service';

@Module({
    imports: [
        MongooseModule.forFeatureAsync([
            { name: CATREGLAS.name, useFactory: () => ( CatReglasSchema )},
            { name: REGLAS.name, useFactory: () => ( ReglasSchema )},
            { name: GPOPERACIONES.name, useFactory: () => ( GrupoOperacionesSchema )},
        ]),
    ],
    providers: [ValidatorService],
    exports: [ValidatorService],
})
export class ProvidersModule {}
