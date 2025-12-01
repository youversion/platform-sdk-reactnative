package com.youversion.reactnativesdk

import com.youversion.platform.core.YouVersionPlatformConfiguration
import com.youversion.reactnativesdk.api.BibleReferenceRecord
import com.youversion.reactnativesdk.api.YVPBibleApi
import com.youversion.reactnativesdk.api.YVPHighlightsApi
import com.youversion.reactnativesdk.api.YVPLanguagesApi
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

        AsyncFunction("languages") Coroutine { country: String? ->
            return@Coroutine YVPLanguagesApi.languages(
                country = country
            )
        }

        AsyncFunction("versions") Coroutine { languageTag: String? ->
            return@Coroutine YVPBibleApi.versions(
                languageTag = languageTag
            )
        }

        AsyncFunction("version") Coroutine { versionId: Int ->
            return@Coroutine YVPBibleApi.version(
                versionId = versionId
            )
        }

        AsyncFunction("chapter") Coroutine { bibleReference: BibleReferenceRecord ->
            val context = appContext.reactContext
                ?: throw IllegalStateException("ReactContext is not available yet")

            return@Coroutine YVPBibleApi.chapter(
                bibleReference = bibleReference,
                context = context
            )
        }

        AsyncFunction("createHighlight") Coroutine { bibleId: Int, passageId: String, color: String ->
            return@Coroutine YVPHighlightsApi.createHighlight(
                bibleId = bibleId,
                passageId = passageId,
                color = color
            )
        }

        AsyncFunction("getHighlights") Coroutine { bibleId: Int, passageId: String ->
            return@Coroutine YVPHighlightsApi.getHighlights(
                bibleId = bibleId,
                passageId = passageId,
            )
        }

        AsyncFunction("updateHighlight") Coroutine { bibleId: Int, passageId: String, color: String ->
            return@Coroutine YVPHighlightsApi.updateHighlight(
                bibleId = bibleId,
                passageId = passageId,
                color = color
            )
        }

        AsyncFunction("deleteHighlight") Coroutine { bibleId: Int, passageId: String ->
            return@Coroutine YVPHighlightsApi.deleteHighlight(
                bibleId = bibleId,
                passageId = passageId
            )
        }
    }
}
