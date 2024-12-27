import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { GetFavList, UpdateFav } from "@/Shared/Shared";
import { useUser } from "@clerk/clerk-expo";

const MarkFav = ({ pet, color = "black" }) => {
  const [favList, setFavList] = useState();

  const user = {
    primaryEmailAddress: {
      emailAddress: "lalit@gmailcom",
    },
  };

  useEffect(() => {
    user && GetFav();
  }, [user]);

  const GetFav = async () => {
    const result = await GetFavList(user);
    setFavList(result?.favorites ? result?.favorites : []);
  };

  const AddToFav = async () => {
    const fav = favList;
    fav.push(pet?.id);
    await UpdateFav(user, fav);
    GetFav();
  };

  const RemoveFromFav = async () => {
    const favResult = favList.filter((item) => item !== pet.id);
    await UpdateFav(user, favResult);
    GetFav();
  };

  return (
    <View>
      {favList?.includes(pet.id) ? (
        <Pressable onPress={RemoveFromFav}>
          <Ionicons name="heart" size={30} color={"red"} />
        </Pressable>
      ) : (
        <Pressable onPress={() => AddToFav()}>
          <Ionicons name="heart-outline" size={30} color={color} />
        </Pressable>
      )}
    </View>
  );
};

export default MarkFav;
