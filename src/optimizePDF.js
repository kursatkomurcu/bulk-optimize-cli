import { spawn } from 'child_process';
import chalk from 'chalk';

/**
 * Compress the source PDF using Ghostscript and write it to the destination path.
 * Handles filenames with spaces and reduces file size by choosing an appropriate PDF setting.
 *
 * @param {string} src      - Source PDF file path
 * @param {string} dest     - Destination file path
 * @param {boolean} verbose - Whether to show verbose logs
 */
export async function optimizePDF(src, dest, verbose) {
  return new Promise((resolve, reject) => {
    // Ghostscript CLI arguments:
    // - /screen: lowest resolution (≈72 dpi) for smallest size
    // - /ebook: medium resolution (≈150 dpi) for balanced quality/size
    const args = [
      '-sDEVICE=pdfwrite',
      '-dCompatibilityLevel=1.4',
      '-dPDFSETTINGS=/screen',
      '-dNOPAUSE',
      '-dBATCH',
      `-sOutputFile=${dest}`,
      src
    ];

    // Spawn Ghostscript with argument array to preserve spaces in paths
    const gs = spawn('gs', args);

    let stderr = '';
    gs.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
    });

    gs.on('close', (code) => {
      if (code !== 0) {
        console.error(chalk.red(`PDF error (${src}):\n${stderr}`));
        return reject(new Error(`Ghostscript exited with code ${code}`));
      }
      if (verbose) console.log(chalk.blue(`PDF optimized: ${src}`));
      resolve();
    });

    gs.on('error', (err) => {
      console.error(chalk.red(`Failed to start Ghostscript: ${err.message}`));
      reject(err);
    });
  });
}