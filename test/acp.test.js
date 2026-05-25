import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { initProtocol, validateProtocol } from "../bin/acp.js";

function tempDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "acp-test-"));
}

test("init creates the protocol directory and required markdown files", () => {
  const dir = tempDir();
  const result = initProtocol(dir);

  assert.equal(path.basename(result.targetDir), ".agent-connections");
  for (const file of ["agents.md", "connections.md", "stakes.md", "delegations.md"]) {
    assert.equal(fs.existsSync(path.join(result.targetDir, file)), true);
  }
});

test("validate passes for initialized protocol files", () => {
  const dir = tempDir();
  initProtocol(dir);

  const result = validateProtocol(dir);

  assert.equal(result.ok, true);
  assert.deepEqual(result.errors, []);
});

test("validate fails when a required file is missing", () => {
  const dir = tempDir();
  initProtocol(dir);
  fs.rmSync(path.join(dir, ".agent-connections", "connections.md"));

  const result = validateProtocol(dir);

  assert.equal(result.ok, false);
  assert.equal(result.errors.includes("Missing file: .agent-connections/connections.md"), true);
});
