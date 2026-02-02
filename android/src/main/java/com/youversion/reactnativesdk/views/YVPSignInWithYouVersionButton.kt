package com.youversion.reactnativesdk.views

import android.content.Context
import androidx.compose.foundation.clickable
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.MutableState
import androidx.compose.runtime.mutableStateOf
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Shape
import androidx.compose.foundation.layout.Box
import com.youversion.platform.core.users.model.SignInWithYouVersionPermission
import com.youversion.platform.ui.views.SignInWithYouVersionButton
import com.youversion.platform.ui.views.SignInWithYouVersionButtonDefaults
import com.youversion.platform.ui.views.SignInWithYouVersionButtonMode
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.views.AutoSizingComposable
import expo.modules.kotlin.views.ComposeProps
import expo.modules.kotlin.views.Direction
import expo.modules.kotlin.views.ExpoComposeView
import java.util.EnumSet

data class SignInWithYouVersionButtonProps(
    val mode: MutableState<String?> = mutableStateOf("full"),
    val shape: MutableState<String?> = mutableStateOf("capsule"),
    val isStroked: MutableState<Boolean?> = mutableStateOf(true),
    val colorScheme: MutableState<String?> = mutableStateOf(null)
) : ComposeProps

class YVPSignInWithYouVersionButton(context: Context, appContext: AppContext) :
    ExpoComposeView<SignInWithYouVersionButtonProps>(context, appContext, withHostingView = true) {
    override val props = SignInWithYouVersionButtonProps()
//    private val onTap by EventDispatcher()

    @Composable
    override fun Content(modifier: Modifier) {
        AutoSizingComposable(shadowNodeProxy, axis = EnumSet.of(Direction.HORIZONTAL, Direction.VERTICAL)) {
            SignInWithYouVersionButton(
                mode = mode(),
                stroked = stroked(),
                shape = shape(),
                dark = isDark(),
                permissions = { HashSet() }
            )
        }
    }

    fun mode(): SignInWithYouVersionButtonMode {
        return when (props.mode.value) {
            "full" -> SignInWithYouVersionButtonMode.FULL
            "compact" -> SignInWithYouVersionButtonMode.COMPACT
            "iconOnly" -> SignInWithYouVersionButtonMode.ICON_ONLY
            else -> SignInWithYouVersionButtonMode.FULL
        }
    }

    fun stroked(): Boolean {
        return props.isStroked.value ?: true
    }

    @Composable
    fun shape(): Shape {
        return when (props.shape.value) {
            "capsule" -> SignInWithYouVersionButtonDefaults.capsuleShape
            "rectangle" -> SignInWithYouVersionButtonDefaults.rectangleShape
            else -> SignInWithYouVersionButtonDefaults.capsuleShape
        }
    }

    @Composable
    fun isDark(): Boolean {
        return when (props.colorScheme.value) {
            "dark" -> true
            "light" -> false
            else -> isSystemInDarkTheme()
        }
    }
}