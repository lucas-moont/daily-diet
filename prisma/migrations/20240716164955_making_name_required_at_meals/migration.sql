/*
  Warnings:

  - Made the column `name` on table `Meal` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Meal" ALTER COLUMN "name" SET NOT NULL;
