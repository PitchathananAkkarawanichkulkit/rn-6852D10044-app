import { router } from "expo-router";
import React, { useEffect } from "react";
import { Text, View, StyleSheet, Image, ActivityIndicator } from "react-native";


const carlogo = require("../assets/images/taxi.png");
const myimage = require("../assets/images/myimage.jpg");

export default function Index() {
  useEffect(() => {
    setTimeout(() => {
      router.replace("/taxi_fare");
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
     <Image source={carlogo} style={styles.carlogo} />
      <Text>Taxi Fare Calculator</Text>
      <Text>คำนวณค่าโดยสารแท็กซี่</Text>
      <ActivityIndicator
        size="large"
        color="#f0be0b"
        style={{ marginTop: 20 }}
      />
      <Image source={myimage} style={styles.myimage} />
      <Text>พัฒนาโดย</Text>
      <Text>6852ฏ10044 พิชญ์ธนัน อัครวาณิชกุลกิจ</Text>

    </View>
  );
}

const styles = StyleSheet.create({
 myimage: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginTop: 90
  },
  carlogo: {
    width: 120,
    height: 120,
  },

  container: {
    flex: 1,
    gap: 10,
    marginTop: 150,
    alignItems: "center",
    justifyContent: "center",
    
  },
});
