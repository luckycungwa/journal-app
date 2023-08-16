import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const ChatMessage = ({ content, timestamp }) => {

  return (
    <View style={styles.container}>
      <View style={styles.chatBubble}>
        <Text style={styles.textMsg}>
        {/* draw contemt & time stamp fom the chatcomposer */}
          {content}
        </Text>
        <View style={styles.timeContainer}>
        <Text style={styles.subText}>{timestamp}</Text>
      </View>
      </View>
      <View style={styles.iconContainer}>
        <Image
          style={styles.icon}
          source={{
            uri: "https://thenounproject.com/api/private/icons/5153454/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0",
          }}
        />
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#a0a0a0",
    alignItems: "center",
    flexDirection: "row",
  },

  chatBubble: {
    alignSelf: "right",
    height: "auto",
    width: "auto",
    minHeight: "auto",
    maxWidth: "64%",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#ded7ff",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 0,
    marginHorizontal: 24,
  },
  receiptIcon: {
    height: "12%",
    width: "100%",
    padding: 12,
  },
  textMsg: {
    // fontSize: 14,
    alignContent: "center",
    flexWrap: "wrap",
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
  icon: {
    width: 30,
    height: 30,
    
  },
  iconContainer: {
    alignSelf: "flex-end",
    width: 30,
    height: 30,
    // alignSelf: "right",
    right: 24,
    bottom: -8,
  },
});

export default ChatMessage;
