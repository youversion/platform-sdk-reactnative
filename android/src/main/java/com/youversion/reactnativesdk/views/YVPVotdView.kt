package com.youversion.reactnativesdk.views

import android.content.Context
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.MutableState
import androidx.compose.runtime.mutableStateOf
import androidx.compose.ui.Modifier
import com.youversion.platform.ui.views.votd.VerseOfTheDay
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.views.AutoSizingComposable
import expo.modules.kotlin.views.ComposeProps
import expo.modules.kotlin.views.Direction
import expo.modules.kotlin.views.ExpoComposeView
import java.util.EnumSet

data class VotdViewProps(
    val bibleVersionId: MutableState<Int?> = mutableStateOf(111),
    val colorScheme: MutableState<String?> = mutableStateOf(null),
) : ComposeProps

class YVPVotdView(context: Context, appContext: AppContext) :
    ExpoComposeView<VotdViewProps>(context, appContext, withHostingView = true) {

    override val props = VotdViewProps()

    @Composable
    override fun Content(modifier: Modifier) {
        AutoSizingComposable(shadowNodeProxy, axis = EnumSet.of(Direction.VERTICAL)) {
            VerseOfTheDay(
                bibleVersionId = props.bibleVersionId.value ?: 111,
                dark = isDark()
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
