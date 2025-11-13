
import ExpoModulesCore
import YouVersionPlatform
import SwiftUI

class BibleReaderViewProps: ExpoSwiftUI.ViewProps {
    // Bible reference
    @Field var versionId: Int
    @Field var bookUSFM: String
    @Field var chapter: Int
    @Field var verse: Int?
    @Field var verseStart: Int?
    @Field var verseEnd: Int?
    
    @Field var appName: String
    @Field var signInMessage: String
    @Field var hasReference: Bool
}

struct YVPBibleReaderView: ExpoSwiftUI.View, ExpoSwiftUI.WithHostingView {
    @ObservedObject var props: BibleReaderViewProps
    
    init(props: BibleReaderViewProps) {
        self.props = props
    }
    
    var body: some View {
        BibleReaderView(
            reference: bibleReference(),
            appName: props.appName,
            signInMessage: props.signInMessage
        )
    }
    
    func bibleReference() -> BibleReference? {
        if let start = props.verseStart, let end = props.verseEnd {
            return BibleReference(
                versionId: props.versionId,
                bookUSFM: props.bookUSFM,
                chapter: props.chapter,
                verseStart: start,
                verseEnd: end
            )
        }
        
        if props.hasReference {
            return BibleReference(
                versionId: props.versionId,
                bookUSFM: props.bookUSFM,
                chapter: props.chapter,
                verse: props.verse
            )
        }
        
        return nil
    }
}
