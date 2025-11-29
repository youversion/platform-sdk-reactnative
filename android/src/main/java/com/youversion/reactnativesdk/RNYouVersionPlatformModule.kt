package com.youversion.reactnativesdk

import com.youversion.platform.core.YouVersionPlatformConfiguration
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class RNYouVersionPlatformModule : Module() {
    override fun definition() = ModuleDefinition {
        Name("RNYouVersionPlatform")

        Function("configure") { appKey: String ->
            val context = appContext.reactContext
                ?: throw IllegalStateException("ReactContext is not available yet")

            YouVersionPlatformConfiguration.configure(
                context = context,
                appKey = appKey,
            )
        }

        Function("setApiHost") { apiHost: String ->
            YouVersionPlatformConfiguration.setApiHost(apiHost)
        }
        
        Function("getAccessToken") {
            YouVersionPlatformConfiguration.accessToken
        }
    }
}