package com.youversion.reactnativesdk

import com.youversion.reactnativesdk.views.YVPSignInWithYouVersionButton
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class RNSignInWithYouVersionButtonModule : Module() {
    override fun definition() = ModuleDefinition {
        Name("SignInWithYouVersionButton")

        View(YVPSignInWithYouVersionButton::class) {
            Events("onTap")
        }
    }
}