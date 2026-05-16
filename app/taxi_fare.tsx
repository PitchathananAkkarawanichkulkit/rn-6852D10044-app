import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";

const carlogo = require("../assets/images/taxi.png");

export default function App() {
  const [distance, setDistance] = useState("");
  const [time, setTime] = useState("");
  const [fare, setFare] = useState("0.00");

  const calculateFare = () => {
    //alert
    if (!distance || distance.trim() === "") {
      Alert.alert("แจ้งเตือน", "กรุณากรอกระยะทาง");
      return;
    }
    if (!time || time.trim() === "") {
      Alert.alert("แจ้งเตือน", "กรุณากรอกเวลารถติด (หากไม่มีรถติดให้ใส่ 0)");
      return;
    }

    const distNum = parseFloat(distance);
    const timeNum = parseFloat(time);

    if (isNaN(distNum) || isNaN(timeNum) || distNum < 0 || timeNum < 0) {
      Alert.alert("แจ้งเตือน", "กรุณากรอกข้อมูลเป็นตัวเลขที่ถูกต้อง");
      return;
    }

    let totalFare = 0;
    //สูตร
    if (distNum > 0) {
      totalFare += 35;

      if (distNum > 1) {
        const distTier = Math.min(distNum, 10) - 1;
        totalFare += distTier * 6.5;
      }

      if (distNum > 10) {
        const distTier = Math.min(distNum, 20) - 10;
        totalFare += distTier * 7.0;
      }

      if (distNum > 20) {
        const distTier = Math.min(distNum, 40) - 20;
        totalFare += distTier * 8.0;
      }

      if (distNum > 40) {
        const distTier = Math.min(distNum, 60) - 40;
        totalFare += distTier * 8.5;
      }

      if (distNum > 60) {
        const distTier = Math.min(distNum, 80) - 60;
        totalFare += distTier * 9.0;
      }

      if (distNum > 80) {
        const distTier = distNum - 80;
        totalFare += distTier * 10.5;
      }
    }

    totalFare += timeNum * 3;

    setFare(totalFare.toFixed(2));
  };

  const handleReset = () => {
    setDistance("");
    setTime("");
    setFare("0.00");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Taxi Fare</Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Image source={carlogo} style={styles.image} resizeMode="contain" />

          <Text style={styles.title}>คำนวณค่าโดยสารแท็กซี่</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>ระยะทาง (กิโลเมตร) 🚗</Text>
            <TextInput
              style={styles.input}
              placeholder="กรุณากรอกระยะทาง"
              keyboardType="numeric"
              value={distance}
              onChangeText={setDistance}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>เวลารถติด (นาที) ⏰</Text>
            <TextInput
              style={styles.input}
              placeholder="กรุณากรอกเวลารถติด"
              keyboardType="numeric"
              value={time}
              onChangeText={setTime}
            />
          </View>

          <TouchableOpacity style={styles.calculateBtn} onPress={calculateFare}>
            <Text style={styles.btnText}>คำนวณค่าโดยสาร</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelBtn} onPress={handleReset}>
            <Text style={styles.btnText}>ยกเลิก</Text>
          </TouchableOpacity>

          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>ค่าโดยสารแท็กซี่</Text>
            <Text style={styles.resultValue}>{fare}</Text>
            <Text style={styles.resultUnit}>บาท</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCF8FA",
  },
  header: {
    backgroundColor: "#FFC107",
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
  },
  scrollContent: {
    padding: 20,
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 120,
    marginTop: 20,
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 30,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D1D1",
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 14,
  },
  calculateBtn: {
    backgroundColor: "#FFC107",
    width: "100%",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  cancelBtn: {
    backgroundColor: "#A0A0A0",
    width: "100%",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 30,
  },
  btnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  resultContainer: {
    backgroundColor: "#FFF2C6",
    width: "100%",
    paddingVertical: 25,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#FDE393",
  },
  resultLabel: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  resultValue: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FF4D4D",
    marginBottom: 5,
  },
  resultUnit: {
    fontSize: 14,
    color: "#555",
  },
});
