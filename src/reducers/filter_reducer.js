import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
    };
  }
  if (action.type === CLEAR_FILTERS) {
    return { ...state, filtered_products: [...state.all_products] };
  }
  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true };
  }
  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false };
  }
  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload };
  }
  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products: products } = state;
    let tempProducts = [];
    switch (sort) {
      case "price-lowest":
        tempProducts = products.sort((a, b) => a.price - b.price);
        break;
      case "price-highest":
        tempProducts = products.sort((a, b) => b.price - a.price);
        break;
      case "name-a":
        tempProducts = products.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-z":
        tempProducts = products.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        tempProducts = [...products];
    }
    return { ...state, filtered_products: tempProducts };
  }
  if (action.type === UPDATE_FILTERS) {
    return { ...state };
  }
  if (action.type === FILTER_PRODUCTS) {
    return { ...state };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
