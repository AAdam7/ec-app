import { IoCartOutline } from "solid-icons/io";

export const AddToBasket = ({ appText, product }) => {
  // or props...
  return (
    <button
      onClick={(e) => console.log("ID: ", product.id, "PRICE: ", product.price)}
    >
      <IoCartOutline size={24} /> {appText.addToBasket}
    </button>
  );
};
