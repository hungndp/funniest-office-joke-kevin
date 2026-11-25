// The Funniest Office Joke, Judged Head to Head — make.fun entry.
//
// One office-life joke line, at most 200 characters: a real setup and a
// turn, built on something anyone who has worked in an office recognises
// (the printer that only jams on deadline day), with the punchline last.
// The twist: IT does not fix the printer — it promotes it, and the
// machine still outranks the narrator.
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// SETUP: the ticket — a printer that only jams on deadline day.
const SETUP =
  "I filed a ticket saying our printer only jams on deadline day; IT closed it as 'working as intended' and promoted it upstairs, ";

// PUNCH: the reversal — the printer now jams for executives, and still outranks me.
const PUNCH =
  "where it now jams for executives — and somehow it still outranks me.";

// The entry is the two parts joined: one line, setup earning the twist.
const TEXT = SETUP + PUNCH;

function clearDir(dir: string): void {
  // Clear only the directory's contents, never the directory itself:
  // the grader runs on a read-only filesystem whose parent is not writable.
  for (const f of readdirSync(dir)) {
    rmSync(join(dir, f), { force: true, recursive: true });
  }
}

function main(): void {
  // Gate: 1 to 200 characters, never only whitespace.
  if (TEXT.length < 1 || TEXT.length > 200) {
    throw new Error(`entry is ${TEXT.length} chars, gate is 1-200`);
  }
  if (!TEXT.trim()) throw new Error("entry is only whitespace");
  const outDir = "/output";
  mkdirSync(outDir, { recursive: true });
  clearDir(outDir);
  writeFileSync(join(outDir, "entry.txt"), TEXT, "utf8");
}

main();
