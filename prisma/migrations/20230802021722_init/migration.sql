-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "guardian_name" TEXT NOT NULL,
    "guardian_contact" TEXT NOT NULL,
    "disease" TEXT NOT NULL,
    "first_aid" TEXT NOT NULL,
    "doctor_name" TEXT NOT NULL,
    "doctor_contact" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_password_key" ON "user"("email", "password");
