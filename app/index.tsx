import { images, offers, type Offer } from "@/constants";
import clsx from "clsx";
import { Fragment } from "react";
import { FlatList, Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Never wrap a virtulaised component (FlatList, SectionList, etc.) inside a plain ScrollView. */}
      <FlatList
        data={offers}
        keyExtractor={(item: Offer) => item.id.toString()}
        renderItem={({ item, index }: { item: Offer, index: number }) => {
          const isEven = index % 2 === 0;
          return <View>
            <Pressable
              className={clsx("offer-card", isEven ? "flex-row-reverse" : "flex-row")}
              style={{ backgroundColor: item.color }}
              android_ripple={{ color: "#fffff22" }}
            >
              {({ pressed }) => (
                <Fragment>
                  <View className={"h-full w-1/2"}>
                    <Image source={item.image} className="size-full" resizeMode="contain" />
                  </View>
                  <View className={clsx("offer-card__info", isEven ? "pl-10" : "pr-10")}>
                    <Text className={"h1-bold text-white leading-tight"}>{item.title}</Text>
                    <Image
                      source={images.arrowRight}
                      className="size-10"
                      resizeMode="contain"
                      tintColor="#ffffff"
                    />
                  </View>
                </Fragment>
              )}
            </Pressable>
          </View>
        }}
        contentContainerClassName="pb-28 px-5"
        ListHeaderComponent={() => {
          return (
          <View className={"flex-between flex-row w-full my-5"}>

            <View className={"flex-start"}>
              <Text className={"small-bold text-primary"}>DELIVER TO</Text>
              <TouchableOpacity className={"flex-center flex-row gap-x-1 mt-0.5"}>
                <Text className={"paragraph-bold text-dark-100"}>Bangalore</Text>
                <Image source={images.arrowDown} className="size-3" resizeMode="contain" />
              </TouchableOpacity>
            </View>

            <Text>Cart</Text>
          </View>)
        }}
      />
    </SafeAreaView>
  );
}
