package com.youversion.reactnativesdk.views

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.runtime.Composable
import androidx.compose.runtime.MutableState
import androidx.compose.runtime.mutableStateOf
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.sp
import com.youversion.platform.core.bibles.domain.BibleReference
import com.youversion.platform.ui.views.BibleTextOptions
import com.youversion.platform.ui.views.card.BibleCard
import expo.modules.kotlin.views.ComposeProps

data class BibleWidgetViewProps(
    // Bible reference
    val versionId: MutableState<Int?> = mutableStateOf(null),
    val bookUSFM: MutableState<String?> = mutableStateOf(null),
    val chapter: MutableState<Int?> = mutableStateOf(null),
    val verse: MutableState<Int?> = mutableStateOf(null),
    val verseStart: MutableState<Int?> = mutableStateOf(null),
    val verseEnd: MutableState<Int?> = mutableStateOf(null),

    val fontSize: MutableState<Float?> = mutableStateOf(23f),
    val colorScheme: MutableState<String?> = mutableStateOf(null),
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
    if (props.fontSize.value == null) {
        return BibleTextOptions()
    }

    return BibleTextOptions(fontSize = props.fontSize.value!!.sp)
}

fun bibleReference(props: BibleWidgetViewProps): BibleReference {
    if (props.chapter.value == null) {
        throw IllegalStateException("Chapter is required")
    }

    if (props.bookUSFM.value == null) {
        throw IllegalStateException("Book is required")
    }

    if (props.versionId.value == null) {
        throw IllegalStateException("Version is required")
    }

    val start = props.verseStart.value
    val end = props.verseEnd.value

    if (start != null && end != null) {
        return BibleReference(
            versionId = props.versionId.value!!,
            bookUSFM = props.bookUSFM.value!!,
            chapter = props.chapter.value!!,
            verseStart = start,
            verseEnd = end
        )
    }

    return BibleReference(
        versionId = props.versionId.value!!,
        bookUSFM = props.bookUSFM.value!!,
        chapter = props.chapter.value!!,
        verse = props.verse.value
    )
}

@Composable
fun isDark(props: BibleWidgetViewProps): Boolean {
    return when (props.colorScheme.value) {
        "dark" -> true
        "light" -> false
        else -> isSystemInDarkTheme()
    }
}