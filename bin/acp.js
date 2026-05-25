#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const templateDir = path.join(rootDir, "templates", ".agent-connections");
const registryTemplateDir = path.join(rootDir, "templates", ".agent-registry");
const targetDirName = ".agent-connections";
const registryDirName = ".agent-registry";
const requiredFiles = ["agents.md", "connections.md", "stakes.md", "delegations.md"];
const registryRequiredFiles = ["registry.md", "identities.md", "requests.md", "attestations.md"];
const requiredHeadings = {
  "agents.md": ["# Agents", "## Agent:"],
  "connections.md": ["# Connections", "## Agent:"],
  "stakes.md": ["# Stakes", "## Risk Levels"],
  "delegations.md": ["# Delegations", "## Active Delegations"]
};
const registryRequiredHeadings = {
  "registry.md": ["# Agent Registry", "## Agent:"],
  "identities.md": ["# Agent Identities", "## Identity:"],
  "requests.md": ["# Network Requests", "## Request Ledger"],
  "attestations.md": ["# Attestations", "## Attestation:"]
};

function printHelp() {
  console.log(`Agent Connections Protocol

Usage:
  npx agent-connections-protocol init [directory]
  npx agent-connections-protocol validate [directory]
  npx agent-connections-protocol registry init [directory]
  npx agent-connections-protocol registry validate [directory]
  npx agent-connections-protocol registry log-request [directory] [options]

Commands:
  init       Create .agent-connections markdown files
  validate   Check required files and protocol headings
  registry   Manage .agent-registry yellow pages files

Log request options:
  --from-agent <id>     Agent making the request
  --from-gateway <id>   Gateway sending the request
  --to-agent <id>       Agent receiving the request
  --endpoint <url>      Network endpoint called
  --scope <scope>       Capability/scope requested
  --identity <id>       Identity or proof attached
  --decision <value>    allowed, denied, ask_user, sandboxed
  --outcome <value>     completed, failed, pending, cancelled
  --request-id <id>     Optional request id
  --time <iso>          Optional ISO timestamp
`);
}

function copyFile(source, target) {
  if (fs.existsSync(target)) {
    return { file: path.basename(target), status: "exists" };
  }
  fs.copyFileSync(source, target);
  return { file: path.basename(target), status: "created" };
}

export function initProtocol(baseDir = process.cwd()) {
  const targetDir = path.join(baseDir, targetDirName);
  fs.mkdirSync(targetDir, { recursive: true });

  const results = requiredFiles.map((file) => {
    return copyFile(path.join(templateDir, file), path.join(targetDir, file));
  });

  return { targetDir, results };
}

export function validateProtocol(baseDir = process.cwd()) {
  const targetDir = path.join(baseDir, targetDirName);
  const errors = [];

  if (!fs.existsSync(targetDir)) {
    errors.push(`Missing directory: ${targetDirName}`);
    return { ok: false, targetDir, errors };
  }

  for (const file of requiredFiles) {
    const filePath = path.join(targetDir, file);
    if (!fs.existsSync(filePath)) {
      errors.push(`Missing file: ${targetDirName}/${file}`);
      continue;
    }

    const text = fs.readFileSync(filePath, "utf8");
    for (const heading of requiredHeadings[file]) {
      if (!text.includes(heading)) {
        errors.push(`Missing heading in ${targetDirName}/${file}: ${heading}`);
      }
    }
  }

  return { ok: errors.length === 0, targetDir, errors };
}

export function initRegistry(baseDir = process.cwd()) {
  const targetDir = path.join(baseDir, registryDirName);
  fs.mkdirSync(targetDir, { recursive: true });

  const results = registryRequiredFiles.map((file) => {
    return copyFile(path.join(registryTemplateDir, file), path.join(targetDir, file));
  });

  return { targetDir, results };
}

export function validateRegistry(baseDir = process.cwd()) {
  const targetDir = path.join(baseDir, registryDirName);
  const errors = [];

  if (!fs.existsSync(targetDir)) {
    errors.push(`Missing directory: ${registryDirName}`);
    return { ok: false, targetDir, errors };
  }

  for (const file of registryRequiredFiles) {
    const filePath = path.join(targetDir, file);
    if (!fs.existsSync(filePath)) {
      errors.push(`Missing file: ${registryDirName}/${file}`);
      continue;
    }

    const text = fs.readFileSync(filePath, "utf8");
    for (const heading of registryRequiredHeadings[file]) {
      if (!text.includes(heading)) {
        errors.push(`Missing heading in ${registryDirName}/${file}: ${heading}`);
      }
    }
  }

  return { ok: errors.length === 0, targetDir, errors };
}

