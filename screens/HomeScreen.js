import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import * as Icons from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import sanityClient from "../sanity";
import restaurant from "../sanity/schemas/restaurant";
const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    sanityClient
      .fetch(
        `
        *[_type == "featured"]{
          ...,
        restaurants[]->{
        ...,
        dishes[]->
      }
  }
        `
      )
      .then((data) => {
        setFeaturedCategories(data);
      });
  }, []);

  return (
    <SafeAreaView className="bg-white pt-5">
      {/* En tete */}
      <View className="flex-row pb-3 items-center mx-1 space-x-2 px-4">
        <Image
          source={{
            uri: "https://links.papareact.com/wru",
          }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />

        <View className="flex-1">
          <Text className="font-bold text-gray-500 text-xs">
            Delivero now !
          </Text>
          <Text className="font-bold text-xl">
            Current Location
            <Icons.ChevronDownIcon size={20} color="#00CCBB" />
          </Text>
        </View>
        <Icons.UserIcon size={35} color="#00CCBB" />
      </View>

      {/* Barre de recherche */}

      <View className="flex-row items-center space-x-2 pb-2 mx-4 ">
        <View className="flex-row flex-1 space-x-1 bg-gray-200 p-3">
          <Icons.MagnifyingGlassIcon color="gray" size={20} />
          <TextInput
            placeholder="Restaurants et cuisines"
            keyboardType="default"
          />
        </View>
        <Icons.AdjustmentsVerticalIcon color="#00CCBB" />
      </View>

      {/* Body */}

      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Categories */}
        <Categories />

        {/* Features rows*/}
        {featuredCategories?.map((category) => (
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
