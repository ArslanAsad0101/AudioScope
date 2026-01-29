// ...existing code...
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function ProfileScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    (async () => {
      const p = await SecureStore.getItemAsync("userProfile");
      if (p) {
        try {
          const parsed = JSON.parse(p);
          setName(parsed.name ?? "");
          setEmail(parsed.email ?? "");
        } catch {}
      }
    })();
  }, []);

  const save = async () => {
    if (!email.includes("@")) return Alert.alert("Validation", "Enter a valid email.");
    const profile = { name, email };
    await SecureStore.setItemAsync("userProfile", JSON.stringify(profile));
    Alert.alert("Saved", "Profile saved.");
    router.back();
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("userToken");
    await SecureStore.deleteItemAsync("userProfile");
    router.replace("/LoginScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Edit profile</Text>

      <TextInput style={styles.input} placeholder="Name" placeholderTextColor="#999" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#999" keyboardType="email-address" value={email} onChangeText={setEmail} />

      <TouchableOpacity style={styles.primary} onPress={save}>
        <Text style={styles.primaryText}>Save</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.linkRow} onPress={() => router.back()}>
        <Text style={styles.linkText}>Cancel</Text>
      </TouchableOpacity>

      <View style={{ marginTop: 18, width: "100%" }}>
        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0F1724", padding: 24, alignItems: "center", justifyContent: "center" },
  title: { color: "#fff", fontSize: 22, fontWeight: "700", marginBottom: 12 },
  input: { width: "100%", backgroundColor: "#111827", color: "#fff", padding: 12, borderRadius: 10, marginBottom: 12 },
  primary: { width: "100%", backgroundColor: "#06B6D4", padding: 14, borderRadius: 12, alignItems: "center", marginTop: 12 },
  primaryText: { color: "#042A2B", fontWeight: "700" },
  linkRow: { marginTop: 12 },
  linkText: { color: "#9CA3AF" },

  // new logout button styles
  logoutBtn: {
    backgroundColor: "#E53935",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
  },
  logoutText: { color: "#fff", fontWeight: "700" },
});