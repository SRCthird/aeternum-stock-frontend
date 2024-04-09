import { useState } from "react";
import ProductList from "./ProductList";
import { Appbar } from 'react-native-paper';

const ProductView = () => {
  const [key, setKey] = useState(0);

  return (
    <>
      <Appbar style={{
        height: 40,
        width: '100%',
      }}>
        <Appbar.Action icon="plus" onPress={() => { console.log('add'); }} />
        <Appbar.Content title="" />
        <Appbar.Action icon="refresh" onPress={() => {
          setKey(key + 1);
        }} />
      </Appbar>
      <ProductList key={key} />
    </>
  );
}

export default ProductView;

