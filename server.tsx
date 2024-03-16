import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import { createServer as createViteServer } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function createServer() {
  const app = express();

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom'
  });

  app.use(vite.middlewares);

  app.use(express.static('public'));

  app.use('*', async (req, res) => {
    const url = req.originalUrl;

    let template = fs.readFileSync(
      path.resolve(__dirname, 'index.html'),
      'utf-8'
    );

    template = await vite.transformIndexHtml(url, template);

    const { render } = await vite.ssrLoadModule('/src/entry-server.tsx');

    const appHtml = await render(req, res);

    const html = template.replace(`<!--ssr-outlet-->`, appHtml);

    res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
  });

  app.listen(5173, () => {
    console.log('server on 5173');
  });
}

createServer();
