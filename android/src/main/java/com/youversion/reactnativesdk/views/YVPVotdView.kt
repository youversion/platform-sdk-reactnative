package com.youversion.reactnativesdk.views

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.runtime.Composable
import com.youversion.platform.ui.views.votd.CompactVerseOfTheDay
import com.youversion.platform.ui.views.votd.VerseOfTheDay
import expo.modules.kotlin.views.ComposeProps

data class VotdViewProps(
    val bibleVersionId: Int? = 3034,
    val colorScheme: String? = null,
    val showIcon: Boolean? = null,
    val isCompact: Boolean? = null
) : ComposeProps

@Composable
fun YVPVotdView(props: VotdViewProps, onSharePress: () -> Unit, onFullChapterPress: () -> Unit) {
    if (props.isCompact == true) {
        CompactVerseOfTheDay(
            bibleVersionId = props.bibleVersionId ?: 3034,
            dark = isDark(props),
            showIcon = isIconVisible(props)
        )
    } else {
        VerseOfTheDay(
            bibleVersionId = props.bibleVersionId ?: 3034,
            dark = isDark(props),
            onShareClick = { onSharePress() },
            onFullChapterClick = { onFullChapterPress() },
            showIcon = isIconVisible(props)
        )
    }
}

@Composable
fun isDark(props: VotdViewProps): Boolean {
    return when (props.colorScheme) {
        "dark" -> true
        "light" -> false
        else -> isSystemInDarkTheme()
    }
}

fun isIconVisible(props: VotdViewProps): Boolean {
    return props.showIcon ?: true
}
