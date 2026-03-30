import ExpoModulesCore
import ExpoUI

public class RNBibleReaderViewModule: Module {
  public func definition() -> ModuleDefinition {
    Name("BibleReaderView")

    ExpoUIView(YVPBibleReaderView.self)
  }
}
