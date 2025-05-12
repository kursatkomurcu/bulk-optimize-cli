# bulk-optimize-cli

**bulk-optimize-cli** is a simple command-line tool to losslessly (or near-losslessly) compress images (JPEG, PNG, WebP, TIFF) and PDFs in bulk.

---

## Requirements

- **Node.js** v14 or later  
- **npm** (Node package manager)  
- **Ghostscript** (for PDF optimization)  
  ```bash
  # Debian/Ubuntu
  sudo apt update
  sudo apt install ghostscript

## Features
- Batch image compression
- Support for JPEG, PNG, WebP, TIFF formats
- PDF compression using Ghostscript
- Command line interface
- Progress bar for bulk operations
- Original file backup option

## Installation
```bash
sudo apt install ./bulk-optimize-cli_1.0.0-1_all.deb
```

## Usage
```bash
# Basic usage
bulk-optimize /path/to/images

# Specify output directory
bulk-optimize /path/to/images -o /path/to/output

# Compress with specific quality (1-100)
bulk-optimize /path/to/images --quality 85

# Only process specific formats
bulk-optimize /path/to/images --formats jpg,png

# Create backup of original files
bulk-optimize /path/to/images --backup
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
