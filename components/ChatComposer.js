import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";

const ChatComposer = () => {
  const [messgae, setMessage] = useState();

  const handleInputChange = () => {
    // handle sending user input
    console.log("message sent!");
  };

  return (
    <View style={styles.container}>
      <View style={styles.chatComposer}>
        <View style={styles.inputContainer}>
          <View style={styles.iconContainer}>
            <Image
              style={styles.icon}
              source={{
                uri: "https://thenounproject.com/api/private/icons/3104646/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0",
              }}
              alt="media"
            />
          </View>
          <View style={styles.chatContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Type Message..."
              onChangeText={handleInputChange}
              //value={message}
              // maxLength={500}
            />
            <View style={styles.imojiIcon}>
              <Image
                style={styles.imojiIcon}
                source={{
                  uri: "https://thenounproject.com/api/private/icons/1133202/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0",
                }}
              />
            </View>
          </View>

          <TouchableOpacity
            onPress={() => setMessage("")}
            style={styles.sendBtn}
          >
            <Image
              style={styles.icon}
              source={{
                uri: "https://thenounproject.com/api/private/icons/5964043/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0",
              }}
              alt="send"
            />

            {/* <Text style={styles.sendBtn}>Send</Text> */}
          </TouchableOpacity>
          {/* <Button title="Randomize Image" onPress={randomizeImage} /> */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
   
  },
  chatComposer: {
    height: "12%",
    width: "100%",
    // backgroundColor: "#ff0099", 
    padding: 12,
  },
  textInput: {
    width: "100%",
    height: 40,
    borderColor: "#363636",
    borderWidth: 2,
    paddingHorizontal: 18,
    borderColor: "#d1d1d1",
    backgroundColor: "#f1f1f1",
    borderRadius: 25,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionContainer: {
    width: 250,
    height: 40,
    justifyContent: "center",
    backgroundColor: "#ffb380",
    borderRadius: 24,
    marginTop: 12,
  },
  sendBtn: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ececec",
    borderRadius: 25,
    marginHorizontal: 8,
  },
  icon: {
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 30,
  },
  iconContainer: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  imojiIcon: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 2,
  },
  chatContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // paddingHorizontal: 0,
  }
});
export default ChatComposer;
