package com.youversion.reactnativesdk.api

import com.youversion.platform.core.api.YouVersionApi
import com.youversion.platform.core.languages.models.Language

object YVPLanguagesApi {
    suspend fun languages(country: String?): List<LanguageRecord> {
        val response = YouVersionApi.languages.languages(country)
        val records = response.map { LanguageRecord(it) }
        return records
    }
}