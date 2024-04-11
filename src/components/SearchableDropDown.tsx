import { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

type Props = {
  label: string;
  items: string[];
  selectedValue: string;
  onValueChange: (value: string) => void;
};

const SearchableDropDown = ({ label, items, selectedValue, onValueChange }: Props) => {
  const [filter, setFilter] = useState(selectedValue);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    setFilter(selectedValue);
  }, [selectedValue]);

  const filteredItems = items.filter(item =>
    item.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <View
      style={{
        minWidth: '100%',
        margin: 10,
        backgroundColor: '#fffbfe',
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#6d6875',
      }}
    >
      <Text
        style={{
          position: 'absolute',
          backgroundColor: '#f2f2f2',
          top: -10,
          left: 10,
          paddingHorizontal: 5,
          fontSize: 12,
          color: '#6d6875',
        }}
      >
        {label}
      </Text>
      <TextInput
        value={filter}
        onChangeText={setFilter}
        onFocus={() => setShowDropdown(true)}
        style={{
          minWidth: '100%',
          borderRadius: 4,
          backgroundColor: 'transparent',
          padding: 10,
        }}
      />
      {showDropdown && (
        <FlatList
          data={filteredItems}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                width: '100%',
                borderBottomWidth: 1,
              }}
              
              onPress={() => {
                onValueChange(item);
                setFilter(item);
                setShowDropdown(false);
              }}
            >
              <Text style={{ padding: 10 }}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default SearchableDropDown;

