import {
  SignInWithYouVersionButton,
  YouVersionAPI,
  YouVersionPlatform,
  YouVersionUserInfo,
} from "@youversion/react-native-sdk";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

export function ProfileScreen() {
  const [currentUser, setCurrentUser] = useState<YouVersionUserInfo>();
  const [loading, setLoading] = useState<boolean>(
    () => !!YouVersionPlatform.getAccessToken(),
  );

  useLayoutEffect(() => {
    const accessToken = YouVersionPlatform.getAccessToken();
    if (!accessToken) return;

    async function fetchUserInfo() {
      try {
        const userInfo = await YouVersionAPI.Users.userInfo();
        setCurrentUser(userInfo);
      } catch (error) {
        console.error("Error fetching user info:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserInfo();
  }, []);

  async function handleSignIn() {
    try {
      await YouVersionAPI.Users.signIn({
        requiredPermissions: ["bibles"],
        optionalPermissions: ["highlights"],
      });

      const userInfo = await YouVersionAPI.Users.userInfo();
      setCurrentUser(userInfo);
    } catch (error) {
      Alert.alert("Error signing in");
      console.error("Error signing in:", error);
    }
  }

  function handleSignOut() {
    setCurrentUser(undefined);
    YouVersionAPI.Users.signOut();
  }

  if (loading) {
    return (
      <View style={styles.screen}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      {currentUser && (
        <>
          <Image
            source={{ uri: currentUser.avatarUrl }}
            style={styles.avatar}
          />
          <Text>
            You are signed in as {currentUser.firstName || "(no firstname)"}{" "}
            {currentUser.lastName || "(no lastname)"}
          </Text>
          <Button title="Sign Out" onPress={handleSignOut} />
        </>
      )}
      {!currentUser && <SignInWithYouVersionButton onPress={handleSignIn} />}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginBottom: 20,
    backgroundColor: "#eee",
  },
});
