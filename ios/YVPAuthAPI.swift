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

                promise.resolve([
                    "accessToken": response.accessToken,
                    "permissions": response.permissions.map(\.rawValue),
                    "yvpUserId": response.yvpUserId,
                    "expiryDate": formatExpiryDate(response.expiryDate),
                    "refreshToken": response.refreshToken,
                    "name": response.name,
                    "profilePicture": response.profilePicture,
                    "email": response.email,
                    "idToken": response.idToken,
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
    
    static func userInfo(promise: Promise) {
        promise.resolve([
            "name": YouVersionAPI.Users.currentUserName,
            "email": YouVersionAPI.Users.currentUserEmail,
            "id": YouVersionAPI.Users.currentUserId,
            "profilePicture": YouVersionAPI.Users.currentUserProfilePicture
        ])
    }
}

private let isoFormatter: ISO8601DateFormatter = {
    let f = ISO8601DateFormatter()
    f.formatOptions = [.withInternetDateTime, .withFractionalSeconds]
    return f
}()

func formatExpiryDate(_ expiryDate: Date?) -> String? {
    expiryDate.map { isoFormatter.string(from: $0) }
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
