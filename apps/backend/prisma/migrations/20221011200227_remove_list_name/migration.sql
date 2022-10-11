/*
  Warnings:

  - You are about to drop the column `name` on the `List` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "List_name_key";

-- AlterTable
ALTER TABLE "List" DROP COLUMN "name";
