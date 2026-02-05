
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useState } from "react";
import { ActivityIndicator, Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function RegisterScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const passwordStrength = (p: string) => {
    if (p.length > 10) return "Strong";
    if (p.length > 6) return "Okay";
    return "Weak";
  };

  const submit = async () => {
    if (!email.includes("@")) return Alert.alert("Validation", "Enter a valid email.");
    if (password.length < 6) return Alert.alert("Validation", "Password must be at least 6 chars.");
    setLoading(true);
    try {
      
      await new Promise((r) => setTimeout(r, 900));
      await SecureStore.setItemAsync("userToken", "fake-jwt-token");

      
      const profile = { name: email.split("@")[0], email };
      await SecureStore.setItemAsync("userProfile", JSON.stringify(profile));

      router.replace("/");
    } catch (e) {
      Alert.alert("Register failed", "Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Create account</Text>
      <Text style={styles.subtitle}>Join AudioScope</Text>

      <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#999" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#999" secureTextEntry value={password} onChangeText={setPassword} />

      <View style={{ width: "100%", alignItems: "flex-start", marginBottom: 8 }}>
        <Text style={{ color: "#9CA3AF" }}>Password strength: {passwordStrength(password)}</Text>
      </View>

      <TouchableOpacity style={styles.primary} onPress={submit} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.primaryText}>Register</Text>}
      </TouchableOpacity>

      <TouchableOpacity style={styles.linkRow} onPress={() => router.back()}>
        <Text style={styles.linkText}>Already have an account? Sign in</Text>
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
