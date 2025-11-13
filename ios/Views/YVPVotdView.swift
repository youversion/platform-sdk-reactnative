
import ExpoModulesCore
import YouVersionPlatform
import SwiftUI

class VotdViewProps: ExpoSwiftUI.ViewProps {
    @Field var bibleVersionId: Int?
    @Field var colorScheme: String? = nil
}

struct YVPVotdView: ExpoSwiftUI.View, ExpoSwiftUI.WithHostingView {
    @ObservedObject var props: VotdViewProps
    @EnvironmentObject var shadowNodeProxy: ExpoSwiftUI.ShadowNodeProxy
    @Environment(\.colorScheme) var environmentColorScheme
    
    init(props: VotdViewProps) {
        self.props = props
    }
    
    var body: some View {
        ExpoSwiftUI.AutoSizingStack(shadowNodeProxy: shadowNodeProxy, axis: .vertical) {
            VotdView(
                bibleVersionId: props.bibleVersionId ?? 111
            ).environment(\.colorScheme, colorScheme())
        }
    }
    
    func colorScheme() -> ColorScheme {
        switch props.colorScheme?.lowercased() {
        case "dark": return .dark
        case "light": return .light
        default: return environmentColorScheme
        }
    }
}
