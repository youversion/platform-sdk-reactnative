package com.youversion.reactnativesdk.views

import androidx.compose.runtime.Composable
import com.youversion.platform.core.bibles.domain.BibleReference
import com.youversion.platform.reader.BibleReader
import expo.modules.kotlin.views.ComposeProps

const val DEFAULT_BEREAN_STANDARD_BIBLE_VERSION = 3034

data class BibleReaderViewProps(
    val versionId: Int? = null,
    val bookUSFM: String? = null,
    val chapter: Int? = null,
    val verse: Int? = null,
    val verseStart: Int? = null,
    val verseEnd: Int? = null,
    val appName: String? = null,
    val signInMessage: String? = null,
    val hasReference: Boolean? = null
) : ComposeProps

@Composable
fun YVPBibleReaderView(props: BibleReaderViewProps) {
    BibleReader(
        appName = props.appName ?: "",
        appSignInMessage = props.signInMessage ?: "",
        bibleReference = bibleReference(props),
    )
}

fun bibleReference(props: BibleReaderViewProps): BibleReference? {
    val start = props.verseStart
    val end = props.verseEnd

    if (start != null && end != null) {
        return BibleReference(
            versionId = props.versionId ?: DEFAULT_BEREAN_STANDARD_BIBLE_VERSION,
            bookUSFM = props.bookUSFM ?: "JHN",
            chapter = props.chapter ?: 1,
            verseStart = start,
            verseEnd = end
        )
    }

    if (props.hasReference == true) {
        return BibleReference(
            versionId = props.versionId ?: DEFAULT_BEREAN_STANDARD_BIBLE_VERSION,
            bookUSFM = props.bookUSFM ?: "JHN",
            chapter = props.chapter ?: 1,
            verse = props.verse
        )
    }

    return null
}
