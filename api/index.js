import fs from 'node:fs/promises';
import path from 'node:path';

const projectCwd = process.cwd();
const { default: workerEntry } = await import('../dist/server/index.js');

const contentTypeMap = {
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.css': 'text/css',
  '.html': 'text/html; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.json': 'application/json',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
};

function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return contentTypeMap[ext] || 'application/octet-stream';
}

function getRequestUrl(req) {
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers.host || 'localhost';
  return new URL(req.url, `${protocol}://${host}`);
}

async function serveAsset(url, res) {
  const assetPath = path.join(projectCwd, 'dist', 'client', url.pathname.slice(1));
  try {
    const data = await fs.readFile(assetPath);
    res.statusCode = 200;
    res.setHeader('Content-Type', getContentType(assetPath));
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    res.end(data);
    return true;
  } catch (error) {
    return false;
  }
}

export default async function handler(req, res) {
  const url = getRequestUrl(req);

  if (url.pathname.startsWith('/assets/')) {
    const served = await serveAsset(url, res);
    if (served) return;
  }

  const requestHeaders = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (value === undefined) continue;
    if (Array.isArray(value)) {
      value.forEach((item) => requestHeaders.append(key, item));
    } else {
      requestHeaders.set(key, value);
    }
  }

  const request = new Request(url.toString(), {
    method: req.method,
    headers: requestHeaders,
    body: ['GET', 'HEAD'].includes(req.method) ? undefined : req,
  });

  const response = await workerEntry.fetch(request);

  res.statusCode = response.status;
  response.headers.forEach((value, key) => {
    if (key.toLowerCase() === 'content-length') return;
    res.setHeader(key, value);
  });

  if (response.body) {
    const body = await response.arrayBuffer();
    res.end(Buffer.from(body));
  } else {
    res.end();
  }
}
