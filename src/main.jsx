import { createRoot } from 'react-dom/client'; // Імпорт createRoot
import { Provider } from 'react-redux'; // Імпорт Provider для Redux
import store from './store'; // Імпорт Redux Store
import App from './App'; // Головний компонент вашого додатку

// Знаходимо root-елемент у DOM
const container = document.getElementById('root');
const root = createRoot(container); // Створюємо React root

// Рендеримо додаток, обгорнутий в Redux Provider
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
