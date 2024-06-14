import { useTheme } from '@src/context/ThemeContext';
import { useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, TouchableWithoutFeedback, Modal, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

type Props = {
  label: string;
  items: string[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  onSubmitEditing?: () => void;
  placeholder?: string;
};

const SearchableDropDown = ({ label, items, selectedValue, onValueChange, onSubmitEditing, placeholder }: Props) => {
  const styles = useTheme();
  const [filter, setFilter] = useState(selectedValue);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    setFilter(selectedValue);
  }, [selectedValue]);

  useEffect(() => {
    if (showDropdown) {
      inputRef.current?.focus();
    }
  }, [showDropdown]);

  const filteredItems = items.filter(item =>
    item.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <View
      style={{ width: '100%' }}
    >
      <TextInput
        label={label}
        value={filter}
        onFocus={() => setShowDropdown(true)}
        placeholder={placeholder || 'Tap to search...'}
        style={styles.input}
        textColor={styles.input_text.color}
        underlineColor="transparent"
        activeOutlineColor={styles.accents.color}
        mode="outlined"
        editable={!showDropdown}
      />
      <Modal
        visible={showDropdown}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDropdown(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowDropdown(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.dropdown}>
          <TextInput
            ref={inputRef}
            value={filter}
            style={styles.input}
            textColor={styles.input_text.color}
            onChangeText={setFilter}
            onSubmitEditing={() => {
              if (filteredItems.length > 0) {
                onValueChange(filteredItems[0]);
                setFilter(filteredItems[0]);
                setShowDropdown(false);
              }
              onSubmitEditing?.();
            }}
            autoFocus={true}
            activeOutlineColor={styles.accents.color}
            mode="outlined"
          />
          <View style={{ height: 30 }} />
          <FlatList
            style={{
              maxWidth: '100%',
              borderRadius: 4,
            }}
            data={filteredItems}
            keyExtractor={item => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => {
                  onValueChange(item);
                  setFilter(item);
                  setShowDropdown(false);
                }}
              >
                <Text style={styles.itemText}>{item}</Text>
              </TouchableOpacity>
            )}
            keyboardShouldPersistTaps="handled"
          />
        </View>
      </Modal>
    </View>
  );
};

export default SearchableDropDown;
