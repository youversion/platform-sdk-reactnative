import ExpoModulesCore
import ExpoUI

public class RNBibleTextViewModule: Module {
  public func definition() -> ModuleDefinition {
    Name("BibleTextView")

    ExpoUIView(YVPBibleTextView.self)
  }
}
