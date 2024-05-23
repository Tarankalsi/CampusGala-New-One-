-- CreateTable
CREATE TABLE "ArchivedEventApplication" (
    "applicationId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "eventName" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "eventDescription" TEXT NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "expectedAudience" INTEGER,
    "venue" TEXT,
    "proposedDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ArchivedEventApplication_pkey" PRIMARY KEY ("applicationId")
);

-- AddForeignKey
ALTER TABLE "ArchivedEventApplication" ADD CONSTRAINT "ArchivedEventApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
