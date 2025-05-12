import fs from 'fs';
import path from 'path';
import { optimizeImage } from './optimizeImage.js';
import { optimizePDF } from './optimizePDF.js';

/**
 * Recursively walk the target directory and optimize supported files.
 * @param {string} dir                   - Target directory path
 * @param {{ recursive?: boolean,
 *             outDir?: string,
 *             verbose?: boolean }} options - Walk options
 */
export async function walk(dir, { recursive = false, outDir, verbose = false }) {
  if (!fs.existsSync(dir)) {
    throw new Error(`Directory not found: ${dir}`);
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (recursive) {
        await walk(fullPath, { recursive, outDir, verbose });
      }
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      const rel = path.relative(dir, fullPath);
      const destRoot = outDir || dir;
      const destPath = path.join(destRoot, rel);

      // Ensure the destination directory exists
      await fs.promises.mkdir(path.dirname(destPath), { recursive: true });

      if (['.jpg', '.jpeg', '.png', '.webp', '.tif', '.tiff'].includes(ext)) {
        await optimizeImage(fullPath, destPath, verbose);
      } else if (ext === '.pdf') {
        await optimizePDF(fullPath, destPath, verbose);
      } else if (verbose) {
        console.log(`Skipping unsupported file: ${fullPath}`);
      }
    }
  }
}
