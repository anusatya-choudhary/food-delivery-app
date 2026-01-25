import React, { useState } from "react";
import { View, Text, TextInput, TextInputProps } from "react-native";
import cn from "clsx";

interface CustomInputProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  label: string;
  secureTextEntry?: boolean;
  keyboardType?: TextInputProps['keyboardType'];
}

const CustomInput: React.FC<CustomInputProps> = ({
  placeholder = 'Enter text',
  value,
  onChangeText,
  label,
  secureTextEntry = false,
  keyboardType = 'default',
}) => {
  const [isFocused, setIsFocused] = useState(false)
  return (
    <View className="w-full">
      <Text className="label"> {label} </Text>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        value={value}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        placeholderTextColor="#888"
        className={cn('input', isFocused ? 'border-primary' : 'border-gray-300')}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default CustomInput;