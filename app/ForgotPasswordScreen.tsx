import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleReset = () => {
    if (!email) return Alert.alert("Error", "Please enter your email.");
    if (!email.includes("@")) return Alert.alert("Invalid Email", "Enter a valid email address.");

    Alert.alert("Success", "Password reset link sent (mock).");
    router.push("/LoginScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🔑 Forgot Password</Text>

      <TextInput
        placeholder="Enter your registered email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <TouchableOpacity onPress={handleReset} style={styles.button}>
        <Text style={styles.buttonText}>Send Reset Link</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/LoginScreen")}>
        <Text style={styles.link}>Back to Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1E1E2F", alignItems: "center", justifyContent: "center", padding: 20 },
  title: { color: "#fff", fontSize: 26, fontWeight: "700", marginBottom: 30 },
  input: { backgroundColor: "#29294D", color: "#fff", borderRadius: 10, width: "100%", padding: 15, marginBottom: 20 },
  button: { backgroundColor: "#0077CC", padding: 15, borderRadius: 10, width: "100%", alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "600" },
  link: { color: "#00A8FF", marginTop: 20 },
});
