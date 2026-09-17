const fs = require('fs');
const path = require('path');

const badImportStr1 = `\nimport { PageContainer } from "@/components/layout/PageContainer";`;
const badImportStr2 = `import { PageContainer } from "@/components/layout/PageContainer";\n\n`;

function fixFile(filePath) {
    if (!filePath.endsWith('.tsx')) return;

    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Find if the bad import string is mangled inside another import
    // Look for: import { PageContainer } from "@/components/layout/PageContainer"; inside a line that also has other text
    
    // Simplest approach: just remove the PageContainer import completely, and then re-add it cleanly at the top.
    
    let newContent = content;
    const importRegex = /import\s+\{\s*PageContainer\s*\}\s+from\s+["']@\/components\/layout\/PageContainer["'];?\n?/g;
    
    if (importRegex.test(newContent)) {
        newContent = newContent.replace(importRegex, '');
    }
    
    // Wait, the previous script injected it literally as:
    // \nimport { PageContainer } from "@/components/layout/PageContainer";
    // If it was injected in the middle of a string: `import { PermissionGuard } from '\nimport { PageContainer } from "@/components/layout/PageContainer";@/components/permissions-provider';`
    
    // We should specifically look for exactly that insertion:
    const injectedText = '\nimport { PageContainer } from "@/components/layout/PageContainer";';
    const injectedText2 = 'import { PageContainer } from "@/components/layout/PageContainer";\n\n';
    
    if (content.includes(injectedText)) {
        newContent = content.replace(injectedText, '');
        // prepend cleanly
        newContent = 'import { PageContainer } from "@/components/layout/PageContainer";\n' + newContent;
        modified = true;
    } else if (content.includes(injectedText2)) {
        // It was inserted at the top successfully
    }

    if (modified) {
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`Fixed ${filePath}`);
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
            fixFile(fullPath);
        }
    }
}

const appDir = path.join(__dirname, 'app');
console.log('Fixing imports...');
traverseDir(appDir);
console.log('Done!');
