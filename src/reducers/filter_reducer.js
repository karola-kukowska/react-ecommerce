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
    let maxPrice = Math.max(...action.payload.map((item) => item.price));

    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      filters: {
        ...state.filters,
        max_price: maxPrice,
        price: maxPrice,
      },
    };
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
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: "",
        company: "all",
        category: "all",
        color: "all",
        price: state.filters.max_price,
        free_shipping: false,
      },
    };
  }
  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    return { ...state, filters: { ...state.filters, [name]: value } };
  }
  if (action.type === FILTER_PRODUCTS) {
    let tempProducts = [...state.all_products];
    const { text, company, category, color, max_price, price, free_shipping } =
      state.filters;

    if (free_shipping) {
      tempProducts = tempProducts.filter((item) => item.shipping);
    }
    if (company !== "all") {
      tempProducts = tempProducts.filter((item) => item.company === company);
    }
    if (category !== "all") {
      tempProducts = tempProducts.filter((item) => item.category === category);
    }
    if (text) {
      tempProducts = tempProducts.filter((item) =>
        item.name.toLowerCase().startsWith(text)
      );
    }
    if (color !== "all") {
      tempProducts = tempProducts.filter((item) => item.colors.includes(color));
    }
    if (max_price > price) {
      tempProducts = tempProducts.filter((item) => item.price <= price);
    }
    return { ...state, filtered_products: tempProducts };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
