package com.youversion.reactnativesdk.views

import android.os.Build
import androidx.annotation.RequiresApi
import androidx.compose.runtime.Composable
import androidx.compose.runtime.MutableState
import androidx.compose.runtime.mutableStateOf
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.unit.sp
import com.youversion.platform.core.bibles.domain.BibleReference
import com.youversion.platform.ui.views.BibleText
import com.youversion.platform.ui.views.BibleTextFootnoteMode
import com.youversion.platform.ui.views.BibleTextOptions
import com.youversion.reactnativesdk.api.VerseTappedEvent
import expo.modules.kotlin.views.ComposeProps

data class BibleTextViewProps(
    val fontFamily: MutableState<String> = mutableStateOf("Times New Roman"),
    val fontSize: MutableState<Float> = mutableStateOf(16f),
    val lineSpacing: MutableState<Float?> = mutableStateOf(null),
    val paragraphSpacing: MutableState<Float?> = mutableStateOf(null),
    val textColor: MutableState<Color?> = mutableStateOf(null),
    val wocColor: MutableState<Color?> = mutableStateOf(null),
    val footnoteMode: MutableState<String?> = mutableStateOf(null),
    val renderVerseNumbers: MutableState<Boolean?> = mutableStateOf(true),

    val versionId: MutableState<Int?> = mutableStateOf(null),
    val bookUSFM: MutableState<String?> = mutableStateOf(null),
    val chapter: MutableState<Int?> = mutableStateOf(null),
    val verse: MutableState<Int?> = mutableStateOf(null),
    val verseStart: MutableState<Int?> = mutableStateOf(null),
    val verseEnd: MutableState<Int?> = mutableStateOf(null),
) : ComposeProps

val defaultTextOptions = BibleTextOptions()

@Composable
fun YVPBibleTextView(props: BibleTextViewProps, onTap: (event: VerseTappedEvent) -> Unit) {
    BibleText(
        reference = bibleReference(props),
        textOptions = textOptions(props),
        onVerseTap = { reference: BibleReference, _: Offset  ->
            onTap(VerseTappedEvent(reference))
        }
    )
}

fun bibleReference(props: BibleTextViewProps): BibleReference {
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

fun textOptions(props: BibleTextViewProps): BibleTextOptions {
    return BibleTextOptions(
        fontFamily = FontFamily.Serif,
        fontSize = props.fontSize.value.sp,
        lineSpacing = props.lineSpacing.value?.sp ?: defaultTextOptions.lineSpacing,
        textColor = composeColor(props.textColor.value),
        wocColor = composeColor(props.wocColor.value) ?: composeColor(0xFFF04C59),
        renderVerseNumbers = props.renderVerseNumbers.value
            ?: defaultTextOptions.renderVerseNumbers,
        footnoteMode = footnodeMode(props)
    )
}

@RequiresApi(Build.VERSION_CODES.O)
fun composeColor(androidColor: Color?): Color? {
    if (androidColor == null) {
        return null
    }

    return Color(
        alpha = androidColor.alpha,
        red = androidColor.red,
        green = androidColor.green,
        blue = androidColor.blue
    )
}

fun composeColor(hexColor: Long): Color {
    return Color(hexColor)
}

fun footnodeMode(props: BibleTextViewProps): BibleTextFootnoteMode {
    return when (props.footnoteMode.value) {
        "none" -> BibleTextFootnoteMode.NONE
        "inline" -> BibleTextFootnoteMode.INLINE
        "marker" -> BibleTextFootnoteMode.MARKER
        "letters" -> BibleTextFootnoteMode.LETTERS
        "image" -> BibleTextFootnoteMode.IMAGE
        else -> defaultTextOptions.footnoteMode
    }
}