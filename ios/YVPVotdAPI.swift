import ExpoModulesCore
import YouVersionPlatform


struct YVPVotdAPI {
    static func verseOfTheDay(dayOfYear: Int, promise: Promise) {
        Task {  @MainActor in
            do {
                let response = try await YouVersionAPI.VOTD.verseOfTheDay(dayOfYear: dayOfYear)
                
                promise.resolve([
                    "passageId": response.passageId,
                    "day": response.day
                ])
            } catch {
                promise.reject(error)
            }
        }
    }
}
