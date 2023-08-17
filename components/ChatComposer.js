import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
// expo audio from expo av
import { Audio } from "expo-av";

const ChatComposer = () => {
  const [messgae, setMessage] = useState();
  // Recording Stuff
  const [recording, setRecording] = useState();
  const [isRecording, setIsRecording] = useState(false); //initial recording state is off
  const [recordedAudioUri, setRecordedAudioUri] = useState(null);   //save audio state as file
// sav  y recording in an array
  const [savedAudios, setSavedAudios] = useState([])


  const handleInputChange = () => {
    // handle sending user input
    console.log("message sent!");
  };

  // Handle rcording audio
  const startRecording = async () => {
    try {
      console.log("Requesting permissions..");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Recording Started");
      // prepare recording in bst quality | set audio quality (acc or mp3 etc) when if thees more time
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log("Is recording");
    } catch (error) {
      console.error("Failed to recording", error);
    }
  };

  // stop recording block
  const stopRecording = async () => {
    console.log("saving recording...");
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    // update array and save audio 
    const uri = recording.getURI();
  setSavedAudios((prevAudios) => [...prevAudios, uri]); // Add new URI to the array
  console.log("Recording saved: ", uri);
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
          {/* RECORD AUDIO BUTTON */}
          <TouchableOpacity
            onPress={recording ? stopRecording : startRecording}
            style={styles.sendBtn}
          >
            <Image
              style={styles.icon}
              source={recording ? {uri: "https://thenounproject.com/api/private/icons/5976667/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0"} :  {uri: "https://thenounproject.com/api/private/icons/5964043/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0",}}
             
              alt="record"
            />
          </TouchableOpacity>

          {/* 
          SEND MESSAGE BUTTON
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
          </TouchableOpacity> */}

        </View>
      </View>
      <View>
  {savedAudios.map((audioUri, index) => (
    <TouchableOpacity key={index} onPress={() => playAudio(audioUri)}>
      <Text>Rec_ {index + 1}</Text>
    </TouchableOpacity>
  ))}
</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: "#fff",
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
  },
});
export default ChatComposer;
