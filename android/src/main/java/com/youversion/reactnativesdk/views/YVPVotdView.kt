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
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.views.ComposeProps
import expo.modules.kotlin.views.ExpoComposeView

data class VotdViewProps(
    val bibleVersionId: MutableState<Int?> = mutableStateOf(111),
    val colorScheme: MutableState<String?> = mutableStateOf(null),
) : ComposeProps

class YVPVotdView(context: Context, appContext: AppContext) :
    ExpoComposeView<VotdViewProps>(context, appContext, withHostingView = true) {

    override val props = VotdViewProps()

    @Composable
    override fun Content(modifier: Modifier) {
        val isDark = when (props.colorScheme.value) {
            "dark" -> true
            "light" -> false
            else -> isSystemInDarkTheme()
        }

        // TODO: Replace with actual VerseOfTheDay composable when Kotlin SDK is ready
        Box(
            modifier = modifier
                .fillMaxWidth()
                .padding(16.dp)
        ) {
            Text(
                text = "VotdView placeholder - versionId: ${props.bibleVersionId.value}",
                color = if (isDark) Color.White else Color.DarkGray
            )
        }
    }
}
