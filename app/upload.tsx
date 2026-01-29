import * as DocumentPicker from "expo-document-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function UploadScreen() {
  const [audioFile, setAudioFile] = useState<any>(null);
  const router = useRouter();

  const validFormats = [".mp3", ".wav", ".m4a"];

  const pickAudioFile = async () => {
  console.log("Button clicked - opening document picker...");
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: "audio/*",
      copyToCacheDirectory: true,
    });
    console.log("Picker result:", result);

    if (result.canceled) {
      Alert.alert("Cancelled", "You didn't select any file.");
      return;
    }

    const file = result.assets[0];
    const ext = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();

    if (!validFormats.includes(ext)) {
      Alert.alert("Invalid Format", "Please upload only .mp3, .wav, or .m4a files.");
      return;
    }

    setAudioFile(file);
    Alert.alert("File Selected", `${file.name} uploaded successfully.`);
  } catch (error: any) {
    console.error("Error picking file:", error);
    Alert.alert("Error", "Something went wrong while picking the file.");
  }
};


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🎵 Upload Audio File</Text>

      <TouchableOpacity style={styles.button} onPress={pickAudioFile}>
        <Text style={styles.buttonText}>Select Audio File</Text>
      </TouchableOpacity>

      {audioFile && (
        <>
          <Text style={styles.fileName}>Selected: {audioFile.name}</Text>

          <TouchableOpacity
            style={[styles.button, styles.isolateButton]}
            onPress={() => router.push({ pathname: "/isolate", params: { name: audioFile.name, uri: audioFile.uri } })}
          >
            <Text style={styles.buttonText}>Isolate Audio</Text>
          </TouchableOpacity>
        </>
      )}
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
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#29294D",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  isolateButton: {
    backgroundColor: "#4CAF50",
  },
  fileName: {
    color: "#ccc",
    marginTop: 10,
  },
});
