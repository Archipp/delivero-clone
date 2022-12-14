import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import {selectRestaurant} from "../features/restaurantSlice";
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectBasketItems, removeFromBasket, selectBasketTotal} from '../features/basketSlice';
import * as Icons from "react-native-heroicons/solid";
import { urlFor } from '../sanity';
import Currency from "react-currency-formatter";

const BasketScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const dispatch = useDispatch();
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
  const basketTotal = useSelector(selectBasketTotal)

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[items.id] = results[items.id] || []).push(item);
      return results;
    }, {});

    setGroupedItemsInBasket(groupedItems);
  }, [items]);

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#a6dcd7] bg-white shadow-xs">
          <View>
            <Text className="text-lg font-bold text-center">Basket</Text>
            <Text className="text-center text-gray-400">
              {restaurant.title}
            </Text>
          </View>

          <TouchableOpacity
          onPress={navigation.goBack}
          className="rounded-full bg-gray-100 absolute top-3 right-5"
          >
            <Icons.XCircleIcon color="#00CCBB" height={50} width={50}/>
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
          <Image 
            source={{
              uri:"https://links.papareact.com/wru",
            }}
            className="h-7 w-7 bg-gray-300 p-4 rounded-full"
          />
          <Text className="flex-1">Deliver in 50-75 min</Text>
        <TouchableOpacity>
          <Text className="text-[#00CCBB]">change</Text>
        </TouchableOpacity>
        </View>

        <ScrollView className="divide-y divide-gray-200">
            {Object.entries(groupedItemsInBasket).map(([keys, items]) => (
             <View 
             key={keys}
             className="flex-row items-center space-x-3 bg-white py-2 px-5"
             >
              <Text className="text-[#00CCBB]">{items.length} x</Text>
              <Image 
               source={{ uri:urlFor(items[0]?.image).url() }}
               className="h-12 w-12 rounded-full"
              />
             <Text className="flex-1">{items[0]?.name}</Text>
             <Text>
              <Currency quantity={items[0]?.price} currency="GBP"/>
             </Text>

             <TouchableOpacity>
              <Text
                className="text-[#00CCBB] text-ls"
                onPress={()=>dispatch(removeFromBasket({id: items[0]?.id}))}
              >
                  Remove
              </Text>
             </TouchableOpacity>
           </View>
            ))}
        </ScrollView>

        <View className="p-5 bg-white mt-5 space-y-4">
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Subtotal</Text>
            <Text className="text-gray-400">
              <Currency quantity={basketTotal} currency="GBP"/>
            </Text>
          </View>
        

        <View className="flex-row justify-between">
            <Text className="text-gray-400">Delivery fee</Text>
            <Text className="text-gray-400">
              <Currency quantity={5.99} currency="GBP"/>
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text>Order Total</Text>
            <Text className="font-extrabold">
              <Currency quantity={basketTotal + 5.99} currency="GBP"/>
            </Text>
          </View>

              <TouchableOpacity 
              className="rounded-lg bg-[#00CCBB] p-4"
              onPress={() => navigation.navigate("PreparingOrderScreen")}
              >
                <Text className="text-center text-white text-lg font-bold">
                  Place Order
                </Text>
              </TouchableOpacity>

          </View>
      </View>
    </SafeAreaView>
  )
}

export default BasketScreen