import { Audio } from "expo-av";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function IsolateScreen() {
  const { name, uri } = useLocalSearchParams<{ name: string; uri: string }>();
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const router = useRouter();

  const playAudio = async () => {
    try {
      if (!uri) return Alert.alert("Error", "No audio file found!");
      const { sound } = await Audio.Sound.createAsync({ uri });
      setSound(sound);
      await sound.playAsync();
      setIsPlaying(true);
    } catch (e) {
      Alert.alert("Error", "Unable to play audio.");
    }
  };

  const stopAudio = async () => {
    try {
      if (sound) {
        await sound.stopAsync();
        setIsPlaying(false);
      }
    } catch (e) {
      Alert.alert("Error", "Unable to stop audio.");
    }
  };

  const deleteAudio = () => {
    setSound(null);
    Alert.alert("Deleted", "Audio file deleted successfully.");
  };

  const reIsolate = () => {
    Alert.alert("Re-Isolate", "Processing isolation again...");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🎧 Isolated Audio</Text>
      <Text style={styles.subtitle}>{name || "No file selected"}</Text>

      <TouchableOpacity style={styles.button} onPress={playAudio}>
        <Text style={styles.buttonText}>{isPlaying ? "Playing..." : "Play"}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.stopButton]} onPress={stopAudio}>
        <Text style={styles.buttonText}>Stop</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={deleteAudio}>
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.reButton]} onPress={reIsolate}>
        <Text style={styles.buttonText}>Re-Isolate</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E2F",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 10,
  },
  subtitle: {
    color: "#aaa",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#29294D",
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  stopButton: { backgroundColor: "#FF9800" },
  deleteButton: { backgroundColor: "#E53935" },
  reButton: { backgroundColor: "#4CAF50" },
  backButton: { marginTop: 30 },
  backText: { color: "#888", fontSize: 16 },
});
