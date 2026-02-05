#! /usr/bin/env node
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Command } from "commander";
import figlet from "figlet";
import standard from "figlet/importable-fonts/Standard.js";

import { outputResult } from "./util.js";
import validateEnvFiles from "./validators/envValidator.js";
import validateFolderStructure from "./validators/folderStructureValidator.js";
import validateImage from "./validators/imageValidator.js";
import validatePackageJson from "./validators/packageJsonValidator.js";
import validateTeamsAppManifest from "./validators/teamsAppManifestValidator.js";
import validateTeamsAppYaml from "./validators/teamsAppYamlValidator.js";

const packageVersion = "1.0.0";

const program = new Command();
const validators = [
  validateFolderStructure,
  validateTeamsAppYaml,
  validateTeamsAppManifest,
  validateEnvFiles,
  validateImage,
  validatePackageJson,
];

async function main() {
  await program
    .version(packageVersion)
    .description("A tool to validate project content before onboarding to TeamsFx sample gallery.")
    .option("-p, --path <path>", "Path to the project folder to be validated.")
    .parseAsync(process.argv);

  const options = program.opts();

  let projectFolder = process.cwd();
  // check if the option has been used the user
  if (options.path && typeof options.path === "string") {
    projectFolder = options.path;
  }
  for (const validator of validators) {
    const result = await validator(projectFolder);
    outputResult(result);
  }
}
figlet.parseFont("Standard", standard);
console.log(figlet.textSync("TeamsFx Sample Validator"));
main();
