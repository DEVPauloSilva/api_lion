import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pedido, PedidoDocument } from './schemas/pedido.schema';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { error } from 'console';

@Injectable()
export class PedidoService {
  constructor(
    @InjectModel(Pedido.name) private pedidoModel: Model<PedidoDocument>,
    private readonly prisma: PrismaService,
  ) {}

  async criarPedido(createPedidoDto: CreatePedidoDto): Promise<Pedido> {
    const pedido = new this.pedidoModel(createPedidoDto);
    return pedido.save();
  }

  async listarPedidos(): Promise<Pedido[]> {
    return this.pedidoModel.find().exec();
  }

  async buscarPedido(clienteId: string): Promise<any[]> {
    const pedidos = await this.pedidoModel.find({ clienteId }).exec();

    // Coletar todos os produtoId únicos dos pedidos encontrados
    const produtoIds = [
      ...new Set(
        pedidos.flatMap((pedido) => pedido.produtos.map((p) => p.produtoId)),
      ),
    ];

    // Buscar produtos no Prisma (PostgreSQL)
    const produtos = await this.prisma.produtos.findMany({
      where: { produto_id: { in: produtoIds } },
    });

    // Criar um mapa de produtos para consulta rápida
    const produtosMap = new Map(
      produtos.map((produto) => [produto.produto_id, produto]),
    );

    // Adicionar detalhes dos produtos nos pedidos
    return pedidos.map((pedido) => ({
      ...pedido.toObject(), // Converter o pedido para objeto normal
      produtos: pedido.produtos.map((p) => ({
        produtoId: p.produtoId,
        quantidade: p.quantidade,
        nome_produto: produtosMap.get(p.produtoId).nome_produto,
        preco: produtosMap.get(p.produtoId).preco,
      })),
    }));
  }

  async buscaPedidoId(pedidoId: string): Promise<any[]>{
    const pedidos = await this.pedidoModel.find({ _id: pedidoId }).exec();

    const produtoIds = [
      ...new Set(
        pedidos.flatMap((pedido) => pedido.produtos.map((p) => p.produtoId)),
      ),
    ];

    const produtos = await this.prisma.produtos.findMany({
      where: { produto_id: { in: produtoIds } },
    });

    // Criar um mapa de produtos para consulta rápida
    const produtosMap = new Map(
      produtos.map((produto) => [produto.produto_id, produto]),
    );

    return pedidos.map((pedido) => ({
      ...pedido.toObject(), // Converter o pedido para objeto normal
      produtos: pedido.produtos.map((p) => ({
        produtoId: p.produtoId,
        quantidade: p.quantidade,
        nome_produto: produtosMap.get(p.produtoId).nome_produto,
        preco: produtosMap.get(p.produtoId).preco,
      })),
    }));
  }

  async atualizarPedido(
    id: string,
    updatePedidoDto: UpdatePedidoDto,
  ): Promise<Pedido> {
    const pedido = await this.pedidoModel
      .findByIdAndUpdate(id, updatePedidoDto, { new: true })
      .exec();
    if (!pedido) {
      throw new NotFoundException('Pedido não encontrado');
    }
    return pedido;
  }

  async deletarPedido(id: string): Promise<{ message: string }> {
    const pedido = await this.pedidoModel.findByIdAndDelete(id).exec();
    if (!pedido) {
      throw new NotFoundException('Pedido não encontrado');
    }
    return { message: 'Pedido deletado com sucesso' };
  }

  async adicionarProdutosAoPedido(
    id: string,
    novosProdutos: { produtoId: string; quantidade: number }[],
  ): Promise<Pedido> {
    const pedido = await this.pedidoModel.findById(id).exec();
    if (!pedido) throw new NotFoundException('Pedido não encontrado');

    // Adicionando os novos produtos ao array de produtos do pedido
    pedido.produtos = [...pedido.produtos, ...novosProdutos];

    return pedido.save();
  }

  async buscarPedidosComProdutos(): Promise<any[]> {
    const pedidos = await this.pedidoModel.find().exec();

    // Coletar todos os produtoId únicos
    const produtoIds = pedidos.flatMap((pedido) =>
      pedido.produtos.map((p) => p.produtoId),
    );

    // Buscar produtos no Prisma (PostgreSQL)
    const produtos = await this.prisma.produtos.findMany({
      where: { produto_id: { in: produtoIds } },
    });

    // Criar um mapa de produtos para consulta rápida
    const produtosMap = new Map(
      produtos.map((produto) => [produto.produto_id, produto]),
    );
    console.log(produtosMap);

    // Adicionar detalhes dos produtos nos pedidos
    const pedidosComProdutos = pedidos.map((pedido) => ({
      ...pedido.toObject(), // Transformar apenas o pedido em objeto normal
      produtos: pedido.produtos.map((p) => ({
        produtoId: p.produtoId,
        quantidade: p.quantidade,
        detalhes: produtosMap.get(p.produtoId) || null, // Adiciona detalhes do produto
      })),
    }));

    return pedidosComProdutos;
  }

