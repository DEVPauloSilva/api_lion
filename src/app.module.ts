import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { CaixaDiarioModule } from './caixa-diario/caixa-diario.module';
import { EmpresaModule } from './empresa/empresa.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsuarioModule } from './usuario/usuario.module';
import { ProdutosModule } from './produtos/produtos.module';
import { ClienteModule } from './cliente/cliente.module';

@Module({
  imports: [PrismaModule, AuthModule, UsuarioModule, EmpresaModule, CaixaDiarioModule, ProdutosModule, ClienteModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}