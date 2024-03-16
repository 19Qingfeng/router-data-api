import { startTransition } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from './config/routes';

function boot() {
  const router = createBrowserRouter(routes);

  // 增加客户端 Router 代码
  startTransition(() => {
    hydrateRoot(
      document.getElementById('root')!,
      <RouterProvider router={router}></RouterProvider>
    );
  });
}

boot();
