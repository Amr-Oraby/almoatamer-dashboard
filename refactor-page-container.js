const fs = require('fs');
const path = require('path');

const targetStr = '<div className="flex flex-col gap-6 p-6">';
const replaceStr = '<PageContainer>';
const importStr = 'import { PageContainer } from "@/components/layout/PageContainer";';

function processFile(filePath) {
    if (!filePath.endsWith('.tsx')) return;

    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if the target div exists
    if (!content.includes(targetStr)) {
        return;
    }

    // Step 1: Add import if it doesn't exist
    if (!content.includes('import { PageContainer }')) {
        // Find the last import statement
        const importRegex = /^import\s+.*?['"];?/gm;
        let match;
        let lastImportIndex = 0;
        
        while ((match = importRegex.exec(content)) !== null) {
            lastImportIndex = match.index + match[0].length;
        }

        if (lastImportIndex > 0) {
            content = content.slice(0, lastImportIndex) + '\n' + importStr + content.slice(lastImportIndex);
        } else {
            // No imports found, add to top
            content = importStr + '\n\n' + content;
        }
    }

    // Step 2: Replace opening tag and corresponding closing tag
    // Since we're using React, we can count the depth of the div to find the exact closing tag.
    // However, a simple regex or string replacement might be tricky. Let's build a small parser.
    let index = 0;
    let modified = false;

    while ((index = content.indexOf(targetStr, index)) !== -1) {
        // Find the corresponding closing tag
        let depth = 1;
        let i = index + targetStr.length;
        let closingIndex = -1;

        while (i < content.length) {
            if (content.startsWith('<div', i)) {
                depth++;
            } else if (content.startsWith('</div', i)) {
                depth--;
                if (depth === 0) {
                    closingIndex = i;
                    break;
                }
            }
            i++;
        }

        if (closingIndex !== -1) {
            // Replace opening and closing tags
            content = content.slice(0, closingIndex) + '</PageContainer>' + content.slice(closingIndex + 6);
            content = content.slice(0, index) + replaceStr + content.slice(index + targetStr.length);
            modified = true;
            index = index + replaceStr.length; // move past the replaced opening tag
        } else {
            console.log(`Could not find closing tag for div in ${filePath}`);
            index += targetStr.length;
        }
    }

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${filePath}`);
    }
}

function traverseDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            traverseDir(fullPath);
        } else {
            processFile(fullPath);
        }
    }
}

const appDir = path.join(__dirname, 'app');
console.log('Starting refactor...');
traverseDir(appDir);
console.log('Done!');
