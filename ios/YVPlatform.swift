import YouVersionPlatform

struct YVPlatform {
    static func configure(appKey: String) async {
        await MainActor.run {
            YouVersionPlatform.configure(appKey: appKey)
        }
    }
    
    static func setApiHost(apiHost: String) {
        YouVersionPlatformConfiguration.apiHost = apiHost
    }
    
    static func getAccessToken() -> String? {
        return YouVersionPlatformConfiguration.accessToken
    }
}
