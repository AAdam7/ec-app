import { TiTick } from "solid-icons/ti";

export const appText = {
  freeDelivery: "FREE UK delivery",
  payPalCredit: "PayPal credit available",
  eclipseRecommended: "Eclipse recommended",
  loading: "Loading...",
  reviews: "Reviews",
  addToBasket: "ADD TO BASKET",
};

export const ContentTestDescription = ({ styles }) => {
  return (
    <ul class={styles.listTick}>
      <li>
        <TiTick size={24} color="#000000" /> Self-lit pixels
      </li>
      <li>
        <TiTick size={24} color="#000000" /> a7 Gen3 Intelligent Processor 4K
      </li>
      <li>
        <TiTick size={24} color="#000000" />
        Transform your TV into a central hub with ThinQ AI
      </li>
      <li>
        <TiTick size={24} color="#000000" />
        Dolby Vision IQ & Dolny Atmos
      </li>
      <li>
        <TiTick size={24} color="#000000" />2 years warranty
      </li>
    </ul>
  );
};
