package com.youversion.reactnativesdk.views

import androidx.compose.runtime.Composable
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
    val fontFamily: String = "Times New Roman",
    val fontSize: Float = 16f,
    val lineSpacing: Float? = null,
    val paragraphSpacing: Float? = null,
    val textColor: Color? = null,
    val wocColor: Color? = null,
    val footnoteMode: String? = null,
    val renderVerseNumbers: Boolean? = true,

    val versionId: Int? = null,
    val bookUSFM: String? = null,
    val chapter: Int? = null,
    val verse: Int? = null,
    val verseStart: Int? = null,
    val verseEnd: Int? = null,
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

fun textOptions(props: BibleTextViewProps): BibleTextOptions {
    return BibleTextOptions(
        fontFamily = FontFamily.Serif,
        fontSize = props.fontSize.sp,
        lineSpacing = props.lineSpacing?.sp ?: defaultTextOptions.lineSpacing,
        textColor = props.textColor,
        wocColor = props.wocColor ?: composeColor(0xFFF04C59),
        renderVerseNumbers = props.renderVerseNumbers
            ?: defaultTextOptions.renderVerseNumbers,
        footnoteMode = footnodeMode(props)
    )
}

fun composeColor(hexColor: Long): Color {
    return Color(hexColor)
}

fun footnodeMode(props: BibleTextViewProps): BibleTextFootnoteMode {
    return when (props.footnoteMode) {
        "none" -> BibleTextFootnoteMode.NONE
        "inline" -> BibleTextFootnoteMode.INLINE
        "marker" -> BibleTextFootnoteMode.MARKER
        "letters" -> BibleTextFootnoteMode.LETTERS
        "image" -> BibleTextFootnoteMode.IMAGE
        else -> defaultTextOptions.footnoteMode
    }
}