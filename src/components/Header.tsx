import React, { useState } from 'react';
import { Appbar, Menu } from 'react-native-paper';

const Header = ({ title }: { title: string }) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  return (
    <Appbar.Header style={{ marginTop: -30 }}>
      <Menu
        visible={menuVisible}
        onDismiss={closeMenu}
        anchor={
          <Appbar.Action icon="menu" color="grey" onPress={openMenu} />
        }
      >
        <Menu.Item onPress={() => { console.log('Product Management'); closeMenu(); }} title="Product Management" />
      </Menu>
      <Appbar.Content title={title} />
      <Appbar.Action icon="account" onPress={() => { console.log('Profile'); }} />
    </Appbar.Header>
  );
};

export default Header;

