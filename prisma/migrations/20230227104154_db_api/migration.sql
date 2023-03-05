-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstname" TEXT,
    "lastname" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Page" (
    "Id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "Content" TEXT NOT NULL,
    "UrlSlug" TEXT NOT NULL,
    "Creator" TEXT NOT NULL,
    "User" TEXT NOT NULL,
    "PublicationDateTime" TIMESTAMP(3) NOT NULL,
    "Status" TEXT NOT NULL,

    CONSTRAINT "Page_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "NavigationMenu" (
    "Id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "list" TEXT NOT NULL,

    CONSTRAINT "NavigationMenu_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
