import { Audio, AVPlaybackStatus } from "expo-av";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ProcessingHistory() {
  const [audioList, setAudioList] = useState([
    { id: "1", name: "Isolated_Audio_1.mp3", uri: null },
    { id: "2", name: "Isolated_Audio_2.mp3", uri: null },
  ]);

  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const playAudio = async (item: any) => {
    try {
      if (sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
        setSound(null);
      }

      const { sound: newSound } = await Audio.Sound.createAsync(
        item.uri ? { uri: item.uri } : require("../assets/sample.mp3"),
        { shouldPlay: true }
      );

      setSound(newSound);
      setPlayingId(item.id);

      newSound.setOnPlaybackStatusUpdate((status: AVPlaybackStatus) => {
        // ✅ Properly check if status is success type
        if (!status.isLoaded) return;

        if (!status.isPlaying) {
          setPlayingId(null);
        }
      });

      await newSound.playAsync();
    } catch (error) {
      console.error("Playback error:", error);
      Alert.alert("Playback Error", "Unable to play this audio file.");
    }
  };

  const stopAudio = async () => {
    if (sound) {
      await sound.stopAsync();
      setPlayingId(null);
    }
  };

  const deleteAudio = (id: string) => {
    Alert.alert("Confirm Delete", "Do you really want to delete this file?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => setAudioList(audioList.filter((a) => a.id !== id)),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🕒 Processing History</Text>
      <Text style={styles.subtitle}>Your previously isolated audio files</Text>

      {audioList.length === 0 ? (
        <Text style={styles.emptyText}>No isolated files found.</Text>
      ) : (
        <FlatList
          data={audioList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.fileName}>{item.name}</Text>
              <View style={styles.actions}>
                {playingId === item.id ? (
                  <TouchableOpacity onPress={stopAudio} style={styles.stopBtn}>
                    <Text style={styles.btnText}>⏹ Stop</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => playAudio(item)} style={styles.playBtn}>
                    <Text style={styles.btnText}>▶️ Play</Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity onPress={() => deleteAudio(item.id)} style={styles.deleteBtn}>
                  <Text style={styles.btnText}>🗑 Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1E1E2F", paddingTop: 40, paddingLeft: 20, paddingRight: 20 },
  title: { color: "#fff", fontSize: 24, fontWeight: "700", marginBottom: 8 },
  subtitle: { color: "#ccc", marginBottom: 20 },
  card: {
    backgroundColor: "#29294D",
    borderRadius: 12,
    padding: 15,
    marginVertical: 8,
  },
  fileName: { color: "#fff", fontSize: 16, fontWeight: "600", marginBottom: 10 },
  actions: { flexDirection: "row", justifyContent: "space-between" },
  playBtn: { backgroundColor: "#0077CC", padding: 8, borderRadius: 8, width: "45%", alignItems: "center" },
  stopBtn: { backgroundColor: "#FF9800", padding: 8, borderRadius: 8, width: "45%", alignItems: "center" },
  deleteBtn: { backgroundColor: "#E53935", padding: 8, borderRadius: 8, width: "45%", alignItems: "center" },
  btnText: { color: "#fff", fontWeight: "600" },
  emptyText: { color: "#999", fontStyle: "italic", textAlign: "center", marginTop: 40 },
});
