import ExpoModulesCore
import ExpoUI

public class RNSignInWithYouVersionButtonModule: Module {
  public func definition() -> ModuleDefinition {
    Name("SignInWithYouVersionButton")

    ExpoUIView(YVPSignInWithYouVersionButton.self)
  }
}
