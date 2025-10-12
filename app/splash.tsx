import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CustomSplashScreen() {
  return (
    <SafeAreaView className="flex-1 bg-primary items-center justify-center">
      <View className="items-center">

        <Text className="text-white text-4xl font-bold mb-4">
          🍔 Food App
        </Text>
        <Text className="text-white text-lg">
          Loading delicious food...
        </Text>
        <View className="mt-8">
          <Text className="text-white text-sm">
            ⏳ Please wait
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
