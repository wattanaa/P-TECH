import fs from "fs";
import path from "path";

const distDir = path.join(process.cwd(), "dist");
const htmlPath = path.join(distDir, "index.html");

if (!fs.existsSync(htmlPath)) {
  console.error("Please run the production build first using 'npm run build'!");
  process.exit(1);
}

let htmlContent = fs.readFileSync(htmlPath, "utf8");

// 1. Inline all CSS link tags
// e.g., <link rel="stylesheet" crossorigin href="/assets/index-By9tB-W9.css">
const cssRegex = /<link rel="stylesheet"[^>]*href="\/assets\/([^"]+)"[^>]*>/g;
htmlContent = htmlContent.replace(cssRegex, (match, cssFile) => {
  const cssPath = path.join(distDir, "assets", cssFile);
  if (fs.existsSync(cssPath)) {
    const cssContent = fs.readFileSync(cssPath, "utf8");
    console.log(`Inlining CSS: ${cssFile}`);
    return `<style>\n${cssContent}\n</style>`;
  }
  return match;
});

// 2. Inline all JS script tags
// e.g., <script type="module" crossorigin src="/assets/index-C3T-uU0m.js"></script>
const jsRegex = /<script type="module"[^>]*src="\/assets\/([^"]+)"[^>]*><\/script>/g;
htmlContent = htmlContent.replace(jsRegex, (match, jsFile) => {
  const jsPath = path.join(distDir, "assets", jsFile);
  if (fs.existsSync(jsPath)) {
    const jsContent = fs.readFileSync(jsPath, "utf8");
    console.log(`Inlining JS: ${jsFile}`);
    // Inject the script inside standard script tags
    return `<script type="module">\n${jsContent}\n</script>`;
  }
  return match;
});

// 3. Remove all modulepreload links to prevent 404s when loading offline
const preloadRegex = /<link rel="modulepreload"[^>]*href="\/assets\/[^"]+"[^>]*>/g;
htmlContent = htmlContent.replace(preloadRegex, "");

// Write the standalone file to the workspace root
const outputPath = path.join(process.cwd(), "pathumrat-tech-college.html");
fs.writeFileSync(outputPath, htmlContent, "utf8");

console.log("\n========================================================");
console.log(`🎉 Standalone HTML file created successfully at:\n   ${outputPath}`);
console.log("========================================================\n");
