import sharp from 'sharp';
import chalk from 'chalk';

/**
 * Compress the source file (JPEG, PNG, WebP, TIFF) losslessly and write to the destination.
 * @param {string} src     - Source file path
 * @param {string} dest    - Destination file path
 * @param {boolean} verbose - Whether to show verbose logs
 */
export async function optimizeImage(src, dest, verbose) {
  try {
    let pipeline = sharp(src);
    const ext = src.split('.').pop().toLowerCase();

    if (['jpg', 'jpeg'].includes(ext)) {
      pipeline = pipeline.jpeg({ mozjpeg: true });
    } else if (ext === 'png') {
      pipeline = pipeline.png({ compressionLevel: 9 });
    } else if (ext === 'webp') {
      pipeline = pipeline.webp({ lossless: true });
    } else if (['tif', 'tiff'].includes(ext)) {
      // Use LZW compression for TIFF
      pipeline = pipeline.tiff({ compression: 'lzw' });
    } else {
      if (verbose) console.log(chalk.yellow(`Unsupported image format, skipping: ${src}`));
      return;
    }

    await pipeline.toFile(dest);
    if (verbose) console.log(chalk.green(`Image optimized: ${src}`));
  } catch (err) {
    console.error(chalk.red(`Image error (${src}): ${err.message}`));
  }
}