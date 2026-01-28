package com.youversion.reactnativesdk.api

/**
 * Extension function to extract the data list from a PaginatedResponse.
 * 
 * This is a workaround because PaginatedResponse cannot be directly imported
 * (likely due to module visibility or packaging issues in the Kotlin SDK).
 * 
 * This function uses reflection to access the 'data' property by name,
 * which is more maintainable than using component1() (which depends on
 * property order).
 * 
 * See PAGINATED_RESPONSE_APPROACHES.md for a detailed explanation of
 * different approaches and why this one was chosen.
 */
inline fun <T> Any.extractPaginatedData(): List<T> {
    val dataField = this::class.java.getDeclaredField("data")
    dataField.isAccessible = true
    @Suppress("UNCHECKED_CAST")
    return dataField.get(this) as List<T>
}
