package com.youversion.reactnativesdk

import com.youversion.reactnativesdk.views.YVPBibleWidgetView
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class RNBibleWidgetViewModule : Module() {
    override fun definition() = ModuleDefinition {
        Name("BibleWidgetView")

        View(YVPBibleWidgetView::class)
    }
}
