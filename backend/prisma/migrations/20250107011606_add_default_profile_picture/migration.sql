/*
  Warnings:

  - Made the column `profilePicture` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "profilePicture" SET NOT NULL,
ALTER COLUMN "profilePicture" SET DEFAULT 'https://cdn-icons-png.flaticon.com/512/3135/3135768.png';
