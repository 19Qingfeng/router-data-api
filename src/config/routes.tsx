import { json } from 'react-router-dom';
import App from '../pages/App';

const routes = [
  {
    path: '/',
    loader() {
      return json({ data: 'Welcome to React Router!' });
    },
    Component: App
  }
];

export default routes;
