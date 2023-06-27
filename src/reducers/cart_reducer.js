import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    console.log(action.payload);
    const { id, color, amount, product } = action.payload;
    //check if item is already in cart
    const tempItem = state.cart.find((i) => i.id === id + color);
    if (tempItem) {
      const tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === id + color) {
          const newAmount =
            cartItem.amount + amount > cartItem.max
              ? cartItem.max
              : cartItem.amount + amount;
          return { ...cartItem, amount: newAmount };
        } else {
          return cartItem;
        }
      });
      return { ...state, cart: tempCart };
    } else {
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount: amount > product.stock ? product.stock : amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock,
      };
      return { ...state, cart: [...state.cart, newItem] };
    }
    //add some notification if amount is bigger than stock
    //Sorry, at the moment only {max} items are in stock.
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
