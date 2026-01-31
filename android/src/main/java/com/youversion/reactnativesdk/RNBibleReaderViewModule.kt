package com.youversion.reactnativesdk

import com.youversion.reactnativesdk.views.YVPBibleReaderView
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class RNBibleReaderViewModule : Module() {
    override fun definition() = ModuleDefinition {
        Name("BibleReaderView")

        View(YVPBibleReaderView::class)
    }
}
