/*
  Warnings:

  - You are about to drop the column `create_at` on the `Meal` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Meal` table. All the data in the column will be lost.
  - Added the required column `created_at` to the `Meal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Meal` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Meal" DROP CONSTRAINT "Meal_userId_fkey";

-- AlterTable
ALTER TABLE "Meal" DROP COLUMN "create_at",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL,
ALTER COLUMN "name" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Meal" ADD CONSTRAINT "Meal_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
