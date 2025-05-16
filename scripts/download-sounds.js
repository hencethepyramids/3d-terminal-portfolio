const https = require('https');
const fs = require('fs');
const path = require('path');

const SOUNDS_DIR = path.join(__dirname, '../public/sounds');

// Create sounds directory if it doesn't exist
if (!fs.existsSync(SOUNDS_DIR)) {
  fs.mkdirSync(SOUNDS_DIR, { recursive: true });
}

// Sample sound URLs (replace these with actual URLs to free sound effects)
const sounds = {
  'mechanical-keydown.mp3': 'https://example.com/mechanical-keydown.mp3',
  'mechanical-keyup.mp3': 'https://example.com/mechanical-keyup.mp3',
  'soft-keydown.mp3': 'https://example.com/soft-keydown.mp3',
  'soft-keyup.mp3': 'https://example.com/soft-keyup.mp3',
  'retro-keydown.mp3': 'https://example.com/retro-keydown.mp3',
  'retro-keyup.mp3': 'https://example.com/retro-keyup.mp3',
};

function downloadFile(url, filename) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(path.join(SOUNDS_DIR, filename));
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${filename}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(path.join(SOUNDS_DIR, filename));
      reject(err);
    });
  });
}

async function downloadAllSounds() {
  for (const [filename, url] of Object.entries(sounds)) {
    try {
      await downloadFile(url, filename);
    } catch (error) {
      console.error(`Error downloading ${filename}:`, error);
    }
  }
}

downloadAllSounds(); 