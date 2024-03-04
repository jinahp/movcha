import { app } from './config';
import { createProxyMiddleware } from 'http-proxy-middleware';

const port = 5000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.use(
  createProxyMiddleware('/', {
    changeOrigin: true,
    target: 'http://localhost:5173',
  }),
);
