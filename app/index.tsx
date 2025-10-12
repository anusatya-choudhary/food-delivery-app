import { offers, type Offer } from "@/constants";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <FlatList
        data={offers}
        keyExtractor={(item: Offer) => item.id.toString()}
        renderItem={( {item} : { item: Offer }) => {
          return <View>
            <Pressable className="bg-amber-600">
              <Text>{item.title}</Text>
            </Pressable>
          </View>
        }}
      />
    </SafeAreaView>
  );
}
