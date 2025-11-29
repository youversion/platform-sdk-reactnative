package com.youversion.reactnativesdk

import com.youversion.platform.core.YouVersionPlatformConfiguration
import com.youversion.reactnativesdk.api.YVPVotdApi
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.functions.Coroutine

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

        AsyncFunction("verseOfTheDay") Coroutine { dayOfYear: Int ->
            return@Coroutine YVPVotdApi.verseOfTheDay(
                dayOfYear = dayOfYear
            )
        }
    }
}
