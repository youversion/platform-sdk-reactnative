package com.youversion.reactnativesdk.views

import android.content.Context
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.MutableState
import androidx.compose.runtime.mutableStateOf
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.sp
import com.youversion.platform.core.bibles.domain.BibleReference
import com.youversion.platform.ui.views.widget.BibleWidget
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.views.AutoSizingComposable
import expo.modules.kotlin.views.ComposeProps
import expo.modules.kotlin.views.Direction
import expo.modules.kotlin.views.ExpoComposeView
import java.util.EnumSet

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

class YVPBibleWidgetView(context: Context, appContext: AppContext) :
    ExpoComposeView<BibleWidgetViewProps>(context, appContext, withHostingView = true) {

    override val props = BibleWidgetViewProps()

    @Composable
    override fun Content(modifier: Modifier) {
        val reference = bibleReference() ?: return
        val isDark = isDark()

        MaterialTheme(
            colorScheme = if (isDark) darkColorScheme() else lightColorScheme()
        ) {
            AutoSizingComposable(shadowNodeProxy, axis = EnumSet.of(Direction.VERTICAL)) {
                BibleWidget(
                    reference = reference,
                    fontSize = (props.fontSize.value ?: 23f).sp
                )
            }
        }
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

    @Composable
    private fun isDark(): Boolean {
        return when (props.colorScheme.value) {
            "dark" -> true
            "light" -> false
            else -> isSystemInDarkTheme()
        }
    }
}
