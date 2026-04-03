package com.youversion.reactnativesdk.views

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.MutableState
import androidx.compose.runtime.mutableStateOf
import com.youversion.platform.ui.views.votd.CompactVerseOfTheDay
import com.youversion.platform.ui.views.votd.VerseOfTheDay
import expo.modules.kotlin.views.ComposeProps

data class VotdViewProps(
    val bibleVersionId: MutableState<Int?> = mutableStateOf(3034),
    val colorScheme: MutableState<String?> = mutableStateOf(null),
    val showIcon: MutableState<Boolean?> = mutableStateOf(null),
    val isCompact: MutableState<Boolean?> = mutableStateOf(null)
) : ComposeProps

@Composable
fun YVPVotdView(props: VotdViewProps, onSharePress: () -> Unit, onFullChapterPress: () -> Unit) {
    if (props.isCompact.value == true) {
        CompactVerseOfTheDay(
            bibleVersionId = props.bibleVersionId.value ?: 3034,
            dark = isDark(props),
            showIcon = isIconVisible(props)
        )
    } else {
        VerseOfTheDay(
            bibleVersionId = props.bibleVersionId.value ?: 3034,
            dark = isDark(props),
            onShareClick = { onSharePress() },
            onFullChapterClick = { onFullChapterPress() },
            showIcon = isIconVisible(props)
        )
    }
}

@Composable
fun isDark(props: VotdViewProps): Boolean {
    return when (props.colorScheme.value) {
        "dark" -> true
        "light" -> false
        else -> isSystemInDarkTheme()
    }
}

fun isIconVisible(props: VotdViewProps): Boolean {
    return props.showIcon.value ?: true
}
