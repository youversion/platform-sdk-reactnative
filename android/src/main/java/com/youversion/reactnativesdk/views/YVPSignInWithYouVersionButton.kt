package com.youversion.reactnativesdk.views

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.MutableState
import androidx.compose.runtime.mutableStateOf
import androidx.compose.ui.graphics.Shape
import com.youversion.platform.ui.views.SignInWithYouVersionButton
import com.youversion.platform.ui.views.SignInWithYouVersionButtonDefaults
import com.youversion.platform.ui.views.SignInWithYouVersionButtonMode
import expo.modules.kotlin.views.ComposeProps

data class SignInWithYouVersionButtonProps(
    val mode: MutableState<String?> = mutableStateOf("full"),
    val shape: MutableState<String?> = mutableStateOf("capsule"),
    val isStroked: MutableState<Boolean?> = mutableStateOf(true),
    val colorScheme: MutableState<String?> = mutableStateOf(null)
) : ComposeProps


@Composable
fun YVPSignInWithYouVersionButton(
    props: SignInWithYouVersionButtonProps,
    onTap: () -> Unit
) {
    SignInWithYouVersionButton(
        mode = mode(props),
        stroked = stroked(props),
        shape = shape(props),
        dark = isDark(props),
        permissions = { HashSet() }
    )
}

fun mode(props: SignInWithYouVersionButtonProps): SignInWithYouVersionButtonMode {
    return when (props.mode.value) {
        "full" -> SignInWithYouVersionButtonMode.FULL
        "compact" -> SignInWithYouVersionButtonMode.COMPACT
        "iconOnly" -> SignInWithYouVersionButtonMode.ICON_ONLY
        else -> SignInWithYouVersionButtonMode.FULL
    }
}

fun stroked(props: SignInWithYouVersionButtonProps): Boolean {
    return props.isStroked.value ?: true
}

@Composable
fun shape(props: SignInWithYouVersionButtonProps): Shape {
    return when (props.shape.value) {
        "capsule" -> SignInWithYouVersionButtonDefaults.capsuleShape
        "rectangle" -> SignInWithYouVersionButtonDefaults.rectangleShape
        else -> SignInWithYouVersionButtonDefaults.capsuleShape
    }
}

@Composable
fun isDark(props: SignInWithYouVersionButtonProps): Boolean {
    return when (props.colorScheme.value) {
        "dark" -> true
        "light" -> false
        else -> isSystemInDarkTheme()
    }
}