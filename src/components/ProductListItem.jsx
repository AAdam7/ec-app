import styles from "../styles/main.module.scss";
import { createSignal, onMount, createEffect } from "solid-js";
import { searchProducts } from "./../api";
import { apiDummyJSON } from "./../config/const";

import ProgressBar from "./../components/details/Progress-bar";
import CountdownTimer from "./../components/CountdownTimer";
import { AddToBasket } from "./../components/details/Buttons";
import { appText, ContentTestDescription } from "./details/content";

import { TiTick } from "solid-icons/ti";
import { AiFillStar } from "solid-icons/ai";

export function ProductListItem() {
  const [dataProducts, setDataProducts] = createSignal();
  const [targetTime, setTargetTime] = createSignal();

  onMount(async () => {
    setTargetTime(localStorage.getItem("targetTime"));
    loadData();
  });

  createEffect(() => {
    !targetTime() && loadData();
  });

  const loadData = async () => {
    const response = await searchProducts(apiDummyJSON);
    getRandomLimitedSortedItems(response.products);
    !targetTime() && setLocalStorage();
  };

  const setLocalStorage = () => {
    setTargetTime(new Date().getTime());
    targetTime() && localStorage.setItem("targetTime", targetTime());
  };

  const getRandomLimitedSortedItems = (productsList) => {
    if (targetTime()) {
      setDataProducts(JSON.parse(localStorage.getItem("data")));
    } else {
      const itemToRemove = "Apple";
      const fixedArray = [
        ...productsList
          .filter(function (item) {
            return item.brand !== itemToRemove;
          })
          .sort(() => Math.random() - 0.5)
          .slice(0, 10),
      ].sort((productA, productB) => productB.rating - productA.rating);
      setDataProducts(fixedArray);
      localStorage.setItem("data", JSON.stringify(fixedArray));
    }
  };

  const AddInfo = () => {
    return (
      <div class={styles.deliveryBox}>
        <ul>
          <CountdownTimer validTill={targetTime()} />
          <li class={styles.isMobile}>
            <TiTick size={24} color="#000000" />
            {appText.freeDelivery}
          </li>
          <li class={styles.isMobile}>
            <TiTick size={24} color="#000000" />
            {appText.payPalCredit}
          </li>
        </ul>
      </div>
    );
  };

  const handleDiscount = (e) => {
    let discount = e.price - (e.price * e.discountPercentage) / 100;
    return Math.round(discount);
  };

  const isRecommendedTag = (e) => {
    return e.rating > 4.5 ? true : false;
  };

  const addRecommendedTag = () => {
    return [
      styles.productListItemWrapper,
      styles.productListItemWrapperShadow,
    ].join(" ");
  };

  const isNormalStock = (e, someVar) => {
    return e.stock > 50
      ? someVar
        ? `${styles.normalStock}`
        : `${styles.text}`
      : `${styles.lowStock}`;
  };

  const PriceStatusBar = ({ product }) => {
    return (
      <div>
        <div class={styles.originalPrice}>
          <h3 style={`color:` + styles.rrp}>RRP £{product.price.toFixed(2)}</h3>
        </div>
        <div class={isRecommendedTag(product) && styles.low}>
          <h2>£{handleDiscount(product).toFixed(2)}</h2>
          {isRecommendedTag(product) && (
            <div class={styles.discountBox}>
              <p class={styles.low}>
                Save £{product.price - handleDiscount(product)}
              </p>
            </div>
          )}
        </div>
        <div class={styles.progressBarWrapper}>
          <ProgressBar
            bgcolor={isNormalStock(product, "pBar")}
            completed={product.stock}
          />
          <div
            class={styles.stockInfo}
            style={`color:` + isNormalStock(product)}
          >
            {product.stock > 50 ? "In stock" : "Last few left"}
          </div>
        </div>
      </div>
    );
  };

  const TitleReview = ({ product }) => {
    return (
      <div>
        <h1>
          <strong>{product.title}</strong>
        </h1>
        {/* <p>{product.description}</p> */}
        <div class={styles.stars}>
          <AiFillStar color="#F2C94C" size={24} />
          <AiFillStar color="#F2C94C" size={24} />
          <AiFillStar color="#F2C94C" size={24} />
          <AiFillStar color="#F2C94C" size={24} />
          <AiFillStar color="#F2C94C" size={24} />{" "}
          {Math.floor(Math.random() * 1000)} {appText.reviews}
        </div>
      </div>
    );
  };

  return (
    <For each={dataProducts()} fallback={<p>{appText.loading}</p>}>
      {(product) => (
        <div
          class={
            isRecommendedTag(product)
              ? addRecommendedTag()
              : styles.productListItemWrapper
          }
        >
          {product.rating > 4.5 && (
            <div class={styles.labelRecommended}>
              {appText.eclipseRecommended}
            </div>
          )}
          <div class={styles.productListItem}>
            <div class={styles.isDesktop}>
              <TitleReview product={product} />
            </div>
            <figure>
              <img src={product.images[0]} alt={product.title} />
            </figure>
          </div>
          <div class={styles.productListItem}>
            <div class={styles.isMobile}>
              <TitleReview product={product} />
            </div>
            <ContentTestDescription styles={styles} />
            {/* <div>BOTTOM ICONS</div> */}
          </div>
          <div class={styles.productListItem}>
            <PriceStatusBar product={product} />
            <AddInfo />
            <AddToBasket appText={appText} product={product} />
          </div>
        </div>
      )}
    </For>
  );
}
