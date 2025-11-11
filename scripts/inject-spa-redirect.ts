import { readdirSync, statSync, copyFileSync, existsSync } from "fs";
import { join } from "path";

/**
 * Post-build script to copy index.html to 404.html in each directory
 * This allows GitHub Pages to serve the correct content when routes are accessed directly
 */

const outDir = join(process.cwd(), "out");

function copyIndexTo404(dir: string) {
  const indexPath = join(dir, "index.html");
  const notFoundPath = join(dir, "404.html");

  // If index.html exists in this directory, copy it to 404.html
  if (existsSync(indexPath)) {
    try {
      copyFileSync(indexPath, notFoundPath);
      console.log(`✅ Copied ${indexPath.replace(outDir, "")} → 404.html`);
    } catch (error) {
      console.error(`❌ Error copying in ${dir}:`, error);
    }
  }
}

function processDirectory(dir: string) {
  try {
    const items = readdirSync(dir);

    // First, copy index.html to 404.html in current directory
    copyIndexTo404(dir);

    // Then recursively process subdirectories
    for (const item of items) {
      const fullPath = join(dir, item);
      const stat = statSync(fullPath);

      if (stat.isDirectory() && !item.startsWith("_")) {
        // Skip _next and other internal directories
        processDirectory(fullPath);
      }
    }
  } catch (error) {
    console.error(`❌ Error processing directory ${dir}:`, error);
  }
}

try {
  console.log("🔄 Copying index.html to 404.html in all directories...");
  processDirectory(outDir);
  console.log(
    "✅ Successfully created 404.html files for GitHub Pages SPA support"
  );
} catch (error) {
  console.error("❌ Error in post-build script:", error);
  process.exit(1);
}
