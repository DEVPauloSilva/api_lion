
import { Controller, Get, Param } from '@nestjs/common';
import { Veiculos } from '@prisma/client';
import { VeiculoCreateDecorator } from './decorators/create-decorator';
import { CreateVeiculoDto } from './dto/create-dto';
import { VeiculosService } from './veiculos.service';


@Controller('veiculos')
export class VeiculosController {
    constructor(private readonly veiculosService: VeiculosService) { }

    @VeiculoCreateDecorator()
    async create(@Body() createVeiculoDto: CreateVeiculoDto): Promise<Veiculos> {
        return this.veiculosService.create(createVeiculoDto);
    }

    @Get()
    async findAll(): Promise<Veiculos[]> {
        return this.veiculosService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Veiculos |null> {
        return this.veiculosService.findOne(id);
    }


    @Delete(':id')
    async remove(@Param('id') id: string): Promise<Veiculos> {
        return this.veiculosService.remove(id);
    }
}
