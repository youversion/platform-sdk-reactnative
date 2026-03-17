package com.youversion.reactnativesdk.views

import android.content.Context
import androidx.compose.runtime.Composable
import androidx.compose.runtime.MutableState
import androidx.compose.runtime.mutableStateOf
import androidx.compose.ui.Modifier
import com.youversion.platform.core.bibles.domain.BibleReference
import com.youversion.platform.reader.BibleReader
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.views.ComposableScope
import expo.modules.kotlin.views.ComposeProps
import expo.modules.kotlin.views.ExpoComposeView

const val DEFAULT_BEREAN_STANDARD_BIBLE_VERSION = 3034

data class BibleReaderViewProps(
    val versionId: MutableState<Int?> = mutableStateOf(null),
    val bookUSFM: MutableState<String?> = mutableStateOf(null),
    val chapter: MutableState<Int?> = mutableStateOf(null),
    val verse: MutableState<Int?> = mutableStateOf(null),
    val verseStart: MutableState<Int?> = mutableStateOf(null),
    val verseEnd: MutableState<Int?> = mutableStateOf(null),
    val appName: MutableState<String?> = mutableStateOf(null),
    val signInMessage: MutableState<String?> = mutableStateOf(null),
    val hasReference: MutableState<Boolean?> = mutableStateOf(null)
) : ComposeProps

class YVPBibleReaderView(context: Context, appContext: AppContext) :
    ExpoComposeView<BibleReaderViewProps>(context, appContext, withHostingView = true) {
    override val props = BibleReaderViewProps()

    @Composable
    override fun ComposableScope.Content() {
        BibleReader(
            appName = props.appName.value ?: "",
            appSignInMessage = props.signInMessage.value ?: "",
            bibleReference = bibleReference(),
        )
    }

    fun bibleReference(): BibleReference? {
        val start = props.verseStart.value
        val end = props.verseEnd.value

        if (start != null && end != null) {
            return BibleReference(
                versionId = props.versionId.value ?: DEFAULT_BEREAN_STANDARD_BIBLE_VERSION,
                bookUSFM = props.bookUSFM.value ?: "JHN",
                chapter = props.chapter.value ?: 1,
                verseStart = start,
                verseEnd = end
            )
        }

        if (props.hasReference.value == true) {
            return BibleReference(
                versionId = props.versionId.value ?: DEFAULT_BEREAN_STANDARD_BIBLE_VERSION,
                bookUSFM = props.bookUSFM.value ?: "JHN",
                chapter = props.chapter.value ?: 1,
                verse = props.verse.value
            )
        }

        return null
    }
}
