package com.youversion.reactnativesdk

import androidx.compose.runtime.remember
import com.youversion.reactnativesdk.views.VotdViewProps
import com.youversion.reactnativesdk.views.YVPVotdView
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.viewevent.getValue

class RNVotdViewModule : Module() {
    override fun definition() = ModuleDefinition {
        Name("VotdView")

        View(
            name = "YVPVotdView",
            events = { Events("onSharePress", "onFullChapterPress") }
        ) { props: VotdViewProps ->
            val onSharePress by remember { EventDispatcher<Unit>() }
            val onFullChapterPress by remember { EventDispatcher<Unit>() }

            YVPVotdView(
                props = props,
                onSharePress = { onSharePress(Unit) },
                onFullChapterPress = { onFullChapterPress(Unit) }
            )
        }
    }
}
