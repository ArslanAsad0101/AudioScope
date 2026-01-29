import * as Permissions from "expo-permissions";
import React, { useState } from "react";
import { Alert, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";

export default function IntegrateCallScreen() {
  const [micGranted, setMicGranted] = useState(false);
  const [callGranted, setCallGranted] = useState(false);
  const [isIntegrated, setIsIntegrated] = useState(false);

  const requestMicPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    if (status === "granted") setMicGranted(true);
    else Alert.alert("Permission Denied", "Microphone access is required.");
  };

  const requestCallPermission = () => {
    Alert.alert("Note", "Call access is simulated for demo purposes.");
    setCallGranted(true);
  };

  const toggleIntegration = () => {
    if (!micGranted || !callGranted) {
      Alert.alert("Error", "Please grant all permissions first.");
      return;
    }
    setIsIntegrated(!isIntegrated);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📞 Integrate AudioScope in Calls</Text>
      <Text style={styles.subtitle}>
        Enable real-time voice isolation during calls
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>🎤 Microphone Access</Text>
        <TouchableOpacity style={styles.button} onPress={requestMicPermission}>
          <Text style={styles.buttonText}>
            {micGranted ? "Granted ✅" : "Grant Permission"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>📱 Call Access</Text>
        <TouchableOpacity style={styles.button} onPress={requestCallPermission}>
          <Text style={styles.buttonText}>
            {callGranted ? "Access Granted ✅" : "Grant Access"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.integrationBox}>
        <Text style={styles.label}>Enable AudioScope for Calls</Text>
        <Switch
          value={isIntegrated}
          onValueChange={toggleIntegration}
          thumbColor={isIntegrated ? "#00A3FF" : "#888"}
          trackColor={{ true: "#0077CC", false: "#444" }}
        />
      </View>

      <TouchableOpacity
        style={styles.demoBtn}
        onPress={() =>
          Alert.alert("Demo Started", "This is a simulated isolation test call.")
        }
      >
        <Text style={styles.demoText}>🎧 Try Demo Call Isolation</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E2F",
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    color: "#ccc",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 25,
  },
  card: {
    backgroundColor: "#29294D",
    borderRadius: 14,
    padding: 20,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  button: {
    backgroundColor: "#3B3B66",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#4DA6FF",
    fontWeight: "600",
  },
  integrationBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#29294D",
    borderRadius: 14,
    padding: 20,
    marginTop: 20,
  },
  demoBtn: {
    backgroundColor: "#4DA6FF",
    paddingVertical: 15,
    borderRadius: 12,
    marginTop: 30,
    alignItems: "center",
  },
  demoText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
