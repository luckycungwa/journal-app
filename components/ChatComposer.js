import React, { useState, useEffect } from "react";
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
  const [recordedAudioUri, setRecordedAudioUri] = useState(null); //save audio state as file
  // sav  y recording in an array
  const [savedAudios, setSavedAudios] = useState([]);

  const [audioRec, setAudioRec] = useState();
  const [isPlaying, setIsPlaying] = useState(false); //audio does not auto play
  const [isPaused, setIsPaused] = useState(false);

  // Handle text sending
  const handleInputChange = () => {
    // handle sending user input
    console.log("message sent!");
  };

  // HANDLE AUDIO CONTROL
  const handlePlayPause = async (audioUri) => {
    if (isPlaying) {
      console.log("Pausing audio");
      pauseAudio();
    } else {
      console.log("Playing audio");
      playAudio(audioUri);
    }
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
      setIsRecording(true);
      console.log("Is recording");

      // manage new audio for array saves
    } catch (error) {
      console.error("Failed to recording", error);
    }
  };

  //STOP recording block
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

  // HANDLE AUDIO PLAYBACK

  // const loadAudio = async () => {
  //   console.log("Loading Sound");
  //   const { sound } = await Audio.Sound.createAsync({ uri: recordedAudioUri });
  //   setAudioRec(sound);
  //       console.log("loaded audio is : " +recordedAudioUri)
  // };
  //   setAudioRec(sound);
  //   console.log("Sound loaded");
  // };

  //AUDIO PLAYBACK BLOCK
  const playAudio = async (audioUri) => {
    try {
      console.log("Fetching audio");
      // Stop any previously playing audio
      await stopAudio();
      // Prepare & load audio from recorded source
      const { sound } = await Audio.Sound.createAsync({ uri: audioUri });
      setAudioRec(sound); // Store the loaded sound in state
      await sound.playAsync();
      setIsPlaying(true);
      setIsPaused(false);
    } catch (error) {
      console.error("Audio play error:", error);
    }
  };
  
  const pauseAudio = async () => {
    if (audioRec) {
      if (isPlaying) {
        console.log("Pausing Audio");
        await audioRec.pauseAsync();
        setIsPlaying(false);
      } else {
        console.log("Resuming Audio");
        await audioRec.playAsync();
        setIsPlaying(true);
      }
    }
  };
  

  const stopAudio = async (audioUri) => {
    if (audioRec) {
      if (isPlaying) {
        console.log("Stop Audio");
        await audioRec.stopAsync();

        setIsPlaying(false);
        setIsPaused(false);
      }
    }
  };

  useEffect(() => {
    if (recordedAudioUri) {
      loadAudio();
    }
    return () => {
      if (audioRec) {
        console.log("Unloading Sound");
        audioRec.unloadAsync();
      }
    };
  }, [recordedAudioUri]);

  return (
    <View style={styles.container}>
      {/* AUDIO PLAYER SECTION */}
      <View style={styles.audioSection}>
        {savedAudios.map((audioUri, index) => (
          <View style={styles.chatBubble} key={index}>
            <View style={styles.audioContainer}>
              <TouchableOpacity
                style={styles.audioBtn}
                key={index}
                // onPress={() => playAudio(audioUri)}
                onPress={() => handlePlayPause(audioUri)}
                // onPress={isPlaying || isPaused ? pauseAudio : playAudio}
              >
                <Image
                  style={styles.icon}
                  source={
                    isPlaying
                      ? {
                          uri: "https://thenounproject.com/api/private/icons/5978415/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23ffffff&foregroundOpacity=1&imageFormat=png&rotation=0https://thenounproject.com/api/private/icons/5978415/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23ffffff&foregroundOpacity=1&imageFormat=png&rotation=0",
                        }
                      : {
                          uri: "https://thenounproject.com/api/private/icons/1785120/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23ffffff&foregroundOpacity=1&imageFormat=png&rotation=0",
                        }
                  }
                  alt="play"
                />
              </TouchableOpacity>

              {/* <TouchableOpacity onPress={stopAudio(audioUri)}>
                <Image
                  source={{
                    uri: "https://thenounproject.com/api/private/icons/1234567/stop/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23ffffff&foregroundOpacity=1&imageFormat=png&rotation=0",
                  }}
                  alt="stop"
                />
              </TouchableOpacity> */}

              <View>
                <Text>Rec_ {index + 1}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

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
              source={
                recording
                  ? {
                      uri: "https://thenounproject.com/api/private/icons/5976667/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0",
                    }
                  : {
                      uri: "https://thenounproject.com/api/private/icons/5964043/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0",
                    }
              }
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

  // Audio stuff
  audioSection: {
    width: "100%",
    backgroundColor: "#fff",
    marginVertical: 4,
    gap: 6,
  },
  chatBubble: {
    alignSelf: "right",
    left: 100,
    height: "auto",
    width: "64%",
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: "#ab98ff",

    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 0,
  },
  audioBtn: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ff526f",
    borderRadius: 25,
    marginHorizontal: 8,
    paddingLeft: 4,
    left: -18,
  },
  icon: {
    alignItems: "left",
    justifyContent: "left",
    width: 28,
    height: 28,
  },
  audioWave: {
    height: "20%",
    width: 140,
    left: -16,
    backgroundColor: "#e7e7e7",
    borderRadius: 25,
  },
  audioContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  subText: {
    fontSize: 12,
    fontWeight: 100,
    letterSpacing: 0.5,
    top: 8,
    // left: 200,
    right: -100,
  },
  timeContainer: {
    right: 4,
    // backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default ChatComposer;
