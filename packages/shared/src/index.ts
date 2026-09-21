// Shared contracts for the API, web and mobile apps.
//
// Each enum is a const object plus a type of the same name: the object for
// runtime values, the type for checking. Both must mirror the enums in
// apps/api/prisma/schema.prisma.

export const SkillLevel = {
  BEGINNER: "BEGINNER",
  INTERMEDIATE: "INTERMEDIATE",
  ADVANCED: "ADVANCED",
  EXPERT: "EXPERT",
} as const;
export type SkillLevel = (typeof SkillLevel)[keyof typeof SkillLevel];

export const PortfolioStatus = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
} as const;
export type PortfolioStatus =
  (typeof PortfolioStatus)[keyof typeof PortfolioStatus];

export const SkillType = {
  TEACH: "TEACH",
  LEARN: "LEARN",
} as const;
export type SkillType = (typeof SkillType)[keyof typeof SkillType];

export const Proficiency = {
  LEARNING: "LEARNING",
  INTERMEDIATE: "INTERMEDIATE",
  EXPERT: "EXPERT",
} as const;
export type Proficiency = (typeof Proficiency)[keyof typeof Proficiency];

export const SkillRequestStatus = {
  PENDING: "PENDING",
  ACCEPTED: "ACCEPTED",
  REJECTED: "REJECTED",
  COMPLETED: "COMPLETED",
} as const;
export type SkillRequestStatus =
  (typeof SkillRequestStatus)[keyof typeof SkillRequestStatus];

// What the API returns for a user. Never includes passwordHash.
export interface UserDTO {
  id: string;
  email: string;
  name: string;
  bio: string | null;
  skillLevel: SkillLevel;
  portfolioStatus: PortfolioStatus;
  createdAt: string; // ISO date string (JSON has no Date type)
}

// The shape of every error response from the API.
export interface ApiErrorResponse {
  error: {
    message: string;
    details?: unknown;
  };
}
