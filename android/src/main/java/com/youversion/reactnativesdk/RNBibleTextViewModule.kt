package com.youversion.reactnativesdk

import androidx.compose.runtime.remember
import com.youversion.reactnativesdk.api.VerseTappedEvent
import com.youversion.reactnativesdk.views.BibleTextViewProps
import com.youversion.reactnativesdk.views.YVPBibleTextView
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.viewevent.getValue

class RNBibleTextViewModule : Module() {
    override fun definition() = ModuleDefinition {
        Name("BibleTextView")

        View(
            name = "YVPBibleTextView",
            events = { Events("onTap") }
        ) { props: BibleTextViewProps ->
            val onTap by remember { EventDispatcher<VerseTappedEvent>() }

            YVPBibleTextView(props) { event: VerseTappedEvent ->
                onTap(event)
            }
        }
    }
}
