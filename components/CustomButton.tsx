import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import cn from "clsx";

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  style?: string;
  leftIcon?: React.ReactNode;
  textStyle?: string;
  loading?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title = "Click me",
  onPress,
  style = '',
  leftIcon,
  textStyle = '',
  loading = false,
}) => {
  return (
    <TouchableOpacity
      className={cn('custom-btn', style)}
      onPress={onPress}
      disabled={loading}
    >
      {leftIcon}
      <View className="flex-row flex-center">
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text className={cn('text-white-100 paragraph-semibold', textStyle)}>
            {title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;