package com.youversion.reactnativesdk.views

import android.content.Context
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.MutableState
import androidx.compose.runtime.mutableStateOf
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
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
        // TODO: Replace with actual BibleText composable when Kotlin SDK is ready
        Box(
            modifier = modifier
                .fillMaxWidth()
                .padding(16.dp)
        ) {
            Text(
                text = "BibleTextView placeholder - versionId: ${props.versionId.value}, " +
                       "book: ${props.bookUSFM.value}, chapter: ${props.chapter.value}",
                color = Color.Gray
            )
        }
    }
}
