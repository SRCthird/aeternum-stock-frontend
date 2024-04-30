import React, { ReactNode, useRef, useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler, PanGestureHandlerGestureEvent, State } from 'react-native-gesture-handler';

type Props = {
  searchNode: ReactNode;
  finalHeight: number;
  headerNode: ReactNode;
  contentNode: ReactNode;
};

const HiddenTop = ({ searchNode, finalHeight, headerNode, contentNode }: Props) => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const searchBarHeight = useRef(new Animated.Value(0)).current;

  const onHandlerStateChange = (event: PanGestureHandlerGestureEvent) => {
    if (event.nativeEvent.state === State.END) {
      const finalTranslationY = event.nativeEvent.translationY;
      if (finalTranslationY > 10) {
        setShowSearchBar(true);
        Animated.timing(searchBarHeight, {
          toValue: finalHeight,
          duration: 300, 
          useNativeDriver: false
        }).start();
      } else if (finalTranslationY < -10) {
        Animated.timing(searchBarHeight, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false
        }).start(() => setShowSearchBar(false));
      }
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        {showSearchBar && (
          <Animated.View style={[styles.searchBar, { height: searchBarHeight }]}>
            {searchNode}
          </Animated.View>
        )}
        <PanGestureHandler onHandlerStateChange={onHandlerStateChange}>
        {headerNode}
        </PanGestureHandler>
        {contentNode}
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
});

export default HiddenTop;
