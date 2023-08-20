import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
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
  if(action.type === CLEAR_CART) {
    return {...state, cart: []}
  };
  if(action.type === REMOVE_CART_ITEM) {
    const {id} = action.payload;
    const newCart = [...state.cart].filter(item => item.id !== id)
    return {...state, cart: newCart}
  }
  if(action.type === TOGGLE_CART_ITEM_AMOUNT){
    const {id, value: amount} = action.payload;
    const tempItem = state.cart.find((i) => i.id === id);
    if (tempItem) {
      const tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === id) {
          const newAmount =
            cartItem.amount + amount > cartItem.max
              ? cartItem.max
              : cartItem.amount + amount <= 0 ?
                1 
                : cartItem.amount + amount;
          return { ...cartItem, amount: newAmount };
        } else {
          return cartItem;
        }
      });
      return { ...state, cart: tempCart };
    }
    return {...state};
  }
  if(action.type === COUNT_CART_TOTALS) {
    const {total_amount, total_items} = state.cart.reduce((total, cartItem) =>{
      total.total_amount += cartItem.amount * cartItem.price;
      total.total_items += cartItem.amount;
      return total;
    },{total_amount:0,total_items:0})
    return {...state, total_amount, total_items}
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
