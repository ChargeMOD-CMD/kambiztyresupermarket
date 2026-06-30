const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(dirPath);
  });
}

const allFiles = new Set();
walk('src', (filepath) => {
  allFiles.add(filepath.replace(/\\/g, '/'));
});

let hasError = false;

walk('src', (filepath) => {
  if (!filepath.endsWith('.ts') && !filepath.endsWith('.tsx')) return;
  const content = fs.readFileSync(filepath, 'utf8');
  const importRegex = /from\s+['"]([^'"]+)['"]/g;
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1];
    if (importPath.startsWith('.')) {
      const resolvedPath = path.resolve(path.dirname(filepath), importPath);
      const relativeToSrc = 'src' + resolvedPath.split('src')[1];
      const normalizedRelative = relativeToSrc.replace(/\\/g, '/');
      
      // Check if file exists with case insensitivity
      let found = false;
      let matchedCase = '';
      for (const f of allFiles) {
        if (f.toLowerCase() === normalizedRelative.toLowerCase() + '.ts' ||
            f.toLowerCase() === normalizedRelative.toLowerCase() + '.tsx' ||
            f.toLowerCase() === normalizedRelative.toLowerCase() + '.css' ||
            f.toLowerCase() === normalizedRelative.toLowerCase() ||
            f.toLowerCase() === normalizedRelative.toLowerCase() + '/index.ts' ||
            f.toLowerCase() === normalizedRelative.toLowerCase() + '/index.tsx') {
          found = true;
          matchedCase = f;
          break;
        }
      }
      
      if (found) {
        // Now check exact case
        let exactMatch = false;
        for (const f of allFiles) {
          if (f === matchedCase) {
             // We found the actual file case, check if the import path matches the case of the filename
             const importDir = path.dirname(normalizedRelative);
             const importBase = path.basename(normalizedRelative);
             const actualBase = path.basename(matchedCase).replace(/\.tsx?$/, '');
             if (importBase.toLowerCase() === actualBase.toLowerCase() && importBase !== actualBase) {
                 if (importBase !== 'index') {
                   console.log(`CASE MISMATCH in ${filepath}: import '${importPath}' -> actual file is '${matchedCase}'`);
                   hasError = true;
                 }
             }
          }
        }
      }
    }
  }
});

if (!hasError) console.log("No case mismatches found!");
