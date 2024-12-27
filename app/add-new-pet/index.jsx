import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import { Picker } from "@react-native-picker/picker";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db, storage } from "@/config/FirebaseConfig";
import * as ImagePicker from "expo-image-picker";

const AddNewPet = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const [formData, setFormData] = useState({
    category: "Dogs",
    sex: "Male",
  });
  const [gender, setGender] = useState();
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [image, setImage] = useState();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Add New Pet",
    });
    GetCategory();
  }, []);

  const GetCategory = async () => {
    setCategory([]);
    const snapshot = await getDocs(collection(db, "Category"));
    snapshot.forEach((doc) => {
      setCategory((prev) => [...prev, doc.data()]);
    });
  };

  const imagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleInputChnage = (fieldName, fieldValue) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const uploadImage = async () => {
    const res = await fetch(image);
    const blobImage = await res.blob();
    const storageRef = ref(storage, "/PetAdopt/" + Date.now() + ".jpg");

    uploadBytes(storageRef, blobImage)
      .then((snap) => {
        console.log("File Uploaded");
      })
      .then((res) => {
        getDownloadURL(storageRef).then(async (dowmloadUrl) => {
          console.log(dowmloadUrl);
          saveFormData(dowmloadUrl);
        });
      });
  };

  const onSubmit = () => {
    setLoader(true);
    if (Object.keys(formData).length != 8) {
      ToastAndroid.show("Please enter all details", ToastAndroid.SHORT);
      return;
    }
    //uploadImage();
    saveFormData();
  };

  const saveFormData = async (imageUrl) => {
    const user = {
      fullName: "Lalit Chitte",
      primaryEmailAddress: {
        emailAddress: "lalit@gmailcom",
      },
      imageUrl: "https://cdn-icons-png.flaticon.com/512/8792/8792047.png",
    };

    const docId = Date.now().toString();
    await setDoc(doc(db, "Pets", docId), {
      ...formData,
      imageUrl: null,
      username: user.fullName,
      email: user.primaryEmailAddress?.emailAddress,
      id: docId,
      userImage: user?.imageUrl,
    });
    setFormData({
      sex: "Male",
      category: "Dogs",
    });
    setLoader(false);
    router.replace("/(tabs)/home");
  };

  return (
    <ScrollView style={{ padding: 20 }} showsVerticalScrollIndicator={false}>
      <Text style={{ fontFamily: "outfit-medium", fontSize: 20 }}>
        Add new pet for adoption
      </Text>

      <Pressable style={{ marginTop: 8 }} onPress={imagePicker}>
        {!image ? (
          <Image
            style={{
              borderColor: Colors.GRAY,
              width: 100,
              height: 100,
              borderRadius: 15,
              borderWidth: 1,
            }}
            source={require("./../../assets/images/paws.jpg")}
          />
        ) : (
          <Image
            style={{
              borderColor: Colors.GRAY,
              width: 100,
              height: 100,
              borderRadius: 15,
              borderWidth: 1,
            }}
            source={{ uri: image }}
          />
        )}
      </Pressable>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pet Name *</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => handleInputChnage("name", value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pet Category *</Text>
        <Picker
          style={{
            backgroundColor: "white",
            borderRadius: 7,
          }}
          mode="dropdown"
          selectedValue={selectedCategory}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedCategory(itemValue);
            handleInputChnage("category", itemValue);
          }}
        >
          {category.map((item, index) => (
            <Picker.Item key={index} label={item.name} value={item.name} />
          ))}
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Breed *</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => handleInputChnage("breed", value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Age *</Text>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          onChangeText={(value) => handleInputChnage("age", value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Gender *</Text>
        <Picker
          style={{
            backgroundColor: "white",
            borderRadius: 7,
          }}
          mode="dropdown"
          selectedValue={gender}
          onValueChange={(itemValue, itemIndex) => {
            setGender(itemValue);
            handleInputChnage("sex", itemValue);
          }}
        >
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Weight *</Text>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          onChangeText={(value) => handleInputChnage("weight", value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Address *</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => handleInputChnage("address", value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>About *</Text>
        <TextInput
          style={styles.input}
          numberOfLines={5}
          multiline={true}
          onChangeText={(value) => handleInputChnage("about", value)}
        />
      </View>

      <TouchableOpacity
        disabled={loader}
        style={styles.button}
        onPress={onSubmit}
      >
        {loader ? (
          <ActivityIndicator size={"small"} color={"black"} />
        ) : (
          <Text
            style={{
              fontFamily: "outfit-medium",
              fontSize: 16,
              textAlign: "center",
            }}
          >
            Submit
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 5,
  },
  input: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 7,
  },
  label: {
    fontFamily: "outfit",
    marginVertical: 5,
  },
  button: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 7,
    marginVertical: 20,
    marginBottom: 50,
  },
});

export default AddNewPet;
