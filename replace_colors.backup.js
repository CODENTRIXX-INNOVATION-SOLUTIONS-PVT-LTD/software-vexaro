const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.css')) results.push(file);
        }
    });
    return results;
}

const cssFiles = walk('./src/app');

cssFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Replace dark grays/blacks with ink
    content = content.replace(/#(1e293b|334155|475569|0f172a|111827|1f2937|374151|4b5563|000000|000)/gi, 'var(--color-ink)');
    
    // Replace light grays/whites backgrounds with paper
    content = content.replace(/#(f8fafc|f1f5f9|ffffff|fff|f9fafb|f3f4f6)/gi, 'var(--color-paper)');
    
    // Replace borders with ink with 10% opacity if we can't use line, but let's use ink
    // Actually the user said "these tokens only". I will map borders to var(--color-ink) but with opacity if possible, but standard is just replacing the hex.
    content = content.replace(/#(e2e8f0|cbd5e1|94a3b8|e5e7eb|d1d5db|9ca3af)/gi, 'var(--color-ink)'); 
    
    // Replace primary blues/indigos/purples with brand-blue
    content = content.replace(/#(2563eb|1d4ed8|1e40af|3b82f6|60a5fa|6366f1|4f46e5|4338ca|8b5cf6|7c3aed|6d28d9|10b981|059669|16a34a|15803d)/gi, 'var(--color-brand-blue)');
    
    // Replace oranges/reds/yellows with accent
    content = content.replace(/#(f59e0b|d97706|b45309|ef4444|dc2626|b91c1c|f97316|ea580c|c2410c|fcd34d|fef3c7|fffbeb)/gi, 'var(--color-accent)');
    
    // Also rgba/rgb colors if any. Let's just do a blanket hex replace for now.

    fs.writeFileSync(file, content, 'utf8');
});

console.log(`Updated ${cssFiles.length} files.`);
