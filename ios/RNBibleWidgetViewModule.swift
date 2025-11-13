import ExpoModulesCore

public class RNBibleWidgetViewModule: Module {
  public func definition() -> ModuleDefinition {
    Name("BibleWidgetView")

    View(YVPBibleWidgetView.self)
  }
}
