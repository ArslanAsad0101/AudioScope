// ...existing code...
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useState } from "react";
import { ActivityIndicator, Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!email.includes("@")) return Alert.alert("Validation", "Enter a valid email.");
    if (password.length < 6) return Alert.alert("Validation", "Password must be at least 6 characters.");
    setLoading(true);
    try {
      // TODO: call your API here
      await new Promise((r) => setTimeout(r, 800));
      await SecureStore.setItemAsync("userToken", "fake-jwt-token");

      const profile = { name: email.split("@")[0], email };
      await SecureStore.setItemAsync("userProfile", JSON.stringify(profile));

      router.replace("/");
    } catch (e) {
      Alert.alert("Login failed", "Check your credentials or network.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome back</Text>
      <Text style={styles.subtitle}>Sign in to continue</Text>

      <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#999" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#999" secureTextEntry value={password} onChangeText={setPassword} />

      <TouchableOpacity style={styles.primary} onPress={submit} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.primaryText}>Sign in</Text>}
      </TouchableOpacity>

      <TouchableOpacity style={styles.linkRow} onPress={() => router.push("/RegisterScreen")}>
        <Text style={styles.linkText}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0F1724", padding: 24, alignItems: "center", justifyContent: "center" },
  title: { color: "#fff", fontSize: 28, fontWeight: "700", marginBottom: 6 },
  subtitle: { color: "#9CA3AF", marginBottom: 20 },
  input: { width: "100%", backgroundColor: "#111827", color: "#fff", padding: 12, borderRadius: 10, marginBottom: 12 },
  primary: { width: "100%", backgroundColor: "#06B6D4", padding: 14, borderRadius: 12, alignItems: "center", marginTop: 12 },
  primaryText: { color: "#042A2B", fontWeight: "700" },
  linkRow: { marginTop: 12 },
  linkText: { color: "#9CA3AF" },
});