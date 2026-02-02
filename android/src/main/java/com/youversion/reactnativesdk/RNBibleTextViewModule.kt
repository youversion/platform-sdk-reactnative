package com.youversion.reactnativesdk

import com.youversion.reactnativesdk.views.YVPBibleTextView
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class RNBibleTextViewModule : Module() {
    override fun definition() = ModuleDefinition {
        Name("BibleTextView")

        View(YVPBibleTextView::class) {
            Events("onTap")
        }
    }
}
