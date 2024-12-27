import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import PetInfo from "@/components/PetDetails/PetInfo";
import PetSubInfo from "@/components/PetDetails/PetSubInfo";
import AboutPet from "@/components/PetDetails/AboutPet";
import OwnerInfo from "@/components/PetDetails/OwnerInfo";
import Colors from "@/constants/Colors";
import { collection, getDocs, query, setDoc, where } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";

const PetDetails = () => {
  const pet = useLocalSearchParams();
  const navigation = useNavigation();
  const router = useRouter();

  const user = {
    primaryEmailAddress: {
      emailAddress: "lalit@gmail.com",
    },
    imageUrl: "https://cdn-icons-png.flaticon.com/512/4042/4042171.png",
  };

  useEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: "",
    });
  }, []);

  const InitiateChat = async () => {
    const docId1 = user.primaryEmailAddress.emailAddress + "_" + pet?.email;
    const docId2 = pet?.email + "_" + user.primaryEmailAddress.emailAddress;

    const q = query(
      collection(db, "Chat"),
      where("id", "in", [docId1, docId2])
    );
    const querySnapShot = await getDocs(q);

    querySnapShot.forEach((doc) => {
      router.push({
        pathname: "/chat",
        params: { id: doc.id },
      });
    });

    if (querySnapShot.docs?.length == 0) {
      await setDoc(doc(db, "Chat", docId1), {
        id: docId1,
        users: [
          {
            email: user.primaryEmailAddress.emailAddress,
            imageUrl: user.imageUrl,
          },
        ],
      });
    }
  };

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <PetInfo pet={pet} />
        <PetSubInfo pet={pet} />
        <AboutPet pet={pet} />
        <OwnerInfo pet={pet} />
        <View style={{ height: 70 }} />
      </ScrollView>

      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.adoptbtn} onPress={InitiateChat}>
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              fontFamily: "outfit-medium",
            }}
          >
            Adopt Me
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  adoptbtn: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
  },
  bottomContainer: {
    position: "absolute",
    width: "100%",
    bottom: 0,
  },
});

export default PetDetails;
