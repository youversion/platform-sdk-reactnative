package com.youversion.reactnativesdk.views

import android.content.Context
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.MutableState
import androidx.compose.runtime.mutableStateOf
import androidx.compose.ui.Modifier
import com.youversion.platform.ui.views.votd.VerseOfTheDay
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
        val isDark = when (props.colorScheme.value?.lowercase()) {
            "dark" -> true
            "light" -> false
            else -> isSystemInDarkTheme()
        }

        VerseOfTheDay(
            bibleVersionId = props.bibleVersionId.value ?: 111,
            dark = isDark,
        )
    }
}
