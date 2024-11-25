import { useDispatch, useSelector } from 'react-redux';
import { updateQuantity, removeItem } from './CartSlice'; // Імпорт Redux дій
import PropTypes from 'prop-types'; // Для перевірки пропсів
import './CartItem.css'; // Імпорт стилів

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items); // Отримання елементів кошика з Redux store

  // Функція збільшення кількості
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  // Функція зменшення кількості
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem({ id: item.id })); // Видалення товару, якщо кількість стає 0
    }
  };

  // Видалення товару з кошика
  const handleRemove = (item) => {
    dispatch(removeItem({ id: item.id }));
  };

  // Розрахунок загальної вартості
  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.quantity * parseFloat(item.cost.slice(1)), 0);

  return (
    <div>
      <h1>Your Cart</h1>
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
              <h3>{item.name}</h3>
              <p>Price: {item.cost}</p>
              <p>Subtotal: ${(item.quantity * parseFloat(item.cost.slice(1))).toFixed(2)}</p>
            </div>
            <div className="cart-item-actions">
              <button onClick={() => handleDecrement(item)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => handleIncrement(item)}>+</button>
              <button onClick={() => handleRemove(item)}>Remove</button>
            </div>
          </div>
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}
      <div className="cart-summary">
        <h3>Total: ${calculateTotal().toFixed(2)}</h3>
        <button onClick={onContinueShopping}>Continue Shopping</button>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  onContinueShopping: PropTypes.func.isRequired, // Перевірка типу пропса
};

export default CartItem;
