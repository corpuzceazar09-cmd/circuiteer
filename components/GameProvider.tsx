"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { TierId } from "@/lib/data/tiers";

// Mock player state. Nothing here persists — a page refresh resets everything
// to the demo seed (intentional for this wireframe pass).

type GameState = {
  /** Mock player profile — static for the wireframe pass. */
  name: string;
  xp: number;
  level: number;
  streak: number;
  selectedTier: TierId | null;
  completed: Record<TierId, string[]>;
  selectTier: (tier: TierId) => void;
  completeLevel: (levelId: string, tierId: TierId, rewardXp: number) => void;
  isUnlocked: (tierId: TierId, index: number) => boolean;
  resetProgress: () => void;
};

const PLAYER_NAME = "PLAYER 1";

const SEED = {
  xp: 1250,
  streak: 5,
  completed: {
    newbie: ["newbie-01", "newbie-02"],
    intermediate: [],
    advanced: [],
  } as Record<TierId, string[]>,
};

const EMPTY_COMPLETED: Record<TierId, string[]> = {
  newbie: [],
  intermediate: [],
  advanced: [],
};

/** Trivial fake formula: one level per 400 XP. Placeholder, not real design. */
function levelFromXp(xp: number): number {
  return Math.floor(xp / 400) + 1;
}

export function levelIdForIndex(tierId: TierId, index: number): string {
  return `${tierId}-${String(index + 1).padStart(2, "0")}`;
}

const GameContext = createContext<GameState | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [xp, setXp] = useState(SEED.xp);
  const [streak, setStreak] = useState(SEED.streak);
  const [selectedTier, setSelectedTier] = useState<TierId | null>(null);
  const [completed, setCompleted] = useState<Record<TierId, string[]>>(
    SEED.completed,
  );

  const selectTier = useCallback((tier: TierId) => setSelectedTier(tier), []);

  const completeLevel = useCallback(
    (levelId: string, tierId: TierId, rewardXp: number) => {
      setXp((v) => v + rewardXp);
      setStreak((v) => v + 1);
      setCompleted((prev) =>
        prev[tierId].includes(levelId)
          ? prev
          : { ...prev, [tierId]: [...prev[tierId], levelId] },
      );
    },
    [],
  );

  const isUnlocked = useCallback(
    (tierId: TierId, index: number) => {
      if (index === 0) return true;
      const previousId = levelIdForIndex(tierId, index - 1);
      return completed[tierId].includes(previousId);
    },
    [completed],
  );

  const resetProgress = useCallback(() => {
    setXp(0);
    setStreak(0);
    setSelectedTier(null);
    setCompleted(EMPTY_COMPLETED);
  }, []);

  const value = useMemo<GameState>(
    () => ({
      name: PLAYER_NAME,
      xp,
      level: levelFromXp(xp),
      streak,
      selectedTier,
      completed,
      selectTier,
      completeLevel,
      isUnlocked,
      resetProgress,
    }),
    [
      xp,
      streak,
      selectedTier,
      completed,
      selectTier,
      completeLevel,
      isUnlocked,
      resetProgress,
    ],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame(): GameState {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used inside <GameProvider>");
  return ctx;
}

/** XP progress (0-100) toward the next level, for the progress bar. */
export function levelProgressPct(xp: number): number {
  return Math.round(((xp % 400) / 400) * 100);
}
