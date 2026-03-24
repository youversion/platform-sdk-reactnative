import ExpoModulesCore
import ExpoUI

public class RNBibleWidgetViewModule: Module {
  public func definition() -> ModuleDefinition {
    Name("BibleWidgetView")

    ExpoUIView(YVPBibleWidgetView.self)
  }
}
