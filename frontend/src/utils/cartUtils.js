const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state, item, qty) => {
  let price;
  if (item) {
    const existItem = state.cardItems.find((i) => i._id === item._id);
    const index = state.cardItems.indexOf(existItem);
    state.cardItems[index] = { ...item, qty };
    // state.qty = qty;
    // item["qty"] = state.qty;
    // console.log(item);
    // calc item price
    price = addDecimals(
      state.cardItems.reduce((acc, item) => {
        return acc + item.price * qty;
      }, 0)
    );
    state.itemsPrice = price;
    state.totalPrice = Number(price).toFixed(2);
  }

  localStorage.setItem("cart", JSON.stringify(state));
};
