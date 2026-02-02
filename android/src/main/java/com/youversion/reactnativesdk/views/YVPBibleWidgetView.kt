package com.youversion.reactnativesdk.views

import android.content.Context
import androidx.compose.foundation.isSystemInDarkTheme
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
import androidx.compose.ui.unit.sp
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.views.ComposeProps
import expo.modules.kotlin.views.ExpoComposeView

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
        val isDark = when (props.colorScheme.value) {
            "dark" -> true
            "light" -> false
            else -> isSystemInDarkTheme()
        }

        // TODO: Replace with actual BibleWidget composable when Kotlin SDK is ready
        Box(
            modifier = modifier
                .fillMaxWidth()
                .padding(16.dp)
        ) {
            Text(
                text = "BibleWidgetView placeholder\n" +
                       "${props.bookUSFM.value} ${props.chapter.value}:${props.verse.value ?: "${props.verseStart.value}-${props.verseEnd.value}"}",
                color = if (isDark) Color.White else Color.DarkGray,
                fontSize = (props.fontSize.value ?: 23f).sp
            )
        }
    }
}
