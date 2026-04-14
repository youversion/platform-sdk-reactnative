import { DynamicColorIOS, Platform } from 'react-native'
import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs'

const dynamicColor =
  Platform.OS === 'ios'
    ? DynamicColorIOS({ dark: 'white', light: 'black' })
    : undefined

export default function TabLayout() {
  return (
    <NativeTabs
      labelStyle={dynamicColor ? { color: dynamicColor } : undefined}
      tintColor={dynamicColor}
    >
      <NativeTabs.Trigger name="index">
        <Label>Home</Label>
        <Icon sf="house.fill" drawable="ic_dialog_info" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="explore">
        <Label>Explore</Label>
        <Icon sf="gear" drawable="ic_menu_manage" />
      </NativeTabs.Trigger>
    </NativeTabs>
  )
}
