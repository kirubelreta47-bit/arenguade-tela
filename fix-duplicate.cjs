const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const splitTerm = '    // Spin Wheel Canvas Logic';
const parts = content.split(splitTerm);

// If it's duplicated, there will be > 2 parts. 
// We want to keep before the first, the first instance itself, up to the end of the first instance, 
// and then from // Forms & Modals.
// Actually, let's just find the first "// Spin Wheel Canvas Logic" and keep up to its end, 
// which is before the second "// Spin Wheel Canvas Logic".

if (parts.length > 2) {
    // We have duplicates.
    // parts[0] is everything before first '// Spin Wheel Canvas Logic'
    // parts[1] is the first instance's code (up to the second '// Spin Wheel...').
    // parts[2] is the second instance's code.
    
    // We can just keep parts[0] + splitTerm + parts[1] and then we need to check what comes after parts[2].
    // Wait, parts[2] might contain // Forms & Modals
    
    // Let's just remove parts[1] completely, and keep parts[2]!
    // Or rather, just replace the exact duplicate string.
}

// Safer approach: 
// Just replace the block from the second '// Spin Wheel Canvas Logic' to right before '// Forms & Modals'
const regex = /    \/\/ Spin Wheel Canvas Logic[\s\S]*?    \/\/ Spin Wheel Canvas Logic/g;
content = content.replace(regex, '    // Spin Wheel Canvas Logic');

fs.writeFileSync('index.html', content);
console.log("Fixed duplicates.");
