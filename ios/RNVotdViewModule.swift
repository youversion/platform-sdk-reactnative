import ExpoModulesCore
import ExpoUI

public class RNVotdViewModule: Module {
  public func definition() -> ModuleDefinition {
    Name("VotdView")

    ExpoUIView(YVPVotdView.self)
  }
}
