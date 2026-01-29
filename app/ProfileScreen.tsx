import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ProfileScreen() {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/LoginScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>👤 Welcome Back!</Text>
      <Text style={styles.subtitle}>You are logged in (mock state)</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>John Doe</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>john@example.com</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1E1E2F", padding: 20 },
  title: { color: "#fff", fontSize: 28, fontWeight: "700", marginTop: 40 },
  subtitle: { color: "#ccc", fontSize: 15, marginBottom: 30 },
  card: { backgroundColor: "#29294D", padding: 15, borderRadius: 10, marginVertical: 8 },
  label: { color: "#aaa", fontSize: 14 },
  value: { color: "#fff", fontSize: 16, fontWeight: "500" },
  logoutButton: { backgroundColor: "#D9534F", padding: 15, borderRadius: 10, marginTop: 30, alignItems: "center" },
  logoutText: { color: "#fff", fontWeight: "600" },
});