  async atualizarPedidoCompleto(
    id: string,
    pedidoAtualizado: {
      clienteId: string;
      produtos: { produtoId: string; quantidade: number }[];
      valorPago: number;
      status: string;
    },
  ): Promise<Pedido> {
    const pedido = await this.pedidoModel.findById(id).exec();
    if (!pedido) throw new NotFoundException('Pedido não encontrado');
    // Atualizando os dados do pedido
    pedido.clienteId = pedidoAtualizado.clienteId;
    pedido.valorPago = pedidoAtualizado.valorPago;
    pedido.status = pedidoAtualizado.status;
    pedido.produtos = pedidoAtualizado.produtos; // Substitui a lista de produtos
    return pedido.save();
  }

  async gerarPedidoPdf(pedidoId: string, empresaId: string){
    const fs = require("fs");

    const data = await this.buscaPedidoId(pedidoId);
    if(!data){
      return error;
    }
    console.log(data);
    //const cliente = await this.prisma.clientes.findFirst({where:{cliente_id: data.clienteId}});
    const empresa = await this.prisma.empresa.findFirst({where: {empresa_id: empresaId}});
    const logoPath = "src/assets/logo.png";

    try{
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([600, 800]); // Tamanho A4 simplificado
  
      const { width, height } = page.getSize();
      const margin = 50;
  
      // Carregar a logo da empresa
      const logoBytes = fs.readFileSync(logoPath);
      const logoImage = await pdfDoc.embedPng(logoBytes);
      const logoDims = logoImage.scale(0.05);
  
      // Adiciona a logo no topo
      const logoX = margin;
      const logoY = height - logoDims.height - margin;
      page.drawImage(logoImage, {
        x: logoX,
        y: logoY,
        width: logoDims.width,
        height: logoDims.height,
      });
  
      // Nome e CNPJ da empresa ao lado da logo
      const empresaNome = empresa.name;
      const empresaCNPJ = "CNPJ: 12.345.678/0001-99";
      const contato = "(62) 99233-3273"
  
      const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const fontSize = 10;
      const textX = logoX + logoDims.width + 20; // Alinhado ao lado da logo
      const textY = logoY + logoDims.height - fontSize; // Mesma altura que a logo
  
      page.drawText(empresaNome, { x: textX, y: textY, size: fontSize, font });
      page.drawText(empresaCNPJ, { x: textX, y: textY - 15, size: fontSize, font });
      page.drawText("Contato: "+contato, { x: textX, y: textY - 30, size: fontSize, font });

      //page.drawText("Cliente: "+cliente.nome, { x: margin, y: height - logoDims.height - margin - 30, size: fontSize, font });
  
      // Adiciona título para os itens
      page.drawText("Itens da Compra:", { x: margin, y: logoY - 50, size: fontSize });
  
      // Configura a tabela
      let tableStartY = logoY - 70;
    const tableLineHeight = 20;
    const tableColumnWidth = 100;

    // Fundo cinza para o cabeçalho
    page.drawRectangle({
      x: margin,
      y: tableStartY - 10,
      width: width - 2 * margin,
      height: tableLineHeight,
      color: rgb(0.9, 0.9, 0.9),
    });

    // Desenha cabeçalho da tabela com texto em negrito
    const headers = ["Produto", "Marca", "Quantidade", "Valor Unitário", "Valor Total"];
    headers.forEach((header, i) => {
      page.drawText(header, {
        x: margin + i * tableColumnWidth,
        y: tableStartY,
        size: fontSize,
        font,
      });
    });

    tableStartY -= tableLineHeight;

    // Adiciona os itens na tabela com divisões
    const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    /*data.produtos.forEach((item, index) => {
      const { produto, quantidade, precoUnitario, precoTotal } = item;

      // Adiciona linha divisória entre os itens
      if (index > 0) {
        page.drawLine({
          start: { x: margin, y: tableStartY + tableLineHeight },
          end: { x: width - margin, y: tableStartY + tableLineHeight },
          thickness: 0.5,
          color: rgb(0.8, 0.8, 0.8),
        });
      }

      const row = [
        produto.nome_produto,
        produto.marca || "N/A",
        quantidade.toString(),
        `R$ ${precoUnitario.toFixed(2)}`,
        `R$ ${precoTotal.toFixed(2)}`,
      ];

      row.forEach((text, i) => {
        page.drawText(text, {
          x: margin + i * tableColumnWidth,
          y: tableStartY-5,
          size: fontSize - 2,
          font: regularFont,
        });
      });

      tableStartY -= tableLineHeight+10;
      });

      // Adiciona o valor total da compra no final da tabela
      /*const totalText = `Total da Compra: R$ ${data.total.toFixed(2)}`;
      page.drawText(totalText, {
        x: margin,
        y: tableStartY - 20,
        size: fontSize,
        font,
      });*/
    
      // Salva o PDF
      const pdfBytes = await pdfDoc.save();
      return pdfBytes;

    }catch (error) {
      console.error("Erro ao gerar PDF:", error);
      throw error;
    }


  }



}
