# bulk-optimize-cli

**bulk-optimize-cli** is a simple command-line tool to losslessly (or near-losslessly) compress images (JPEG, PNG, WebP, TIFF) and PDFs in bulk.

---

## Requirements

- **Node.js** v14 or later
- **libvips-tools** (for image optimization)
- **Ghostscript** (for PDF optimization)

For Debian/Ubuntu systems, install dependencies with:
```bash
sudo apt update
sudo apt install nodejs ghostscript libvips-tools
```

## Installation

### For Debian-based Systems (Recommended)
1. Download the .deb package:
```bash
wget https://github.com/kursatkomurcu/bulk-optimize-cli/releases/download/v1.0.0/bulk-optimize-cli_1.0.0-1_all.deb
```

2. Install the package:
```bash
sudo dpkg -i bulk-optimize-cli_1.0.0-1_all.deb
```

If you see any dependency errors, run:
```bash
sudo apt-get install -f
```

### Alternative Installation via npm
```bash
npm install -g bulk-optimize-cli
```

## Features
- Batch image compression
- Support for JPEG, PNG, WebP, TIFF formats
- PDF compression using Ghostscript
- Command line interface
- Progress bar for bulk operations
- Original file backup option

## Usage
```bash
# Basic usage
bulk-optimize /path/to/images
```

### Command-line Options

The following command-line flags are available to customize the optimization process:

- `-r, --recursive`: Process files in subdirectories recursively
  ```bash
  bulk-optimize /path/to/images -r
  ```

- `-o, --out <dir>`: Specify output directory for optimized files
  ```bash
  bulk-optimize /path/to/images -o ./optimized_images
  ```

- `-v, --verbose`: Enable verbose logging (shows detailed progress for each file)
  ```bash
  bulk-optimize /path/to/images -v
  ```

You can combine multiple flags:
```bash
# Process files recursively, save to output dir, with verbose logging
bulk-optimize /path/to/images -r -o ./optimized -v
```

### Examples
```bash
# Optimize all supported files in current directory
bulk-optimize .

# Optimize files in directory and all subdirectories
bulk-optimize /path/to/images -r

# Save optimized files to a different directory
bulk-optimize /path/to/images -o /path/to/output

# Show detailed progress while optimizing recursively
bulk-optimize /path/to/images -r -v
```

## Configuration
Create a `.bulkoptimizerc` file in your home directory:
```json
{
  "defaultQuality": 85,
  "createBackup": true,
  "defaultFormats": ["jpg", "png", "webp", "tiff"],
  "outputDir": "./optimized"
}
```

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
MIT License - see LICENSE file for details