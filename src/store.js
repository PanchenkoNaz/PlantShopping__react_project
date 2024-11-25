import { configureStore } from '@reduxjs/toolkit'; // Імпортуємо функцію для створення Store
import cartReducer from './CartSlice'; // Імпортуємо редюсер із CartSlice

// Конфігуруємо Store
const store = configureStore({
  reducer: {
    cart: cartReducer, // Додаємо редюсер для обробки стану кошика
  },
});

// Експортуємо Store для використання у всьому додатку
export default store;
