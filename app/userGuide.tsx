import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function UserGuide() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>📘 AudioScope User Guide</Text>
        <Text style={styles.subtitle}>
          Learn how to use AudioScope step by step.
        </Text>

      
        <View style={styles.section}>
          <Text style={styles.heading}>🎵 Upload Audio File</Text>
          <Text style={styles.text}>
            • Tap <Text style={styles.highlight}>Upload Audio File</Text> on the home screen.{"\n"}
            • Select an audio file in <Text style={styles.highlight}>.mp3</Text> or <Text style={styles.highlight}>.wav</Text> format.{"\n"}
            • After a valid upload, tap <Text style={styles.highlight}>Isolate</Text> to process the file.{"\n"}
            • Once processed, you can play, stop, delete, or re-isolate the result.
          </Text>
        </View>

        
        <View style={styles.section}>
          <Text style={styles.heading}>📞 Integrate in Call</Text>
          <Text style={styles.text}>
            • This feature connects AudioScope to your mobile calls.{"\n"}
            • It allows live background isolation while you are on a call.{"\n"}
            • You can toggle integration ON/OFF from this page (after permissions).{"\n"}
            • Use responsibly — system permissions vary by device and Android version.
          </Text>
        </View>

        
        <View style={styles.section}>
          <Text style={styles.heading}>🕒 Processing History</Text>
          <Text style={styles.text}>
            • View all previously isolated audio files here.{"\n"}
            • Tap <Text style={styles.highlight}>Play</Text> to listen or <Text style={styles.highlight}>Delete</Text> to remove files.{"\n"}
            • Files are listed chronologically from newest to oldest.
          </Text>
        </View>

        
        <View style={styles.section}>
          <Text style={styles.heading}>⚙️ Common Errors & Fixes</Text>
          <Text style={styles.text}>
            • <Text style={styles.highlight}>Invalid File Format:</Text> Use only .mp3 or .wav files.{"\n"}
            • <Text style={styles.highlight}>No Permission:</Text> Allow storage or microphone access.{"\n"}
            • <Text style={styles.highlight}>Audio Not Playing:</Text> Check volume or restart the app.
          </Text>
        </View>

        
        <View style={styles.section}>
          <Text style={styles.heading}>ℹ️ Tips for Best Results</Text>
          <Text style={styles.text}>
            • Clear background noise before recording.{"\n"}
            • Use high-quality audio sources.{"\n"}
            • Regularly check processing history and clean old files.
          </Text>
        </View>

        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backText}>⬅️ Back to Home</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
    backgroundColor: "#1E1E2F",
  },
  scroll: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    color: "#bbb",
    fontSize: 14,
    marginBottom: 20,
  },
  section: {
    marginBottom: 24,
    backgroundColor: "#29294D",
    padding: 15,
    borderRadius: 10,
  },
  heading: {
    color: "#7EC8E3",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
  },
  text: {
    color: "#eee",
    fontSize: 15,
    lineHeight: 22,
  },
  highlight: {
    color: "#4FC3F7",
    fontWeight: "600",
  },
  backBtn: {
    backgroundColor: "#0077CC",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  backText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});

