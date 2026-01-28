package com.youversion.reactnativesdk.api

import com.youversion.platform.core.api.YouVersionApi
import com.youversion.platform.core.languages.models.Language

object YVPLanguagesApi {
    suspend fun languages(country: String?): List<LanguageRecord> {
        val response = YouVersionApi.languages.languages(country)
        // PaginatedResponse cannot be imported, so use extension function to extract data
        val dataList: List<Language> = response.extractPaginatedData()
        val records = dataList.map { LanguageRecord(it) }
        return records
    }
}