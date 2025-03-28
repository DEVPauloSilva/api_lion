import { Module } from '@nestjs/common';
import { VeiculosController } from './veiculos.controller';
import { VeiculosService } from './veiculos.service';

@Module({
  imports: [],
  controllers: [VeiculosController],
  providers: [VeiculosService],
})
export class VeiculosModule {}