import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Easing,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Profile = { name?: string; email?: string } | null;

export default function HomeScreen() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [profile, setProfile] = useState<Profile>(null);

  // mount animation values
  const mountOpacity = useRef(new Animated.Value(0)).current;
  const mountTranslate = useRef(new Animated.Value(10)).current;

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const token = await SecureStore.getItemAsync("userToken");
        if (!token) {
          router.replace("/LoginScreen");
          return;
        }
        const p = await SecureStore.getItemAsync("userProfile");
        if (mounted && p) {
          try {
            setProfile(JSON.parse(p));
          } catch {
            setProfile(null);
          }
        }
      } catch (e) {
        console.error("Auth check error:", e);
      } finally {
        if (mounted) setCheckingAuth(false);
        // run mount animation once auth check is done
        Animated.parallel([
          Animated.timing(mountOpacity, {
            toValue: 1,
            duration: 350,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(mountTranslate, {
            toValue: 0,
            duration: 350,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
        ]).start();
      }
    })();
    return () => {
      mounted = false;
    };
  }, [router, mountOpacity, mountTranslate]);

  if (checkingAuth) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: "center" }]}>
        <ActivityIndicator size="large" color="#06B6D4" />
      </SafeAreaView>
    );
  }

  const goToUpload = () => router.push({ pathname: "/upload" });
  const goToIntegrate = () => router.push("/integrateCall");
  const goToHistory = () => router.push("/processingHistory");
  const goToGuide = () => router.push("/userGuide");
  const goToProfile = () => router.push("/profile");

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1E1E2F" />

      <Animated.View
        style={{
          width: "100%",
          opacity: mountOpacity,
          transform: [{ translateY: mountTranslate }],
        }}
      >
        <Text style={styles.title}>🎧 AudioScope</Text>
        <Text style={styles.subtitle}>
          {profile ? `Hi, ${profile.name ?? profile.email}` : "Analyze, Record, and Manage Your Audio"}
        </Text>

        {profile && (
          <View style={styles.profileCard}>
            <View>
              <Text style={{ color: "#fff", fontWeight: "700" }}>{profile.name ?? "No name"}</Text>
              <Text style={{ color: "#aaa" }}>{profile.email}</Text>
            </View>
            <Pressable onPress={goToProfile} style={styles.editBtn}>
              <Text style={{ color: "#06B6D4" }}>Edit</Text>
            </Pressable>
          </View>
        )}

        <View style={styles.menuContainer}>
          <AnimatedCard onPress={goToUpload}>
            <Text style={styles.cardIcon}>🎵</Text>
            <Text style={styles.cardText}>Upload Audio File</Text>
          </AnimatedCard>

          <AnimatedCard onPress={goToIntegrate}>
            <Text style={styles.cardIcon}>📞</Text>
            <Text style={styles.cardText}>Integrate in Call</Text>
          </AnimatedCard>

          <AnimatedCard onPress={goToHistory}>
            <Text style={styles.cardIcon}>🕒</Text>
            <Text style={styles.cardText}>Processing History</Text>
          </AnimatedCard>

          <AnimatedCard onPress={goToGuide}>
            <Text style={styles.cardIcon}>📘</Text>
            <Text style={styles.cardText}>User Guide</Text>
          </AnimatedCard>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

/* AnimatedCard: simple scale-on-press card */
function AnimatedCard({ children, onPress }: { children: React.ReactNode; onPress: () => void }) {
  const scale = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scale, {
      toValue: 0.97,
      useNativeDriver: true,
      friction: 6,
      tension: 100,
    }).start();
  };
  const onPressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      friction: 6,
      tension: 100,
    }).start();
  };

  return (
    <Pressable onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut} style={{ marginVertical: 8 }}>
      <Animated.View style={[styles.card, { transform: [{ scale }] }]}>{children}</Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight ?? 0,
    flex: 1,
    backgroundColor: "#1E1E2F",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 5,
  },
  subtitle: {
    color: "#ccc",
    fontSize: 14,
    marginBottom: 12,
  },
  profileCard: {
    width: "100%",
    backgroundColor: "#23233A",
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  editBtn: { paddingHorizontal: 8, paddingVertical: 6 },
  menuContainer: {
    width: "100%",
    marginTop: 6,
  },
  card: {
    backgroundColor: "#29294D",
    borderRadius: 14,
    padding: 20,
    marginVertical: 6,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 4,
  },
  cardIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  cardText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});