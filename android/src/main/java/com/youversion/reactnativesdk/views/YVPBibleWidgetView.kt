package com.youversion.reactnativesdk.views

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.sp
import com.youversion.platform.core.bibles.domain.BibleReference
import com.youversion.platform.ui.views.BibleTextOptions
import com.youversion.platform.ui.views.card.BibleCard
import expo.modules.kotlin.views.ComposeProps

data class BibleWidgetViewProps(
    // Bible reference
    val versionId: Int? = null,
    val bookUSFM: String? = null,
    val chapter: Int? = null,
    val verse: Int? = null,
    val verseStart: Int? = null,
    val verseEnd: Int? = null,

    val fontSize: Float? = 23f,
    val colorScheme: String? = null,
) : ComposeProps

@Composable
fun YVPBibleWidgetView(props: BibleWidgetViewProps) {
    BibleCard(
        reference = bibleReference(props),
        textOptions = textOptions(props),
        modifier = Modifier.fillMaxHeight(),
    )
}

fun textOptions(props: BibleWidgetViewProps): BibleTextOptions {
    if (props.fontSize == null) {
        return BibleTextOptions()
    }

    return BibleTextOptions(fontSize = props.fontSize.sp)
}

fun bibleReference(props: BibleWidgetViewProps): BibleReference {
    if (props.chapter == null) {
        throw IllegalStateException("Chapter is required")
    }

    if (props.bookUSFM == null) {
        throw IllegalStateException("Book is required")
    }

    if (props.versionId == null) {
        throw IllegalStateException("Version is required")
    }

    val start = props.verseStart
    val end = props.verseEnd

    if (start != null && end != null) {
        return BibleReference(
            versionId = props.versionId,
            bookUSFM = props.bookUSFM,
            chapter = props.chapter,
            verseStart = start,
            verseEnd = end
        )
    }

    return BibleReference(
        versionId = props.versionId,
        bookUSFM = props.bookUSFM,
        chapter = props.chapter,
        verse = props.verse
    )
}

@Composable
fun isDark(props: BibleWidgetViewProps): Boolean {
    return when (props.colorScheme) {
        "dark" -> true
        "light" -> false
        else -> isSystemInDarkTheme()
    }
}