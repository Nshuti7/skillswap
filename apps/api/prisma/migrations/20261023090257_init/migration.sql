-- CreateEnum
CREATE TYPE "SkillLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT');

-- CreateEnum
CREATE TYPE "PortfolioStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "Proficiency" AS ENUM ('LEARNING', 'INTERMEDIATE', 'EXPERT');

-- CreateEnum
CREATE TYPE "SkillType" AS ENUM ('TEACH', 'LEARN');

-- CreateEnum
CREATE TYPE "SkillRequestStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "SwapSessionStatus" AS ENUM ('ACTIVE', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ReviewRole" AS ENUM ('MENTOR', 'LEARNER');

-- CreateEnum
CREATE TYPE "FlagStatus" AS ENUM ('OPEN', 'RESOLVED');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "bio" TEXT,
    "skill_level" "SkillLevel" NOT NULL DEFAULT 'BEGINNER',
    "portfolio_url" TEXT,
    "portfolio_status" "PortfolioStatus" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "student_id" TEXT,
    "verified_at" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skills" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_skills" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "skill_id" UUID NOT NULL,
    "proficiency" "Proficiency" NOT NULL,
    "type" "SkillType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skill_requests" (
    "id" UUID NOT NULL,
    "requester_id" UUID NOT NULL,
    "target_user_id" UUID NOT NULL,
    "offered_skill_id" UUID NOT NULL,
    "requested_skill_id" UUID NOT NULL,
    "status" "SkillRequestStatus" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "skill_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "swap_sessions" (
    "id" UUID NOT NULL,
    "request_id" UUID NOT NULL,
    "started_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ended_at" TIMESTAMP(3),
    "status" "SwapSessionStatus" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "swap_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session_assignments" (
    "id" UUID NOT NULL,
    "session_id" UUID NOT NULL,
    "given_by" UUID NOT NULL,
    "description" TEXT NOT NULL,
    "due_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "session_assignments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session_uploads" (
    "id" UUID NOT NULL,
    "assignment_id" UUID NOT NULL,
    "uploaded_by" UUID NOT NULL,
    "file_path" TEXT NOT NULL,
    "submitted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "session_uploads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" UUID NOT NULL,
    "session_id" UUID NOT NULL,
    "reviewer_id" UUID NOT NULL,
    "reviewed_user_id" UUID NOT NULL,
    "role" "ReviewRole" NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "flags" (
    "id" UUID NOT NULL,
    "session_id" UUID NOT NULL,
    "reported_by" UUID NOT NULL,
    "reason" TEXT NOT NULL,
    "status" "FlagStatus" NOT NULL DEFAULT 'OPEN',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolved_at" TIMESTAMP(3),

    CONSTRAINT "flags_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_student_id_key" ON "users"("student_id");

-- CreateIndex
CREATE UNIQUE INDEX "skills_name_key" ON "skills"("name");

-- CreateIndex
CREATE UNIQUE INDEX "user_skills_user_id_skill_id_type_key" ON "user_skills"("user_id", "skill_id", "type");

-- CreateIndex
CREATE INDEX "skill_requests_target_user_id_status_idx" ON "skill_requests"("target_user_id", "status");

-- CreateIndex
CREATE INDEX "skill_requests_requester_id_status_idx" ON "skill_requests"("requester_id", "status");

-- CreateIndex
CREATE UNIQUE INDEX "swap_sessions_request_id_key" ON "swap_sessions"("request_id");

-- CreateIndex
CREATE UNIQUE INDEX "reviews_session_id_reviewer_id_key" ON "reviews"("session_id", "reviewer_id");

-- AddForeignKey
ALTER TABLE "user_skills" ADD CONSTRAINT "user_skills_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_skills" ADD CONSTRAINT "user_skills_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "skills"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skill_requests" ADD CONSTRAINT "skill_requests_requester_id_fkey" FOREIGN KEY ("requester_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skill_requests" ADD CONSTRAINT "skill_requests_target_user_id_fkey" FOREIGN KEY ("target_user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skill_requests" ADD CONSTRAINT "skill_requests_offered_skill_id_fkey" FOREIGN KEY ("offered_skill_id") REFERENCES "skills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skill_requests" ADD CONSTRAINT "skill_requests_requested_skill_id_fkey" FOREIGN KEY ("requested_skill_id") REFERENCES "skills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "swap_sessions" ADD CONSTRAINT "swap_sessions_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "skill_requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session_assignments" ADD CONSTRAINT "session_assignments_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "swap_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session_assignments" ADD CONSTRAINT "session_assignments_given_by_fkey" FOREIGN KEY ("given_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session_uploads" ADD CONSTRAINT "session_uploads_assignment_id_fkey" FOREIGN KEY ("assignment_id") REFERENCES "session_assignments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session_uploads" ADD CONSTRAINT "session_uploads_uploaded_by_fkey" FOREIGN KEY ("uploaded_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "swap_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_reviewer_id_fkey" FOREIGN KEY ("reviewer_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_reviewed_user_id_fkey" FOREIGN KEY ("reviewed_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flags" ADD CONSTRAINT "flags_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "swap_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flags" ADD CONSTRAINT "flags_reported_by_fkey" FOREIGN KEY ("reported_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Hand-written below this line. Prisma's schema language cannot express either
-- of these, so they live here. See the SkillRequest comment block in
-- schema.prisma, which is where they were specified.

-- A swap exchanges two different skills. Offering and requesting the same one
-- is not a swap. zod checks this at the API edge; this is the backstop for
-- seeds, scripts and anything else that writes without going through Express.
ALTER TABLE "skill_requests"
  ADD CONSTRAINT "skill_requests_offered_differs_from_requested"
  CHECK ("offered_skill_id" <> "requested_skill_id");

-- One pending request per requester, target and skill pair. Without it the same
-- request can be sent any number of times, and because a Conversation is unique
-- per request, every duplicate would open its own chat thread. Partial on
-- PENDING so a rejected or completed request does not stop someone asking again.
CREATE UNIQUE INDEX "skill_requests_one_pending_per_pair"
  ON "skill_requests" ("requester_id", "target_user_id", "offered_skill_id", "requested_skill_id")
  WHERE "status" = 'PENDING';
