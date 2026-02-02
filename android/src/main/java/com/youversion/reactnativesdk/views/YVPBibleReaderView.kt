package com.youversion.reactnativesdk.views

import android.content.Context
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.MutableState
import androidx.compose.runtime.mutableStateOf
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
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
        // TODO: Replace with actual BibleReaderView composable when Kotlin SDK is ready
        Box(
            modifier = modifier
                .fillMaxSize()
                .padding(16.dp),
            contentAlignment = Alignment.Center
        ) {
            Text(
                text = "BibleReaderView placeholder\n" +
                       "App: ${props.appName.value}\n" +
                       "Reference: ${props.bookUSFM.value} ${props.chapter.value}",
                color = Color.Gray
            )
        }
    }
}
