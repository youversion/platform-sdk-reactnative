import ExpoModulesCore

public class RNBibleReaderViewModule: Module {
  public func definition() -> ModuleDefinition {
    Name("BibleReaderView")

    View(YVPBibleReaderView.self)
  }
}
