import ExpoModulesCore

public class RNBibleTextViewModule: Module {
  public func definition() -> ModuleDefinition {
    Name("BibleTextView")

    View(YVPBibleTextView.self)
  }
}
