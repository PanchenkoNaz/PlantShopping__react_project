import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice'; // Використовуються тільки ці функції
import PropTypes from 'prop-types'; // Додано для перевірки пропсів
import './CartItem.css';

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.quantity * parseFloat(item.cost.slice(1)), 0);

  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
  };

  const incrementQuantity = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const decrementQuantity = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem({ id: item.id }));
    }
  };

  const removeItemFromCart = (item) => {
    dispatch(removeItem({ id: item.id }));
  };

  return (
    <div>
      <h1>Your Cart</h1>
      <div>
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
                <button onClick={() => decrementQuantity(item)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => incrementQuantity(item)}>+</button>
                <button onClick={() => removeItemFromCart(item)}>Remove</button>
              </div>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
      <div className="cart-summary">
        <h3>Total: ${calculateTotal().toFixed(2)}</h3>
        <button onClick={handleCheckoutShopping}>Checkout</button>
        <button onClick={onContinueShopping}>Continue Shopping</button>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  onContinueShopping: PropTypes.func.isRequired, // Пропс перевіряється як функція
};

export default CartItem;
