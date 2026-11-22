import { readFileSync } from "node:fs";
import { describe, expect, test } from "vitest";
import { parse } from "./traceparent";

type Case = { name: string; input: string; valid: boolean };

const cases: Case[] = JSON.parse(
  readFileSync(
    new URL("../contracts/examples/traceparent-cases.json", import.meta.url),
    "utf-8",
  ),
);

describe("traceparent parse", () => {
  for (const c of cases) {
    test(c.name, () => {
      if (c.valid) {
        expect(parse(c.input)).not.toBeNull();
      } else {
        expect(parse(c.input)).toBeNull();
      }
    });
  }
});
