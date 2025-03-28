-- AlterTable
ALTER TABLE "Clientes" ADD COLUMN     "blacklist" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "instituicao_negativado" TEXT;
