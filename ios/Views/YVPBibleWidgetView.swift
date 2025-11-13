
import ExpoModulesCore
import YouVersionPlatform
import SwiftUI

class BibleWidgetViewProps: ExpoSwiftUI.ViewProps {
    // Bible reference
    @Field var versionId: Int
    @Field var bookUSFM: String
    @Field var chapter: Int
    @Field var verse: Int?
    @Field var verseStart: Int?
    @Field var verseEnd: Int?
    
    @Field var fontSize: Float?
    @Field var colorScheme: String?

}

struct YVPBibleWidgetView: ExpoSwiftUI.View, ExpoSwiftUI.WithHostingView {
    @ObservedObject var props: BibleWidgetViewProps
    @EnvironmentObject var shadowNodeProxy: ExpoSwiftUI.ShadowNodeProxy
    @Environment(\.colorScheme) var environmentColorScheme
    
    init(props: BibleWidgetViewProps) {
        self.props = props
    }
    
    var body: some View {
        ExpoSwiftUI.AutoSizingStack(shadowNodeProxy: shadowNodeProxy, axis: .vertical) {
            BibleWidgetView(
                reference: bibleReference(),
                fontSize: CGFloat(props.fontSize ?? 23)
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
    
    func bibleReference() -> BibleReference {
        if let start = props.verseStart, let end = props.verseEnd {
            return BibleReference(
                versionId: props.versionId,
                bookUSFM: props.bookUSFM,
                chapter: props.chapter,
                verseStart: start,
                verseEnd: end
            )
        }
        
        return BibleReference(
            versionId: props.versionId,
            bookUSFM: props.bookUSFM,
            chapter: props.chapter,
            verse: props.verse
        )
    }
}
