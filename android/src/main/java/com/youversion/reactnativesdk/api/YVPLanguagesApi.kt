package com.youversion.reactnativesdk.api

import com.youversion.platform.core.api.YouVersionApi
import com.youversion.platform.core.languages.models.Language

object YVPLanguagesApi {
    suspend fun languages(country: String?): List<LanguageRecord> {
        val response = YouVersionApi.languages.languages(country)
        // Use component1() to access the first component (data) of the data class
        val dataList = response.component1() as List<Language>
        val records = dataList.map { LanguageRecord(it) }
        return records
    }
}