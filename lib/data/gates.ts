// Static mock data for the 7 logic gates — the seven basic gates from
// https://en.wikipedia.org/wiki/Logic_gate (NOT, OR, NOR, AND, NAND, XOR,
// XNOR). Descriptions, Boolean expressions and truth tables follow that
// reference. IC numbers follow the classic 74-series TTL pinout chart
// (7408/7432/7404/7400/7402/7486/74266), all 14-pin DIP: Vcc = pin 14, Gnd = 7.
// Truth tables are literal reference data (not computed) — this is a
// wireframe, there is no evaluator.

export type GateId = "and" | "or" | "not" | "nand" | "nor" | "xor" | "xnor";

export type TruthRow = { inputs: number[]; out: number };

export type Gate = {
  id: GateId;
  name: string;
  expression: string;
  description: string;
  ic: string;
  inputs: number;
  table: TruthRow[];
};

const two = (outs: [number, number, number, number]): TruthRow[] => [
  { inputs: [0, 0], out: outs[0] },
  { inputs: [0, 1], out: outs[1] },
  { inputs: [1, 0], out: outs[2] },
  { inputs: [1, 1], out: outs[3] },
];

export const GATES: Record<GateId, Gate> = {
  and: {
    id: "and",
    name: "AND",
    expression: "A · B",
    description: "Conjunction: output is 1 only when BOTH inputs are 1.",
    ic: "7408 — Quad 2-input AND gates",
    inputs: 2,
    table: two([0, 0, 0, 1]),
  },
  or: {
    id: "or",
    name: "OR",
    expression: "A + B",
    description: "Disjunction: output is 1 when AT LEAST ONE input is 1.",
    ic: "7432 — Quad 2-input OR gates",
    inputs: 2,
    table: two([0, 1, 1, 1]),
  },
  not: {
    id: "not",
    name: "NOT",
    expression: "A̅",
    description: "Negation (inverter): output is always the OPPOSITE of the input.",
    ic: "7404 — Hex NOT gates (inverters)",
    inputs: 1,
    table: [
      { inputs: [0], out: 1 },
      { inputs: [1], out: 0 },
    ],
  },
  nand: {
    id: "nand",
    name: "NAND",
    expression: "(A · B)̅",
    description:
      "Alternative denial (AND inverted): 0 only when BOTH inputs are 1.",
    ic: "7400 — Quad 2-input NAND gates",
    inputs: 2,
    table: two([1, 1, 1, 0]),
  },
  nor: {
    id: "nor",
    name: "NOR",
    expression: "(A + B)̅",
    description: "Joint denial (OR inverted): 1 only when BOTH inputs are 0.",
    ic: "7402 — Quad 2-input NOR gates",
    inputs: 2,
    table: two([1, 0, 0, 0]),
  },
  xor: {
    id: "xor",
    name: "XOR",
    expression: "A ⊕ B",
    description: "Exclusive OR: output is 1 only when the inputs are DIFFERENT.",
    ic: "7486 — Quad 2-input XOR gates",
    inputs: 2,
    table: two([0, 1, 1, 0]),
  },
  xnor: {
    id: "xnor",
    name: "XNOR",
    expression: "(A ⊕ B)̅",
    description:
      "Biconditional (XOR inverted): 1 only when the inputs are the SAME.",
    ic: "74266 — Quad 2-input XNOR gates",
    inputs: 2,
    table: two([1, 0, 0, 1]),
  },
};

export const GATE_ORDER: GateId[] = [
  "and",
  "or",
  "not",
  "nand",
  "nor",
  "xor",
  "xnor",
];
