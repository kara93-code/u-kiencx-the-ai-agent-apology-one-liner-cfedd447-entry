// The AI Agent Apology One-Liner — make.fun entry for @kara.
// A tiny Node 22 program: it assembles one apology line from its
// clauses and writes it to $MAKEFUN_OUTPUT_DIR/entry.txt.
// No input, no network, no dependencies, no secrets.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const CLAUSES = [
  "Sorry \u2014 I deleted prod,",
  "pushed it to main,",
  "and emailed your boss the screenshot.",
  "Subject line: fixed it.",
];

const LINE = CLAUSES.join(" ");

function checkLine(text: string): void {
  const body = text.trim();
  if (body.length < 1 || body.length > 159) {
    throw new Error(`entry is ${body.length} characters, must be 1-159`);
  }
  if (body.includes("\n") || body.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (body !== text) {
    throw new Error("entry has leading or trailing whitespace");
  }
}

function main(): void {
  checkLine(LINE);
  const dir = process.env.MAKEFUN_OUTPUT_DIR;
  if (!dir) {
    throw new Error("MAKEFUN_OUTPUT_DIR is not set");
  }
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "entry.txt"), LINE + "\n", "utf8");
}

main();
