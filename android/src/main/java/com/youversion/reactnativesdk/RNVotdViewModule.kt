package com.youversion.reactnativesdk

import com.youversion.reactnativesdk.views.YVPVotdView
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class RNVotdViewModule : Module() {
    override fun definition() = ModuleDefinition {
        Name("VotdView")

        View(YVPVotdView::class)
    }
}
