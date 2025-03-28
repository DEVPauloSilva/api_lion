import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateVeiculoDto } from './dto/create-dto';
import { Veiculos } from '@prisma/client';
@Injectable()
export class VeiculosService {
    constructor(private prisma: PrismaService) { }

    // Criação de Veículo
    async create(createVeiculoDto: CreateVeiculoDto): Promise<Veiculos> {
        return this.prisma.veiculos.create({
            data: createVeiculoDto,
        });
    }

    // Buscar todos os veículos
    async findAll(): Promise<Veiculos[]> {
        return this.prisma.veiculos.findMany();
    }

    // Buscar um veículo por ID
    async findOne(veiculo_id: string): Promise<Veiculos | null> {
        return this.prisma.veiculos.findUnique({
            where: { veiculo_id },
        });
    }

    // Atualizar um veículo
    async update(
        veiculo_id: string,
        updateVeiculoDto: CreateVeiculoDto,
    ): Promise<Veiculos | null> {
        return this.prisma.veiculos.update({
            where: { veiculo_id },
            data: updateVeiculoDto,
        });
    }

    // Deletar um veículo
    async remove(veiculo_id: string): Promise<Veiculos> {
        return this.prisma.veiculos.delete({
            where: { veiculo_id },
        });
    }
}
