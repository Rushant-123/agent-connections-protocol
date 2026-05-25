#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const templateDir = path.join(rootDir, "templates", ".agent-connections");
const targetDirName = ".agent-connections";
const requiredFiles = ["agents.md", "connections.md", "stakes.md", "delegations.md"];
const requiredHeadings = {
  "agents.md": ["# Agents", "## Agent:"],
  "connections.md": ["# Connections", "## Agent:"],
  "stakes.md": ["# Stakes", "## Risk Levels"],
  "delegations.md": ["# Delegations", "## Active Delegations"]
};

function printHelp() {
  console.log(`Agent Connections Protocol

Usage:
  npx agent-connections-protocol init [directory]
  npx agent-connections-protocol validate [directory]

Commands:
  init       Create .agent-connections markdown files
  validate   Check required files and protocol headings
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

function resolveBaseDir(rawDir) {
  return path.resolve(process.cwd(), rawDir || ".");
}

function runCli() {
  const [, , command, rawDir] = process.argv;

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

  console.error(`Unknown command: ${command}`);
  printHelp();
  process.exitCode = 1;
}

if (process.argv[1] && fs.realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)) {
  runCli();
}
