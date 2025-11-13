import ExpoModulesCore
import YouVersionPlatform

struct YVPLanguagesAPI {
    static func languages(country: String?, promise: Promise) {
        Task {
            do {
                let response = try await YouVersionAPI.Languages.languages(country: country)
                let records = response.map(LanguageRecord.init)
        
                promise.resolve(records)
            } catch {
                promise.reject(error)
            }
        }
    }
}



internal struct LanguageRecord: Record {
    init() { }
    
    @Field
    var id: String
    
    @Field
    var language: String
    
    @Field
    var script: String?
    
    @Field
    var scriptName: String?
    
    @Field
    var aliases: [String]
    
    @Field
    var displayNames: [String: String]
    
    @Field
    var scripts: [String]
    
    @Field
    var variants: [String]
    
    @Field
    var countries: [String]
    
    @Field
    var textDirection: String
    
    @Field
    var defaultBibleVersionId: Int?
    
    init(_ response: LanguageOverview) {
        self.id = response.id
        self.language = response.language
        self.script = response.script
        self.scriptName = response.scriptName
        self.aliases = response.aliases
        self.displayNames = response.displayNames
        self.scripts = response.scripts
        self.variants = response.variants
        self.countries = response.countries
        self.textDirection = response.textDirection
        self.defaultBibleVersionId = response.defaultBibleVersionId
    }
}
