import { createNativeBottomTabNavigator } from "@react-navigation/bottom-tabs/unstable";
import { NavigationContainer } from "@react-navigation/native";
import { YouVersionPlatform } from "@youversion/platform-sdk-reactnative";
import { useEffect } from "react";
import { Platform } from "react-native";

import { ProfileScreen } from "./src/screens/ProfileScreen";
import { ReaderScreen } from "./src/screens/ReaderScreen";
import { VotdScreen } from "./src/screens/VotdScreen";
import { WidgetScreen } from "./src/screens/WidgetScreen";

const Tabs = createNativeBottomTabNavigator();

export default function App() {
  useEffect(() => {
    // Get an app key at https://platform.youversion.com/
    YouVersionPlatform.configure("");
  }, []);

  return (
    <NavigationContainer>
      <Tabs.Navigator screenOptions={{ headerShown: false }}>
        <Tabs.Screen
          name="Reader"
          component={ReaderScreen}
          options={{
            tabBarLabel: "Bible",
            tabBarIcon:
              Platform.OS === "ios"
                ? { type: "sfSymbol", name: "book.fill" }
                : {
                    type: "image",
                    source: require("./assets/reader.png"),
                  },
          }}
        />
        <Tabs.Screen
          name="VOTD"
          component={VotdScreen}
          options={{
            tabBarLabel: "VOTD",
            tabBarIcon:
              Platform.OS === "ios"
                ? { type: "sfSymbol", name: "sun.max.fill" }
                : {
                    type: "image",
                    source: require("./assets/votd.png"),
                  },
          }}
        />
        <Tabs.Screen
          name="Widget"
          component={WidgetScreen}
          options={{
            tabBarLabel: "Widget",
            tabBarIcon:
              Platform.OS === "ios"
                ? { type: "sfSymbol", name: "doc.plaintext.fill" }
                : {
                    type: "image",
                    source: require("./assets/widget.png"),
                  },
          }}
        />
        <Tabs.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: "Profile",
            tabBarIcon:
              Platform.OS === "ios"
                ? { type: "sfSymbol", name: "person.fill" }
                : {
                    type: "image",
                    source: require("./assets/profile.png"),
                  },
          }}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
}
