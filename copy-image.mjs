import fs from 'fs';
import path from 'path';

const src = path.join(process.env.HOME, '.gemini', 'antigravity', 'brain', 'f437d0f6-156f-457d-9fbd-5ed7f9b7ef4c', 'hero_mockup_1777214642212.png');
const dest = path.join(process.cwd(), 'public', 'hero-mockup.png');

fs.copyFileSync(src, dest);
console.log('Copied successfully');
