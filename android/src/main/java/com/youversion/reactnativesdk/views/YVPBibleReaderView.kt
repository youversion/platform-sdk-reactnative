package com.youversion.reactnativesdk.views

import android.content.Context
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.MutableState
import androidx.compose.runtime.mutableStateOf
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.youversion.platform.core.bibles.domain.BibleReference
import com.youversion.platform.ui.views.BibleText
import com.youversion.platform.ui.views.BibleTextOptions
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.views.ComposeProps
import expo.modules.kotlin.views.ExpoComposeView

data class BibleReaderViewProps(
    // Bible reference
    val versionId: MutableState<Int?> = mutableStateOf(null),
    val bookUSFM: MutableState<String?> = mutableStateOf(null),
    val chapter: MutableState<Int?> = mutableStateOf(null),
    val verse: MutableState<Int?> = mutableStateOf(null),
    val verseStart: MutableState<Int?> = mutableStateOf(null),
    val verseEnd: MutableState<Int?> = mutableStateOf(null),

    val appName: MutableState<String?> = mutableStateOf(null),
    val signInMessage: MutableState<String?> = mutableStateOf(null),
    val hasReference: MutableState<Boolean?> = mutableStateOf(false),
) : ComposeProps

class YVPBibleReaderView(context: Context, appContext: AppContext) :
    ExpoComposeView<BibleReaderViewProps>(context, appContext, withHostingView = true) {

    override val props = BibleReaderViewProps()

    @Composable
    override fun Content(modifier: Modifier) {
        // TODO: Replace with actual BibleReaderView when available in platform-reader
        // For now, provide a scrollable BibleText view

        val reference = bibleReference()

        MaterialTheme {
            Column(
                modifier = modifier
                    .fillMaxSize()
                    .verticalScroll(rememberScrollState())
                    .padding(16.dp)
            ) {
                if (reference != null) {
                    BibleText(
                        reference = reference,
                        textOptions = BibleTextOptions()
                    )
                } else {
                    Text(
                        text = "Select a Bible passage to read",
                        style = MaterialTheme.typography.bodyLarge
                    )
                }
            }
        }
    }

    private fun bibleReference(): BibleReference? {
        if (props.hasReference.value != true) return null

        val versionId = props.versionId.value ?: return null
        val bookUSFM = props.bookUSFM.value ?: return null
        val chapter = props.chapter.value ?: return null

        val verseStart = props.verseStart.value
        val verseEnd = props.verseEnd.value

        return if (verseStart != null && verseEnd != null) {
            BibleReference(
                versionId = versionId,
                bookUSFM = bookUSFM,
                chapter = chapter,
                verseStart = verseStart,
                verseEnd = verseEnd
            )
        } else {
            BibleReference(
                versionId = versionId,
                bookUSFM = bookUSFM,
                chapter = chapter,
                verse = props.verse.value
            )
        }
    }
}
