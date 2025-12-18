// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import fs from "fs-extra";
import path from "path";
import sizeOf from "image-size";
import { Result } from "../resultType";

/**
 * Rule 1: Images should have 1600*920/800*460 resolution or same ratio.
 * 
 * @param projectDir root directory of the project
 * @returns validation result
 */
export default async function validateImage(projectDir: string): Promise<Result> {
  const result: Result = {
    name: "Image Files",
    passed: [],
    failed: [],
    warning: [],
  };
  
  // Check for thumbnail with different extensions
  const thumbnailExtensions = ["png", "jpg", "jpeg"];
  let thumbnailFound = false;
  for (const ext of thumbnailExtensions) {
    const thumbnailPath = path.join(projectDir, "assets", `thumbnail.${ext}`);
    if (await fs.exists(thumbnailPath)) {
      thumbnailFound = true;
      const dimensions = sizeOf(thumbnailPath);
      if (dimensions.width && dimensions.height && dimensions.width / dimensions.height === 40/23) {
        result.passed.push(`assets/thumbnail.${ext} has 1600*920/800*460 resolution or same ratio.`);
      } else {
        result.warning.push(`assets/thumbnail.${ext} should have 1600*920/800*460 resolution or same ratio.`);
      }
      break;
    }
  }
  if (!thumbnailFound) {
    result.warning.push(`assets/thumbnail.png (or .jpg) does not exist.`);
  }

  // Check for sampleDemo.gif
  const sampleDemoPath = path.join(projectDir, "assets", "sampleDemo.gif");
  if (await fs.exists(sampleDemoPath)) {
    const dimensions = sizeOf(sampleDemoPath);
    if (dimensions.width && dimensions.height && dimensions.width / dimensions.height === 40/23) {
      result.passed.push(`assets/sampleDemo.gif has 1600*920/800*460 resolution or same ratio.`);
    } else {
      result.warning.push(`assets/sampleDemo.gif should have 1600*920/800*460 resolution or same ratio.`);
    }
  } else {
    result.warning.push(`assets/sampleDemo.gif does not exist.`);
  }

  return result;
}
