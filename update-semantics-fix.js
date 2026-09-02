import fs from 'fs';

let content = fs.readFileSync('src/components/ServiceDirectory.tsx', 'utf8');

// Undo bad replace if needed, or just redo it correctly.
// Let's just restore the file from git if possible, or manually fix it.
