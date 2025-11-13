import ExpoModulesCore
import YouVersionPlatform
import SwiftUI

class SignInWithYouVersionButtonProps: ExpoSwiftUI.ViewProps {
    @Field var mode: String = "full"
    @Field var shape: String = "capsule"
    @Field var isStroked: Bool = true
    @Field var colorScheme: String?
    var onTap = EventDispatcher()
}

struct YVPSignInWithYouVersionButton: ExpoSwiftUI.View, ExpoSwiftUI.WithHostingView {
    @ObservedObject var props: SignInWithYouVersionButtonProps
    @EnvironmentObject var shadowNodeProxy: ExpoSwiftUI.ShadowNodeProxy
    @Environment(\.colorScheme) var environmentColorScheme
    
    init(props: SignInWithYouVersionButtonProps) {
        self.props = props
    }
    
    var body: some View {
        ExpoSwiftUI.AutoSizingStack (shadowNodeProxy: shadowNodeProxy, axis: .both) {
            SignInWithYouVersionButton(
                shape: shape(),
                mode: mode(),
                isStroked: props.isStroked
            ) {
                props.onTap()
            }.environment(\.colorScheme, colorScheme())
        }
    }
    
    func shape() -> SignInWithYouVersionButton.ButtonShape {
        switch(props.shape) {
        case "capsule": return .capsule
        default: return .rectangle
        }
    }
    
    func mode() -> SignInWithYouVersionButton.Mode {
        return SignInWithYouVersionButton.Mode(rawValue: props.mode) ?? SignInWithYouVersionButton.Mode.full
    }
    
    func colorScheme() -> ColorScheme {
        switch props.colorScheme?.lowercased() {
        case "dark": return .dark
        case "light": return .light
        default: return environmentColorScheme
        }
    }
}
