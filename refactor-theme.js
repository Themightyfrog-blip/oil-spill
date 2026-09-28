const fs = require('fs');
const path = require('path');

const directories = [
  path.join(__dirname, 'client', 'src', 'pages'),
  path.join(__dirname, 'client', 'src', 'components')
];

const replacements = [
  { regex: /bg-zinc-950\/(?:\d+)/g, replacement: 'bg-card' },
  { regex: /bg-zinc-950/g, replacement: 'bg-card' },
  { regex: /bg-zinc-900\/(?:\d+)/g, replacement: 'bg-muted' },
  { regex: /bg-zinc-900/g, replacement: 'bg-muted' },
  { regex: /bg-zinc-800\/(?:\d+)/g, replacement: 'bg-accent' },
  { regex: /bg-zinc-800/g, replacement: 'bg-accent' },
  { regex: /text-zinc-100/g, replacement: 'text-foreground' },
  { regex: /text-zinc-200/g, replacement: 'text-foreground' },
  { regex: /text-zinc-300/g, replacement: 'text-secondary-foreground' },
  { regex: /text-zinc-400/g, replacement: 'text-muted-foreground' },
  { regex: /text-zinc-500/g, replacement: 'text-muted-foreground' },
  { regex: /border-zinc-800/g, replacement: 'border-border' },
  { regex: /border-zinc-700/g, replacement: 'border-border' },
  { regex: /border-border\/(?:\d+)/g, replacement: 'border-border' }
];

function processDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      
      for (const { regex, replacement } of replacements) {
        content = content.replace(regex, replacement);
      }
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

for (const dir of directories) {
  processDirectory(dir);
}
console.log('Refactoring complete.');
