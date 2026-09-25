"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ScreenFrame from "@/components/ScreenFrame";
import { useGame } from "@/components/GameProvider";

function ToggleRow({
  label,
  value,
  onToggle,
  note,
}: {
  label: string;
  value: boolean;
  onToggle: () => void;
  note?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-[3px] border-black bg-white p-3">
      <span>
        <b>{label}</b>
        {note && <span className="block text-xs opacity-70">{note}</span>}
      </span>
      <button
        className={`wf-btn w-24 ${value ? "wf-btn-green" : ""}`}
        onClick={onToggle}
        aria-pressed={value}
      >
        {value ? "ON" : "OFF"}
      </button>
    </div>
  );
}

export default function SettingsPage() {
  const { resetProgress } = useGame();
  const [sound, setSound] = useState(true);
  const [music, setMusic] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!msg) return;
    const t = setTimeout(() => setMsg(null), 2400);
    return () => clearTimeout(t);
  }, [msg]);

  return (
    <div className="wf-page">
      <ScreenFrame title="SETTINGS">
        <p className="wf-hint text-center">
          Toggles are visual only in this wireframe — nothing persists.
        </p>

        <div className="flex flex-col gap-3">
          <ToggleRow
            label="SOUND EFFECTS"
            value={sound}
            onToggle={() => setSound((v) => !v)}
          />
          <ToggleRow
            label="MUSIC"
            value={music}
            onToggle={() => setMusic((v) => !v)}
            note="No audio assets in the mock build."
          />
          <div className="border-[3px] border-black bg-white p-3">
            <b>DEMO DATA</b>
            <p className="mb-3 text-xs opacity-70">
              XP, streak and unlocks live in memory only — a refresh already
              resets them.
            </p>
            <button
              className="wf-btn wf-btn-red w-full"
              onClick={() => {
                resetProgress();
                setMsg("PROGRESS RESET — BACK TO LEVEL 1!");
              }}
            >
              RESET PROGRESS
            </button>
          </div>
        </div>

        <Link href="/menu" className="wf-btn wf-btn-primary mx-auto">
          ◀ BACK TO MENU
        </Link>
      </ScreenFrame>

      {msg && <div className="wf-toast">{msg}</div>}
    </div>
  );
}
