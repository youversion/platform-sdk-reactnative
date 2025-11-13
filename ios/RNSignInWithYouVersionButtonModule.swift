import ExpoModulesCore

public class RNSignInWithYouVersionButtonModule: Module {
  public func definition() -> ModuleDefinition {
    Name("SignInWithYouVersionButton")

    View(YVPSignInWithYouVersionButton.self)
  }
}
