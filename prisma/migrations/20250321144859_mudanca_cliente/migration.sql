/*
  Warnings:

  - You are about to drop the column `usuario_id` on the `Clientes` table. All the data in the column will be lost.
  - Added the required column `empresa_id` to the `Clientes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Clientes" DROP CONSTRAINT "Clientes_usuario_id_fkey";

-- AlterTable
ALTER TABLE "Clientes" DROP COLUMN "usuario_id",
ADD COLUMN     "empresa_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Clientes" ADD CONSTRAINT "Clientes_empresa_id_fkey" FOREIGN KEY ("empresa_id") REFERENCES "Empresa"("empresa_id") ON DELETE RESTRICT ON UPDATE CASCADE;
