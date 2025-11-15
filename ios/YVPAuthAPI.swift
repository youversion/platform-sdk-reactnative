import ExpoModulesCore
import YouVersionPlatform
import AuthenticationServices

struct YVPAuthAPI {
    static func signIn(permissions: [String], promise: Promise) {
        let permissionsSet = Set<SignInWithYouVersionPermission>(
            permissions.compactMap(SignInWithYouVersionPermission.init(rawValue:))
          )
        
        Task {
            do {
                let response = try await YouVersionAPI.Users.signIn(
                    permissions: permissionsSet,
                    contextProvider: ContextProvider()
                )

                if let msg = response.errorMsg, !msg.isEmpty {
                    promise.reject(YVPError.signInError(message: msg))
                    return
                }
            
                promise.resolve([
                    "accessToken": response.accessToken,
                    "permissions": response.permissions.map(\.rawValue),
                    "yvpUserId": response.yvpUserId
                  ])
            } catch {
                promise.reject(error)
            }
        }
    }
    
    static func signOut() async {
        await MainActor.run {
            YouVersionAPI.Users.signOut()
        }
    }
    
    static func userInfo(accessToken: String?, promise: Promise) {
        Task {
            do {
                let response = try await YouVersionAPI.Users.userInfo(accessToken: accessToken)
                
                promise.resolve([
                    "firstName": response.firstName,
                    "lastName": response.lastName,
                    "userId": response.userId,
                    "avatarUrl": response.avatarUrl?.absoluteString
                ])
            } catch {
                promise.reject(error)
            }
        }
    }
}


class ContextProvider: NSObject, ASWebAuthenticationPresentationContextProviding {
    func presentationAnchor(for session: ASWebAuthenticationSession) -> ASPresentationAnchor {
        guard let scene = UIApplication.shared.connectedScenes.first as? UIWindowScene,
              let window = scene.windows.first else {
            return ASPresentationAnchor()
        }
        return window
    }
}

enum YVPError : Error {
    case signInError(message: String)
}
