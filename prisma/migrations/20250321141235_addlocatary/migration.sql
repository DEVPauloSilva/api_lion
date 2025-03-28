/*
  Warnings:

  - You are about to drop the `Compra` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ItemCompra` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `tipo` to the `Empresa` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Compra" DROP CONSTRAINT "Compra_cliente_id_fkey";

-- DropForeignKey
ALTER TABLE "Compra" DROP CONSTRAINT "Compra_usuario_id_fkey";

-- DropForeignKey
ALTER TABLE "ItemCompra" DROP CONSTRAINT "ItemCompra_compraId_fkey";

-- DropForeignKey
ALTER TABLE "ItemCompra" DROP CONSTRAINT "ItemCompra_produto_id_fkey";

-- DropForeignKey
ALTER TABLE "ItemCompra" DROP CONSTRAINT "ItemCompra_usuario_id_fkey";

-- AlterTable
ALTER TABLE "Empresa" ADD COLUMN     "tipo" TEXT NOT NULL;

-- DropTable
DROP TABLE "Compra";

-- DropTable
DROP TABLE "ItemCompra";

-- CreateTable
CREATE TABLE "Veiculos" (
    "veiculo_id" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "placa" TEXT NOT NULL,
    "ano" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "empresa_id" TEXT NOT NULL,

    CONSTRAINT "Veiculos_pkey" PRIMARY KEY ("veiculo_id")
);

-- CreateTable
CREATE TABLE "Aluguel" (
    "aluguel_id" TEXT NOT NULL,
    "cliente_id" TEXT NOT NULL,
    "veiculo_id" TEXT NOT NULL,
    "dataInicio" TIMESTAMP(3) NOT NULL,
    "dataFim" TIMESTAMP(3),
    "valorTotal" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Aluguel_pkey" PRIMARY KEY ("aluguel_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Veiculos_placa_key" ON "Veiculos"("placa");

-- AddForeignKey
ALTER TABLE "Veiculos" ADD CONSTRAINT "Veiculos_empresa_id_fkey" FOREIGN KEY ("empresa_id") REFERENCES "Empresa"("empresa_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aluguel" ADD CONSTRAINT "Aluguel_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "Clientes"("cliente_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aluguel" ADD CONSTRAINT "Aluguel_veiculo_id_fkey" FOREIGN KEY ("veiculo_id") REFERENCES "Veiculos"("veiculo_id") ON DELETE RESTRICT ON UPDATE CASCADE;
