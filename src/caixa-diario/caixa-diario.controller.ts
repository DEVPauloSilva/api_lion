import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CaixaDiarioService } from './caixa-diario.service';
import { CreateCaixaDiarioDto } from './dto/create-caixa-diario.dto';
import { UpdateCaixaDiarioDto } from './dto/update-caixa-diario.dto';
import { CaixaDecorator } from './decorators/caixa-decorator';
import { CaixaCreateDecorator } from './decorators/caixa-decorator-create';
import { CaixaDecoratorUpdate } from './decorators/caixa-decorator-update';

@CaixaDecorator()
export class CaixaDiarioController {
  constructor(private readonly caixaDiarioService: CaixaDiarioService) {}


  @CaixaCreateDecorator()
  create(@Body() createCaixaDiarioDto: CreateCaixaDiarioDto) {
    console.log(createCaixaDiarioDto);
    return this.caixaDiarioService.create(createCaixaDiarioDto);
  }

  @Get()
  findAll() {
    return this.caixaDiarioService.findAll();
  }


  @CaixaDecoratorUpdate()
  update(@Param('caixa_id') caixa_id: string, @Body() caixa: UpdateCaixaDiarioDto) {
    return this.caixaDiarioService.update(caixa_id, caixa)
  }
}
