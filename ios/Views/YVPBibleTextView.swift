
import ExpoModulesCore
import YouVersionPlatform
import SwiftUI

class BibleTextViewProps: ExpoSwiftUI.ViewProps {
    // Styling
    @Field var fontFamily: String?
    @Field var fontSize: CGFloat?
    @Field var lineSpacing: CGFloat?
    @Field var paragraphSpacing: CGFloat?
    @Field var textColor: UIColor?
    @Field var wocColor: UIColor?
    @Field var footnoteMode: String?
    @Field var renderVerseNumbers: Bool? = true
    
    // Bible reference
    @Field var versionId: Int
    @Field var bookUSFM: String
    @Field var chapter: Int
    @Field var verse: Int?
    @Field var verseStart: Int?
    @Field var verseEnd: Int?
    
    var onTap = EventDispatcher()
}

struct YVPBibleTextView: ExpoSwiftUI.View, ExpoSwiftUI.WithHostingView {
    @ObservedObject var props: BibleTextViewProps
    @EnvironmentObject var shadowNodeProxy: ExpoSwiftUI.ShadowNodeProxy
    
    init(props: BibleTextViewProps) {
        self.props = props
    }
    
    var body: some View {
        ExpoSwiftUI.AutoSizingStack(shadowNodeProxy: shadowNodeProxy, axis: .vertical) {
            BibleTextView(
                bibleReference(),
                textOptions: textOptions(),
                onVerseTap: { bibleRef, urlScheme, footnotes in
                    props.onTap([
                        "bibleReference": toJsBibleReference(bibleRef),
                        "urlScheme": urlScheme
                    ])
                }
            )
        }
    }
    
    func toJsBibleReference(_ bibleRef: BibleReference) -> [String: Any] {
        [
            "versionId": bibleRef.versionId,
            "bookUSFM": bibleRef.bookUSFM,
            "chapter": bibleRef.chapter,
            "verse": bibleRef.verseStart,
            "type": "verse"
        ]
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
    
    func textOptions() -> BibleTextOptions {
        BibleTextOptions(
            fontFamily: props.fontFamily ?? "Times New Roman",
            fontSize: props.fontSize ?? 16,
            lineSpacing: props.lineSpacing,
            paragraphSpacing: props.paragraphSpacing,
            textColor: textColor(),
            wocColor: wocColor(),
            renderVerseNumbers: props.renderVerseNumbers ?? true,
            footnoteMode: footnoteMode()
        )
    }
    
    func textColor() -> Color? {
        props.textColor == nil ? nil : Color(uiColor: props.textColor!)
    }
    
    func wocColor() -> Color {
        // If there's no wocColor provided, use the YouVersion red as default
        props.wocColor == nil ? Color(red: 1, green: 0x3d / 255.0, blue: 0x4d / 255.0) : Color(uiColor: props.wocColor!)
    }
    
    func footnoteMode() -> BibleTextFootnoteMode {
        switch(props.footnoteMode) {
        case "none": .none
        case "inline": .inline
        case "marker": .marker
        case "letters": .letters
        case "image": .image
        default: .none
        }
    }
}
