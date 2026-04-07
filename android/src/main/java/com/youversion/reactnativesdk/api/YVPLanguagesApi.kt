package com.youversion.reactnativesdk.api

import com.youversion.platform.core.api.YouVersionApi

object YVPLanguagesApi {
    suspend fun languages(country: String?): List<LanguageRecord> {
        val allResults = mutableListOf<LanguageRecord>()
        var pageToken: String? = null

        do {
            val response = YouVersionApi.languages.languages(country, pageToken = pageToken)
            allResults.addAll(response.data.map { LanguageRecord(it) })

            pageToken = response.nextPageToken
        } while (pageToken != null)

        return allResults
    }
}