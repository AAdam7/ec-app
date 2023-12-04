import { searchProducts } from "./api";

import styles from './styles/main.module.scss';

import { ProductListItem } from "./components/ProductListItem"
import { Header } from "./components/Header";

function App() {
	
  return (
    <div class={styles.App}>
			<ProductListItem />
    </div>
  );
}

export default App;
