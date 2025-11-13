import ExpoModulesCore
import YouVersionPlatform

struct YVPHighlightsAPI {
    
    static func createHighlight(bibleId: Int, passageId: String, color: String, promise: Promise) {
        Task {
            do {
                let response = try await YouVersionAPI.Highlights.createHighlight(
                    bibleId: bibleId,
                    passageId: passageId,
                    color: color
                )
                
                promise.resolve(response)
            } catch {
                promise.reject(error)
            }
        }
    }
    
    static func getHighlights(bibleId: Int, passageId: String, promise: Promise) {
        Task {
            do {
                let response = try await YouVersionAPI.Highlights.getHighlights(
                    bibleId: bibleId,
                    passageId: passageId
                )
                
                let records = response.map(HighlightRecord.init)
        
                promise.resolve(records)
            } catch {
                promise.reject(error)
            }
        }
    }
    
    static func updateHighlight(bibleId: Int, passageId: String, color: String, promise: Promise) {
        Task {
            do {
                let response = try await YouVersionAPI.Highlights.updateHighlight(
                    bibleId: bibleId,
                    passageId: passageId,
                    color: color
                )
                
                promise.resolve(response)
            } catch {
                promise.reject(error)
            }
        }
    }
    
    static func deleteHighlight(bibleId: Int, passageId: String, promise: Promise) {
        Task {
            do {
                let response = try await YouVersionAPI.Highlights.deleteHighlight(
                    bibleId: bibleId,
                    passageId: passageId
                )
                
                promise.resolve(response)
            } catch {
                promise.reject(error)
            }
        }
    }
}


internal struct HighlightRecord: Record {
    init() { }
    
    @Field
    var id: String?
    
    @Field
    var bibleId: Int
    
    @Field
    var passageId: String
    
    @Field
    var color: String
    
    @Field
    var userId: String?
    
    @Field
    var createTime: String?
    
    @Field
    var updateTime: String?
    
    init(_ response: HighlightResponse) {
        self.id = response.id
        self.bibleId = response.bibleId
        self.passageId = response.passageId
        self.color = response.color
        self.userId = response.userId
        self.createTime = response.createTime
        self.updateTime = response.updateTime
    }
}
