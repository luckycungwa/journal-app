import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const ChatMessage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.chatBubble}>
        <Text style={styles.textMsg}>
          This is a dummy text message i should have sent you. let me know if
          you did receive it today!
        </Text>
        <View style={styles.timeContainer}>
        <Text style={styles.subText}>16:32</Text>
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
    paddingVertical: 12,
    backgroundColor: "#ffd7d7",
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
    left: 200,
    alignSelf: "right"
  },
  timeContainer: {
    // alignSelf: "flex-end",
    // right: 4,
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
    left: -24,
    bottom: -8,
  },
});

export default ChatMessage;
