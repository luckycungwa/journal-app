import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Audio } from "expo-av";

const ChatRecording = ({ recordedAudioUri }) => {
  const [audioRec, setAudioRec] = useState();
  const [isPlaying, setIsPlaying] = useState(false); //audio does not auto play


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
  
  const loadAudio = async () => {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
        // { uri: recordedAudioUri }
        console.log("image is : ")
        );
    setAudioRec(sound);
    console.log("Sound loaded");
  };
  //   Audio player block
  const playAudio = async (audioUri) => {
    try {
      const { sound } = await Audio.Sound.createAsync({ uri: audioUri });
      await sound.playAsync();
    } catch (error) {
      console.error("Audio playback error:", error);
    }
  };

  
// const playAudio = async () => {
//   if (audioRec) {
//     console.log("Playing Sound");
//     try {
//       await audioRec.playAsync();
//     } catch (error) {
//       console.error("Audio playback error:", error);
//     }
//   }
// };


  //   useEffect(() => {
  //     return audioRec
  //       ? () => {
  //           console.log("Unloading Sound");
  //           audioRec.unloadAsync();
  //         }
  //       : undefined;
  //   }, [audioRec]);

  return (
    <View style={styles.container}>
      <View style={styles.chatBubble}>
        <View style={styles.audioContainer}>
          <TouchableOpacity
            style={styles.audioBtn}
            //   title="Play"
            onPress={playAudio}
          >
            <Image
              style={styles.icon}
              source={
                isPlaying
                  ? {
                      uri: "https://thenounproject.com/api/private/icons/5976667/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23ffffff&foregroundOpacity=1&imageFormat=png&rotation=0",
                    }
                  : {
                      uri: "https://thenounproject.com/api/private/icons/1785120/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23ffffff&foregroundOpacity=1&imageFormat=png&rotation=0",
                    }
              }
              alt="play"
            />
          </TouchableOpacity>

          <Image
            style={styles.audioWave}
            source={{
              uri: "https://thenounproject.com/api/private/icons/1703642/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23ffffff&foregroundOpacity=1&imageFormat=png&rotation=0",
            }}
            alt="audio wave"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#fff",
    // alignItems: "center",
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

export default ChatRecording;
