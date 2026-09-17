const fs = require('fs');
const path = require('path');

const enPath = 'c:/almoatamer-dashboard/messages/en.json';
const arPath = 'c:/almoatamer-dashboard/messages/ar.json';
const featuresDir = 'c:/almoatamer-dashboard/features';

const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const ar = JSON.parse(fs.readFileSync(arPath, 'utf8'));

// Regex to capture tCommon('key', { fallback: 'value' })
const regex = /tCommon\([\s]*[\"']([\w_]+)[\"'][\s]*,[\s]*\{[\s]*fallback[\s]*:[\s]*[\"']([^\"']+)[\"'][\s]*\}[\s]*\)/g;

function scanFiles(dir) {
    let results = [];
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            results = results.concat(scanFiles(fullPath));
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            const content = fs.readFileSync(fullPath, 'utf8');
            let match;
            while ((match = regex.exec(content)) !== null) {
                results.push({ key: match[1], fallback: match[2] });
            }
        }
    }
    return results;
}

const extracted = scanFiles(featuresDir);
let added = 0;

extracted.forEach(item => {
    if (!en.Common[item.key]) {
        const isArabic = /[\u0600-\u06FF]/.test(item.fallback);
        en.Common[item.key] = isArabic ? item.key.replace(/_/g, ' ') : item.fallback;
        added++;
    }
    if (!ar.Common[item.key]) {
        ar.Common[item.key] = item.fallback;
    }
});

fs.writeFileSync(enPath, JSON.stringify(en, null, 2));
fs.writeFileSync(arPath, JSON.stringify(ar, null, 2));
console.log('Added ' + added + ' missing keys to Common in en.json and ar.json based on grep search.');
