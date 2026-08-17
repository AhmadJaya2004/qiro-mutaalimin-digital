import fs from 'fs';
import path from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Tiny valid mp3 base64 (silent, very short)
const silentMp3Base64 = "SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjYwLjE2LjEwMAAAAAAAAAAAAAAA//OEAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAAEAAABIQAODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4OQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcH////////////////////////////////////8AAAAATGF2YzYwLjMxLjEwMgAAAAAAAAAAAAAAACQAAAAAAAAAASGsAAAAAAAAAAAA//MUxAAAAANIADQAAAAAAANABgAAAAAAfL9/v/+T3wABH6X+c+QAAX//MkxAoAAAJIADQAAAAAAANABgAAAAAAeF6/3/////p8AAAEf//M0xCYAAAKKADQAAAAAAANABgAAAAAAP8v//8/s+HwAAH//MUxDkAAAJyADQAAAAAAANABgAAAAAAO//v/8/t8fAAAD//MUxEUAAAJ+ADQAAAAAAANABgAAAAAANv/5///x8vAAAG";

const buffer = Buffer.from(silentMp3Base64, 'base64');

const filesToCreate = [
    'static/audio/taawwudz.mp3',
    'static/audio/basmalah.mp3',
    'static/audio/al-anfal/01.mp3',
    'static/audio/al-anfal/02.mp3',
    'static/audio/al-anfal/03.mp3',
    'static/audio/al-anfal/04.mp3',
    'static/audio/al-anfal/05.mp3'
];

import fsNative from 'fs';
import pathNative from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = pathNative.join(__dirname, '..');

for (const file of filesToCreate) {
    const fullPath = pathNative.join(projectRoot, file);
    const dir = pathNative.dirname(fullPath);
    
    if (!fsNative.existsSync(dir)) {
        fsNative.mkdirSync(dir, { recursive: true });
    }
    
    fsNative.writeFileSync(fullPath, buffer);
    console.log(`Created: ${file}`);
}

console.log('All placeholder audio files generated successfully.');
