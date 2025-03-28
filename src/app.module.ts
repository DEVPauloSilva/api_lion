import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { CaixaDiarioModule } from './caixa-diario/caixa-diario.module';
import { ClienteModule } from './cliente/cliente.module';
import { EmpresaModule } from './empresa/empresa.module';
import { PedidoModule } from './pedidos/pedido.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProdutosModule } from './produtos/produtos.module';
import { UsuarioModule } from './usuario/usuario.module';
import { VeiculosModule } from 'veiculos/veiculos.module';
import { AlugueisModule } from 'alugueis/alugueis.module';

@Module({
  imports: [
    PrismaModule,
    MongooseModule.forRoot('mongodb+srv://maximuzpaulo:6th0cW8OymQ63D7W@lion.goyj0.mongodb.net/'),//process.env.MONGODB_URL),
    AuthModule,
    UsuarioModule,
    EmpresaModule,
    CaixaDiarioModule,
    ProdutosModule,
    ClienteModule,
    PedidoModule,
    VeiculosModule,
    AlugueisModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
