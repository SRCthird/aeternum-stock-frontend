import ProductLotList from "./Components/ProductLotList";
import { mode } from "@utils/types";
import { ProductLot } from "./Hooks/useProductLot";

type Props = {
  setMode: (mode: mode) => void;
  setItem: (item: ProductLot) => void;
}

const ProductListView = ({ setMode, setItem }: Props) => {
  return (
    <ProductLotList
      setMode={setMode}
      setItem={setItem}
    />
  );
}

export default ProductListView;

