const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

function processFiles() {
  const dirs = ['./features', './components/ui', './components/dashboard'];
  
  dirs.forEach(dir => {
    if (fs.existsSync(dir)) {
      walkDir(dir, (filePath) => {
        if (filePath.endsWith('.tsx')) {
          let content = fs.readFileSync(filePath, 'utf-8');
          let modified = false;

          // Replace various container strings with panel-glass
          // These are common patterns found in the grep
          const replacements = [
            {
              regex: /rounded-2xl border border-white\/10 bg-surface\/40 backdrop-blur-xl/g,
              replacement: 'panel-glass'
            },
            {
              regex: /bg-surface\/50 border border-white\/10 rounded-xl backdrop-blur-md/g,
              replacement: 'panel-glass'
            },
            {
              regex: /rounded-xl border border-white\/10 bg-surface\/50 text-foreground shadow-sm backdrop-blur-md/g,
              replacement: 'panel-glass'
            },
            {
              regex: /bg-surface\/50 border border-white\/10 p-5 rounded-2xl backdrop-blur-sm/g,
              replacement: 'panel-glass p-5'
            },
            {
              regex: /bg-surface\/90 backdrop-blur-xl border border-white\/10 rounded-2xl/g,
              replacement: 'panel-glass'
            },
            {
              regex: /bg-surface\/50 border border-white\/10/g,
              replacement: 'panel-glass'
            },
            {
              regex: /bg-surface border border-white\/5 rounded-xl/g,
              replacement: 'panel-solid'
            },
            {
              regex: /rounded-xl bg-surface border border-white\/5/g,
              replacement: 'panel-solid'
            },
            {
              regex: /bg-surface border border-white\/10 rounded-xl/g,
              replacement: 'panel-solid'
            }
          ];

          replacements.forEach(({ regex, replacement }) => {
            if (regex.test(content)) {
              content = content.replace(regex, replacement);
              modified = true;
            }
          });

          if (modified) {
            fs.writeFileSync(filePath, content, 'utf-8');
            console.log(`Updated: ${filePath}`);
          }
        }
      });
    }
  });
}

processFiles();