function parseArgs(args) {
  const values = {};
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (!arg.startsWith("--")) {
      continue;
    }
    const key = arg.slice(2);
    const next = args[index + 1];
    if (!next || next.startsWith("--")) {
      values[key] = "true";
      continue;
    }
    values[key] = next;
    index += 1;
  }
  return values;
}

function makeRequestId() {
  return `req_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export function logRegistryRequest(baseDir = process.cwd(), rawOptions = {}) {
  const result = validateRegistry(baseDir);
  if (!result.ok) {
    return { ok: false, errors: result.errors };
  }

  const required = ["from-agent", "from-gateway", "to-agent", "endpoint", "scope", "identity", "decision", "outcome"];
  const missing = required.filter((key) => !rawOptions[key]);
  if (missing.length > 0) {
    return { ok: false, errors: missing.map((key) => `Missing option: --${key}`) };
  }

  const request = {
    time: rawOptions.time || new Date().toISOString(),
    requestId: rawOptions["request-id"] || makeRequestId(),
    fromAgent: rawOptions["from-agent"],
    fromGateway: rawOptions["from-gateway"],
    toAgent: rawOptions["to-agent"],
    endpoint: rawOptions.endpoint,
    scope: rawOptions.scope,
    identity: rawOptions.identity,
    decision: rawOptions.decision,
    outcome: rawOptions.outcome
  };

  const row = `| ${request.time} | ${request.requestId} | ${request.fromAgent} | ${request.fromGateway} | ${request.toAgent} | ${request.endpoint} | ${request.scope} | ${request.identity} | ${request.decision} | ${request.outcome} |\n`;
  fs.appendFileSync(path.join(baseDir, registryDirName, "requests.md"), row);
  return { ok: true, request };
}

function resolveBaseDir(rawDir) {
  return path.resolve(process.cwd(), rawDir || ".");
}

function runCli() {
  const [, , command, rawDir, ...rest] = process.argv;

  if (!command || command === "help" || command === "--help" || command === "-h") {
    printHelp();
    return;
  }

  if (command === "init") {
    const result = initProtocol(resolveBaseDir(rawDir));
    console.log(`Initialized ${path.relative(process.cwd(), result.targetDir) || targetDirName}`);
    for (const item of result.results) {
      console.log(`- ${item.status}: ${item.file}`);
    }
    return;
  }

  if (command === "validate") {
    const result = validateProtocol(resolveBaseDir(rawDir));
    if (result.ok) {
      console.log(`Valid Agent Connections Protocol directory: ${path.relative(process.cwd(), result.targetDir) || targetDirName}`);
      return;
    }
    console.error("Agent Connections Protocol validation failed:");
    for (const error of result.errors) {
      console.error(`- ${error}`);
    }
    process.exitCode = 1;
    return;
  }

  if (command === "registry") {
    const subcommand = rawDir;
    const maybeDir = rest[0] && !rest[0].startsWith("--") ? rest[0] : ".";
    const optionArgs = rest[0] && !rest[0].startsWith("--") ? rest.slice(1) : rest;

    if (subcommand === "init") {
      const result = initRegistry(resolveBaseDir(maybeDir));
      console.log(`Initialized ${path.relative(process.cwd(), result.targetDir) || registryDirName}`);
      for (const item of result.results) {
        console.log(`- ${item.status}: ${item.file}`);
      }
      return;
    }

    if (subcommand === "validate") {
      const result = validateRegistry(resolveBaseDir(maybeDir));
      if (result.ok) {
        console.log(`Valid Agent Registry directory: ${path.relative(process.cwd(), result.targetDir) || registryDirName}`);
        return;
      }
      console.error("Agent Registry validation failed:");
      for (const error of result.errors) {
        console.error(`- ${error}`);
      }
      process.exitCode = 1;
      return;
    }

    if (subcommand === "log-request") {
      const result = logRegistryRequest(resolveBaseDir(maybeDir), parseArgs(optionArgs));
      if (result.ok) {
        console.log(`Logged request: ${result.request.requestId}`);
        return;
      }
      console.error("Agent Registry request logging failed:");
      for (const error of result.errors) {
        console.error(`- ${error}`);
      }
      process.exitCode = 1;
      return;
    }

    console.error(`Unknown registry command: ${subcommand || "(missing)"}`);
    printHelp();
    process.exitCode = 1;
    return;
  }

  console.error(`Unknown command: ${command}`);
  printHelp();
  process.exitCode = 1;
}

if (process.argv[1] && fs.realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)) {
  runCli();
}
