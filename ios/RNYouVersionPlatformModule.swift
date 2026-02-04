import ExpoModulesCore

public class RNYouVersionPlatformModule: Module {
    public func definition() -> ModuleDefinition {
        Name("RNYouVersionPlatform")

        AsyncFunction("configure") { (appKey: String) async -> Void in
            await YVPlatform.configure(appKey: appKey)
        }
        
        AsyncFunction("setApiHost") { (apiHost: String) async -> Void in
            YVPlatform.setApiHost(apiHost: apiHost)
        }
        
        Function("getAccessToken") { () -> String? in
            return YVPlatform.getAccessToken()
        }

        AsyncFunction("signIn") { (
            permissions: [String],
            promise: Promise
        ) in
            YVPAuthAPI.signIn(
                permissions: permissions,
                promise: promise
            )
        }
        
        AsyncFunction("signOut") { () async -> Void in
            await YVPAuthAPI.signOut()
        }
        
        AsyncFunction("userInfo") { (
            promise: Promise
        ) in
            YVPAuthAPI.userInfo(promise: promise)
        }
        
        AsyncFunction("verseOfTheDay") { (
            dayOfYear: Int,
            promise: Promise
        ) in
            YVPVotdAPI.verseOfTheDay(dayOfYear: dayOfYear, promise: promise)
        }
        
        AsyncFunction("createHighlight") { (bibleId: Int, passageId: String, color: String, promise: Promise) in
            YVPHighlightsAPI.createHighlight(bibleId: bibleId, passageId: passageId, color: color, promise: promise)
        }
        
        AsyncFunction("getHighlights") { (bibleId: Int, passageId: String, promise: Promise) in
            YVPHighlightsAPI.getHighlights(bibleId: bibleId, passageId: passageId, promise: promise)
        }
        
        AsyncFunction("updateHighlight") { (bibleId: Int, passageId: String, color: String, promise: Promise) in
            YVPHighlightsAPI.updateHighlight(bibleId: bibleId, passageId: passageId, color: color, promise: promise)
        }
        
        AsyncFunction("deleteHighlight") { (bibleId: Int, passageId: String, promise: Promise) in
            YVPHighlightsAPI.deleteHighlight(bibleId: bibleId, passageId: passageId, promise: promise)
        }
        
        AsyncFunction("languages") { (country: String?, promise: Promise) in
            YVPLanguagesAPI.languages(country: country, promise: promise)
        }
        
        AsyncFunction("versions") { (languageTag: String?, promise: Promise) in
            YVPBibleAPI.versions(languageTag: languageTag, promise: promise)
        }
        
        AsyncFunction("version") { (versionId: Int, promise: Promise) in
            YVPBibleAPI.version(versionId: versionId, promise: promise)
        }
        
        AsyncFunction("chapter") { (bibleReference: BibleReferenceRecord, promise: Promise) in
            YVPBibleAPI.chapter(bibleReference: bibleReference, promise: promise)
        }
    }
}
