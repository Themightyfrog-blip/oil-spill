const fs = require('fs');
const path = require('path');

const directory = path.join(__dirname, 'src');

const replacements = [
  { regex: /#f59e0b/gi, replacement: '#5C0A28' }, // Amber to Deep Burgundy
  { regex: /rgba\(245,\s*158,\s*11/gi, replacement: 'rgba(92, 10, 40' },
  { regex: /rgba\(245,158,11/gi, replacement: 'rgba(92,10,40' },
  { regex: /#10b981/gi, replacement: '#A9A9A9' } // Emerald to Silver
];

function replaceInFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  let newContent = content;
  
  for (const { regex, replacement } of replacements) {
    newContent = newContent.replace(regex, replacement);
  }
  
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Updated hex in ${filePath}`);
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
console.log('Done hex replacements.');
