"use client";

import { levelProgressPct, useGame } from "@/components/GameProvider";

/** Hardcoded-placeholder player stats panel (values come from mock state). */
export default function PlayerPanel({ compact = false }: { compact?: boolean }) {
  const { xp, level, streak } = useGame();
  const pct = levelProgressPct(xp);

  return (
    <div className={`wf-player ${compact ? "wf-player-compact" : ""}`}>
      <div className="wf-player-row">
        <span className="wf-chip">LV {level}</span>
        <span className="wf-chip">XP {xp}</span>
        <span className="wf-chip wf-chip-streak">STREAK {streak}</span>
      </div>
      <div className="wf-progress" aria-label="level progress">
        <div className="wf-progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="wf-player-caption">{pct}% TO NEXT LEVEL</div>
    </div>
  );
}
