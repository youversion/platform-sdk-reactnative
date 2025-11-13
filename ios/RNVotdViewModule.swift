import ExpoModulesCore

public class RNVotdViewModule: Module {
  public func definition() -> ModuleDefinition {
    Name("VotdView")

    View(YVPVotdView.self)
  }
}
