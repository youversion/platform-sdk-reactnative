package com.youversion.reactnativesdk.views

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Shape
import com.youversion.platform.ui.views.SignInWithYouVersionButton
import com.youversion.platform.ui.views.SignInWithYouVersionButtonDefaults
import com.youversion.platform.ui.views.SignInWithYouVersionButtonMode
import expo.modules.kotlin.views.ComposeProps

data class SignInWithYouVersionButtonProps(
    val mode: String? = "full",
    val shape: String? = "capsule",
    val isStroked: Boolean? = true,
    val colorScheme: String? = null
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
    return when (props.mode) {
        "full" -> SignInWithYouVersionButtonMode.FULL
        "compact" -> SignInWithYouVersionButtonMode.COMPACT
        "iconOnly" -> SignInWithYouVersionButtonMode.ICON_ONLY
        else -> SignInWithYouVersionButtonMode.FULL
    }
}

fun stroked(props: SignInWithYouVersionButtonProps): Boolean {
    return props.isStroked ?: true
}

@Composable
fun shape(props: SignInWithYouVersionButtonProps): Shape {
    return when (props.shape) {
        "capsule" -> SignInWithYouVersionButtonDefaults.capsuleShape
        "rectangle" -> SignInWithYouVersionButtonDefaults.rectangleShape
        else -> SignInWithYouVersionButtonDefaults.capsuleShape
    }
}

@Composable
fun isDark(props: SignInWithYouVersionButtonProps): Boolean {
    return when (props.colorScheme) {
        "dark" -> true
        "light" -> false
        else -> isSystemInDarkTheme()
    }
}