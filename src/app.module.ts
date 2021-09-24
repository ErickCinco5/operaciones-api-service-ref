import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { CatreglasModule } from './catreglas/catreglas.module';
import { ReglasModule } from './reglas/reglas.module';
import { ProvidersModule } from './providers/providers.module';
import { GrupoOperacionesModule } from './grupo-operaciones/grupo-operaciones.module';
import { CatcomparecenciaModule } from './catcomparecencia/catcomparecencia.module';
import { AtributoModule } from './atributo/atributo.module';
import { ObjetoModule } from './objeto/objeto.module';
import { OperacionModule } from './operacion/operacion.module';
import { ObjetoOperacionModule } from './objeto-operacion/objeto-operacion.module';
import { ExpedienteModule } from './expediente/expediente.module';
import { CatalogoModule } from './catalogo/catalogo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    MongooseModule.forRoot( process.env.DB , { // Conexion a mongo
      useCreateIndex: true,
      useFindAndModify: false,
    }),
    ProvidersModule,
    CatreglasModule,
    ReglasModule,
    GrupoOperacionesModule,
    CatcomparecenciaModule,
    AtributoModule,
    ObjetoOperacionModule,
    ObjetoModule,
    OperacionModule,
    ExpedienteModule,
    CatalogoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
