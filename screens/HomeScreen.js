import React from "react";
import { View, Text, StyleSheet, Image, TextInput } from "react-native";
import ChatComposer from "../components/ChatComposer";
import ChatMessage from "../components/ChatMessage";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>HOME SCREEN TEST COMPONENTS</Text>
      <View>
      {/* HOMESCREEN STUF */}
        <View style={styles.avatarImg}>
          <Image
            style={styles.avatar}
            source={{
              uri: "https://fffuel.co/images/dddepth-preview/dddepth-327.jpg",
            }}
            alt="avatar"
          />
        </View>

       
        </View>
         {/* CHAT MESSAGE */}
        <ChatComposer/>
        <ChatMessage/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6ec5ff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  inputField: {},
  formContainer: {
    height: 150,
    width: "80%",
    backgroundColor: "white",
    borderRadius: 15,
    padding: 10,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarImg: {
    width: 70,
    height: 70,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    margin: 12,
    backgroundColor: "#dedede",
    // position: "absoloute",
    // top: -60,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 50,
  },
});

export default HomeScreen;
