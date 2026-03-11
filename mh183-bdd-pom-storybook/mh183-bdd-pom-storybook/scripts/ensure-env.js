const fs = require('fs');
const path = require('path');

const envPath = path.join(process.cwd(), '.env');
const examplePath = path.join(process.cwd(), '.env.example');

if (!fs.existsSync(envPath)) {
  fs.copyFileSync(examplePath, envPath);
  console.log('Arquivo .env não encontrado. Um .env inicial foi criado a partir de .env.example.');
}
