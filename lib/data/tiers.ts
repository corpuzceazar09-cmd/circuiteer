import type { GateId } from "./gates";

export type TierId = "newbie" | "intermediate" | "advanced";

export type Tier = {
  id: TierId;
  name: string;
  levelLabel: string;
  blurb: string;
  gateIds: GateId[];
  /** Extra briefing cards beyond the per-gate cards (advanced tier topics). */
  topics: { title: string; body: string }[];
};

export const TIERS: Record<TierId, Tier> = {
  newbie: {
    id: "newbie",
    name: "NEWBIE",
    levelLabel: "LEVEL 1 / NEWBIE",
    blurb: "What logic gates are and how to identify them.",
    gateIds: ["and", "or", "not"],
    topics: [],
  },
  intermediate: {
    id: "intermediate",
    name: "INTERMEDIATE",
    levelLabel: "LEVEL 2 / INTERMEDIATE",
    blurb: "Find outputs and read truth tables.",
    gateIds: ["nand", "nor", "xor"],
    topics: [],
  },
  advanced: {
    id: "advanced",
    name: "ADVANCED",
    levelLabel: "LEVEL 3 / ADVANCED",
    blurb: "Combined gates, Boolean expressions and full circuits.",
    gateIds: ["xnor"],
    topics: [
      {
        title: "COMBINED GATES",
        body: "Chain gates together to build bigger circuits — NOT into AND, AND into OR, and so on.",
      },
      {
        title: "BOOLEAN EXPRESSIONS",
        body: "Read and simplify expressions such as (A · B)̅ and A ⊕ B.",
      },
    ],
  },
};

export const TIER_ORDER: TierId[] = ["newbie", "intermediate", "advanced"];

export function isTierId(value: string): value is TierId {
  return value === "newbie" || value === "intermediate" || value === "advanced";
}
