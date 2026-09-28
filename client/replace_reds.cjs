const fs = require('fs');
const path = require('path');

const directory = path.join(__dirname, 'src');

const replacements = [
  { regex: /bg-red-950\/40/g, replacement: 'bg-red-50' },
  { regex: /bg-red-950\/60/g, replacement: 'bg-red-50' },
  { regex: /border-red-900\/40/g, replacement: 'border-red-200' },
  { regex: /border-red-900\/50/g, replacement: 'border-red-200' },
  { regex: /border-red-900\/60/g, replacement: 'border-red-200' },
  { regex: /text-red-300/g, replacement: 'text-red-800' },
  { regex: /text-red-400/g, replacement: 'text-red-700' },
];

function replaceInFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  let newContent = content;
  
  for (const { regex, replacement } of replacements) {
    newContent = newContent.replace(regex, replacement);
  }
  
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Updated reds in ${filePath}`);
  }
}

function traverseDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      traverseDir(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      replaceInFile(fullPath);
    }
  }
}

traverseDir(directory);
console.log('Done red replacements.');
