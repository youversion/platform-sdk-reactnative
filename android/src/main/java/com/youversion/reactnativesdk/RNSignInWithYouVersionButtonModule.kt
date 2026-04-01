package com.youversion.reactnativesdk

import androidx.compose.runtime.remember
import com.youversion.reactnativesdk.views.SignInWithYouVersionButtonProps
import com.youversion.reactnativesdk.views.YVPSignInWithYouVersionButton
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.viewevent.getValue

class RNSignInWithYouVersionButtonModule : Module() {
    override fun definition() = ModuleDefinition {
        Name("SignInWithYouVersionButton")

        View(
            name = "YVPSignInWithYouVersionButton",
            events = { Events("onTap") }
        ) { props: SignInWithYouVersionButtonProps ->
            val onTap by remember { EventDispatcher<Unit>() }

            YVPSignInWithYouVersionButton(
                props = props
            ) {
                onTap(Unit)
            }
        }
    }
}