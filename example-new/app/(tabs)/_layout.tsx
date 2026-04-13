import { DynamicColorIOS } from 'react-native'
import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs'

export default function TabLayout() {
  return (
    <NativeTabs
      labelStyle={{
        // For the text color
        color: DynamicColorIOS({
          dark: 'white',
          light: 'black',
        }),
      }}
      // For the selected icon color
      tintColor={DynamicColorIOS({
        dark: 'white',
        light: 'black',
      })}
    >
      <NativeTabs.Trigger name="index">
        <Label>Home</Label>
        <Icon sf="house.fill" drawable="custom_android_drawable" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="explore">
        <Label>Explore</Label>
        <Icon sf="gear" drawable="custom_settings_drawable" />
      </NativeTabs.Trigger>
    </NativeTabs>
  )
}
