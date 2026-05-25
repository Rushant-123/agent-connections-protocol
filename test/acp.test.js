import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { initProtocol, initRegistry, logRegistryRequest, validateProtocol, validateRegistry } from "../bin/acp.js";

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

test("registry init creates yellow pages markdown files", () => {
  const dir = tempDir();
  const result = initRegistry(dir);

  assert.equal(path.basename(result.targetDir), ".agent-registry");
  for (const file of ["registry.md", "identities.md", "requests.md", "attestations.md"]) {
    assert.equal(fs.existsSync(path.join(result.targetDir, file)), true);
  }
});

test("registry validate passes for initialized registry files", () => {
  const dir = tempDir();
  initRegistry(dir);

  const result = validateRegistry(dir);

  assert.equal(result.ok, true);
  assert.deepEqual(result.errors, []);
});

test("registry log-request appends request metadata", () => {
  const dir = tempDir();
  initRegistry(dir);

  const result = logRegistryRequest(dir, {
    time: "2026-05-26T01:10:00Z",
    "request-id": "req_test_001",
    "from-agent": "openclaw-main-agent",
    "from-gateway": "openclaw-gateway",
    "to-agent": "hermes-sales-agent",
    endpoint: "https://hermes.example.com/agents/sales/a2a",
    scope: "draft_email",
    identity: "did:agent:saasden:openclaw-main-agent",
    decision: "allowed",
    outcome: "completed"
  });

  assert.equal(result.ok, true);
  const requests = fs.readFileSync(path.join(dir, ".agent-registry", "requests.md"), "utf8");
  assert.equal(
    requests.includes(
      "| 2026-05-26T01:10:00Z | req_test_001 | openclaw-main-agent | openclaw-gateway | hermes-sales-agent | https://hermes.example.com/agents/sales/a2a | draft_email | did:agent:saasden:openclaw-main-agent | allowed | completed |"
    ),
    true
  );
});

test("registry log-request fails when required metadata is missing", () => {
  const dir = tempDir();
  initRegistry(dir);

  const result = logRegistryRequest(dir, {
    "from-agent": "openclaw-main-agent"
  });

  assert.equal(result.ok, false);
  assert.equal(result.errors.includes("Missing option: --endpoint"), true);
});
