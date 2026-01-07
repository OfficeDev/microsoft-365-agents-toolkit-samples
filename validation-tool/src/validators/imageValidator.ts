// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import fs from "fs-extra";
import path from "path";
import sizeOf from "image-size";
import { Result } from "../resultType";
import { getSampleImagePaths, getExpectedSampleId } from "../projectDetector";

/**
 * Check if a sample is a codespaces sample (name ends with "-codespaces").
 * Codespaces samples are not in samples-config-v3.json, so config-dependent
 * validations (like thumbnail from config) should be skipped.
 */
function isCodespacesSample(projectDir: string): boolean {
  const sampleId = getExpectedSampleId(projectDir);
  return sampleId.endsWith("-codespaces");
}

/**
 * Rule 1: Images should have 1600*920/800*460 resolution or same ratio.
 * - Thumbnail is required to display in sample gallery (path from samples-config-v3.json).
 * - GIF is fully optional - both existence and aspect ratio are warnings only.
 * - Codespaces samples are not in config, so thumbnail validation is skipped for them.
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
  
  // Check if this is a codespaces sample (not in samples-config-v3.json)
  const isCodespaces = isCodespacesSample(projectDir);
  
  // Get image paths from samples-config-v3.json
  const imagePaths = await getSampleImagePaths(projectDir);
  
  // Check thumbnail (required for sample gallery, but skip for codespaces samples)
  if (isCodespaces) {
    result.passed.push(`Thumbnail validation skipped for codespaces sample (not in samples-config-v3.json).`);
  } else if (imagePaths.thumbnailPath) {
    const thumbnailFullPath = path.join(projectDir, imagePaths.thumbnailPath);
    if (await fs.exists(thumbnailFullPath)) {
      const dimensions = sizeOf(thumbnailFullPath);
      if (dimensions.width && dimensions.height && dimensions.width / dimensions.height === 40/23) {
        result.passed.push(`${imagePaths.thumbnailPath} has 1600*920/800*460 resolution or same ratio.`);
      } else {
        result.failed.push(`${imagePaths.thumbnailPath} must have 1600*920/800*460 resolution or same ratio (40:23 aspect ratio). Current: ${dimensions.width}x${dimensions.height}.`);
      }
    } else {
      result.failed.push(`${imagePaths.thumbnailPath} is required to display in sample gallery but does not exist.`);
    }
  } else {
    // Fallback: check default paths if not specified in config
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
          result.failed.push(`assets/thumbnail.${ext} must have 1600*920/800*460 resolution or same ratio (40:23 aspect ratio). Current: ${dimensions.width}x${dimensions.height}.`);
        }
        break;
      }
    }
    if (!thumbnailFound) {
      result.failed.push(`Thumbnail image is required to display in sample gallery. Please add thumbnailPath to samples-config-v3.json or add assets/thumbnail.png.`);
    }
  }

  // Check gif (optional - both existence and aspect ratio are optional)
  if (imagePaths.gifPath) {
    const gifFullPath = path.join(projectDir, imagePaths.gifPath);
    if (await fs.exists(gifFullPath)) {
      const dimensions = sizeOf(gifFullPath);
      if (dimensions.width && dimensions.height && dimensions.width / dimensions.height === 40/23) {
        result.passed.push(`${imagePaths.gifPath} has 1600*920/800*460 resolution or same ratio.`);
      } else {
        result.warning.push(`${imagePaths.gifPath} does not have 40:23 aspect ratio. Current: ${dimensions.width}x${dimensions.height}. (Optional)`);
      }
    } else {
      result.warning.push(`${imagePaths.gifPath} does not exist. (Optional)`);
    }
  } else {
    // Fallback: check default path if not specified in config (optional)
    const sampleDemoPath = path.join(projectDir, "assets", "sampleDemo.gif");
    if (await fs.exists(sampleDemoPath)) {
      const dimensions = sizeOf(sampleDemoPath);
      if (dimensions.width && dimensions.height && dimensions.width / dimensions.height === 40/23) {
        result.passed.push(`assets/sampleDemo.gif has 1600*920/800*460 resolution or same ratio.`);
      } else {
        result.warning.push(`assets/sampleDemo.gif does not have 40:23 aspect ratio. Current: ${dimensions.width}x${dimensions.height}. (Optional)`);
      }
    } else {
      result.warning.push(`Sample demo gif does not exist. (Optional)`);
    }
  }

  return result;
}
