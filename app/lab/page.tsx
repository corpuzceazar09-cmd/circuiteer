"use client";

import Link from "next/link";
import { useState } from "react";
import ScreenFrame from "@/components/ScreenFrame";
import GateSymbol from "@/components/GateSymbol";
import TruthTable from "@/components/TruthTable";
import IcChip from "@/components/IcChip";
import { GATES, GATE_ORDER, type GateId } from "@/lib/data/gates";

export default function LabPage() {
  const [gateId, setGateId] = useState<GateId>("and");
  const gate = GATES[gateId];

  return (
    <div className="wf-page">
      <ScreenFrame title="LOGIC GATE LAB — REFERENCE">
        <p className="wf-hint text-center">
          Explore at your own pace: symbol, Boolean expression, truth table and
          IC pins for every gate.
        </p>

        <div className="grid flex-1 gap-4 md:grid-cols-[11rem_1fr]">
          {/* gate list */}
          <div className="flex flex-col gap-2">
            {GATE_ORDER.map((id) => (
              <button
                key={id}
                className={`wf-btn ${id === gateId ? "wf-btn-primary" : ""}`}
                onClick={() => setGateId(id)}
              >
                {GATES[id].name}
              </button>
            ))}
          </div>

          {/* selected gate detail */}
          <div className="flex flex-col gap-3 border-[3px] border-black bg-white p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-2xl font-black">{gate.name} GATE</span>
              <span className="wf-chip">{gate.expression}</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 border-[3px] border-dashed border-black p-3">
              <GateSymbol gate={gate.id} className="h-24 w-44" />
              <IcChip
                label={gate.ic.split("—")[0].trim()}
                className="h-24 w-48"
              />
            </div>

            <p className="leading-relaxed">{gate.description}</p>

            <div className="flex flex-wrap items-start gap-6">
              <div>
                <p className="mb-1 text-xs font-black tracking-widest">
                  TRUTH TABLE
                </p>
                <TruthTable gate={gate} />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-xs font-black tracking-widest">IC PINS</p>
                <p className="wf-hint">{gate.ic}</p>
                <p className="wf-hint">INPUTS: {gate.inputs}</p>
                <p className="wf-hint">VCC: PIN 14 — GND: PIN 7</p>
              </div>
            </div>
          </div>
        </div>

        <Link href="/menu" className="wf-btn mx-auto text-xs">
          ◀ BACK TO MENU
        </Link>
      </ScreenFrame>
    </div>
  );
}
