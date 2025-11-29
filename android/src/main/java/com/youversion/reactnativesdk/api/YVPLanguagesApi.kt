package com.youversion.reactnativesdk.api

import com.youversion.platform.core.api.YouVersionApi

object YVPLanguagesApi {
    suspend fun languages(country: String?): List<LanguageRecord> {
        val response = YouVersionApi.language.languages(country)
        val records = response.map { LanguageRecord(it) }
        return records
    }
}