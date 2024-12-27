import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { GetFavList } from "@/Shared/Shared";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";
import PetListItem from "@/components/Home/PetListItem";

const Favorite = () => {
  const [fav, setFav] = useState([]);
  const [favPetList, setFavPetList] = useState([]);
  const [loader, setLoader] = useState(false);

  const user = {
    primaryEmailAddress: {
      emailAddress: "lalit@gmailcom",
    },
  };

  useEffect(() => {
    user && GetFav();
  }, []);

  const GetFav = async () => {
    setLoader(true);
    const result = await GetFavList(user);
    setFav(result.favorites);
    setLoader(false);

    GetFavoritesList(result.favorites);
  };

  const GetFavoritesList = async (fav_) => {
    setLoader(true);
    setFavPetList([]);
    const q = query(collection(db, "Pets"), where("id", "in", fav_));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      setFavPetList((prev) => [...prev, doc.data()]);
    });
    setLoader(false);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontFamily: "outfit-medium", fontSize: 30 }}>
        Favorites
      </Text>

      <FlatList
        style={{ marginTop: 10 }}
        data={favPetList}
        onRefresh={GetFav}
        refreshing={loader}
        numColumns={2}
        renderItem={({ item }) => <PetListItem pet={item} />}
      />
    </View>
  );
};

export default Favorite;
