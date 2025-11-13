import { createNativeBottomTabNavigator } from "@react-navigation/bottom-tabs/unstable";
import { NavigationContainer } from "@react-navigation/native";
import { YouVersionPlatform } from "@youversion/react-native-sdk";
import { useEffect } from "react";

import { ProfileScreen } from "./src/screens/ProfileScreen";
import { ReaderScreen } from "./src/screens/ReaderScreen";
import { VotdScreen } from "./src/screens/VotdScreen";
import { WidgetScreen } from "./src/screens/WidgetScreen";

const Tabs = createNativeBottomTabNavigator();

export default function App() {
  useEffect(() => {
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
            tabBarIcon: { type: "sfSymbol", name: "book.closed.fill" },
          }}
        />
        <Tabs.Screen
          name="VOTD"
          component={VotdScreen}
          options={{
            tabBarLabel: "VOTD",
            tabBarIcon: { type: "sfSymbol", name: "sun.max.fill" },
          }}
        />
        <Tabs.Screen
          name="Widget"
          component={WidgetScreen}
          options={{
            tabBarLabel: "Widget",
            tabBarIcon: { type: "sfSymbol", name: "doc.plaintext.fill" },
          }}
        />
        <Tabs.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: { type: "sfSymbol", name: "person.fill" },
          }}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
}
