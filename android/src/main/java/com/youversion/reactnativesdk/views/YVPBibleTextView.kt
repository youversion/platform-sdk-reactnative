package com.youversion.reactnativesdk.views

import android.content.Context
import androidx.compose.runtime.Composable
import androidx.compose.runtime.MutableState
import androidx.compose.runtime.mutableStateOf
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.unit.sp
import com.youversion.platform.core.bibles.domain.BibleReference
import com.youversion.platform.ui.views.BibleText
import com.youversion.platform.ui.views.BibleTextFootnoteMode
import com.youversion.platform.ui.views.BibleTextOptions
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.viewevent.EventDispatcher
import expo.modules.kotlin.views.ComposeProps
import expo.modules.kotlin.views.ExpoComposeView

data class BibleTextViewProps(
    // Styling
    val fontFamily: MutableState<String?> = mutableStateOf(null),
    val fontSize: MutableState<Float?> = mutableStateOf(16f),
    val lineSpacing: MutableState<Float?> = mutableStateOf(null),
    val paragraphSpacing: MutableState<Float?> = mutableStateOf(null),
    val textColor: MutableState<Int?> = mutableStateOf(null),
    val wocColor: MutableState<Int?> = mutableStateOf(null),
    val footnoteMode: MutableState<String?> = mutableStateOf("none"),
    val renderVerseNumbers: MutableState<Boolean?> = mutableStateOf(true),

    // Bible reference
    val versionId: MutableState<Int?> = mutableStateOf(null),
    val bookUSFM: MutableState<String?> = mutableStateOf(null),
    val chapter: MutableState<Int?> = mutableStateOf(null),
    val verse: MutableState<Int?> = mutableStateOf(null),
    val verseStart: MutableState<Int?> = mutableStateOf(null),
    val verseEnd: MutableState<Int?> = mutableStateOf(null),
) : ComposeProps

class YVPBibleTextView(context: Context, appContext: AppContext) :
    ExpoComposeView<BibleTextViewProps>(context, appContext, withHostingView = true) {

    override val props = BibleTextViewProps()
    private val onTap by EventDispatcher()

    @Composable
    override fun Content(modifier: Modifier) {
        val reference = bibleReference() ?: return

        BibleText(
            reference = reference,
            textOptions = textOptions(),
            onVerseTap = { bibleRef, _ ->
                onTap(
                    mapOf(
                        "bibleReference" to mapOf(
                            "versionId" to bibleRef.versionId,
                            "bookUSFM" to bibleRef.bookUSFM,
                            "chapter" to bibleRef.chapter,
                            "verse" to bibleRef.verseStart,
                            "type" to "verse",
                        ),
                    ),
                )
            },
        )
    }

    private fun bibleReference(): BibleReference? {
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
                verseEnd = verseEnd,
            )
        } else {
            BibleReference(
                versionId = versionId,
                bookUSFM = bookUSFM,
                chapter = chapter,
                verse = props.verse.value,
            )
        }
    }

    private fun textOptions(): BibleTextOptions {
        return BibleTextOptions(
            fontFamily = fontFamily(),
            fontSize = (props.fontSize.value ?: 16f).sp,
            lineSpacing = props.lineSpacing.value?.sp,
            textColor = props.textColor.value?.let { Color(it) },
            wocColor = props.wocColor.value?.let { Color(it) } ?: Color(0xFFFF3D4D),
            renderVerseNumbers = props.renderVerseNumbers.value ?: true,
            footnoteMode = footnoteMode(),
        )
    }

    private fun fontFamily(): FontFamily {
        return when (props.fontFamily.value?.lowercase()) {
            "serif" -> FontFamily.Serif
            "sansserif", "sans-serif" -> FontFamily.SansSerif
            "monospace" -> FontFamily.Monospace
            "cursive" -> FontFamily.Cursive
            else -> FontFamily.Serif
        }
    }

    private fun footnoteMode(): BibleTextFootnoteMode {
        return when (props.footnoteMode.value?.lowercase()) {
            "none" -> BibleTextFootnoteMode.NONE
            "inline" -> BibleTextFootnoteMode.INLINE
            "marker" -> BibleTextFootnoteMode.MARKER
            "letters" -> BibleTextFootnoteMode.LETTERS
            "image" -> BibleTextFootnoteMode.IMAGE
            else -> BibleTextFootnoteMode.NONE
        }
    }
}
