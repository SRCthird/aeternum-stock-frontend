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
  const [filter, setFilter] = useState(selectedValue);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    setFilter(selectedValue);
  }, [selectedValue]);

  useEffect(() => {
    console.log(items);
    if (showDropdown) {
      inputRef.current?.focus();
    }
  }, [showDropdown]);

  const filteredItems = items.filter(item =>
    item.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <View>
      <TextInput
        label={label}
        value={filter}
        onFocus={() => setShowDropdown(true)}
        placeholder={placeholder || 'Tap to search...'}
        style={{
          minWidth: '100%',
          maxWidth: '100%',
          margin: 10,
        }}
        underlineColor="transparent"
        activeOutlineColor="#6d6875"
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
            activeOutlineColor="#6d6875"
            mode="outlined"
          />
          <View style={{ height: 30 }} />
          <FlatList
            style={{
              maxWidth: '100%',
              backgroundColor: 'white',
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

const styles = StyleSheet.create({
  container: {
    minWidth: '100%',
    margin: 10
  },
  input: {
    fontSize: 16
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  dropdown: {
    position: 'absolute',
    top: 50,
    left: 10,
    right: 10,
    borderRadius: 4,
  },
  modalInput: {
    fontSize: 16
  },
  item: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#ddd'
  },
  itemText: {
    padding: 10
  }
});

export default SearchableDropDown;
