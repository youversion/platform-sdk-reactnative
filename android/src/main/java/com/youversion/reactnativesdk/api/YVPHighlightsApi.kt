package com.youversion.reactnativesdk.api

import com.youversion.platform.core.api.YouVersionApi

object YVPHighlightsApi {
    suspend fun createHighlight(bibleId: Int, passageId: String, color: String): Boolean {
        val response = YouVersionApi.highlights.createHighlight(
            versionId = bibleId,
            passageId = passageId,
            color = color
        )

        return response
    }

    suspend fun getHighlights(bibleId: Int, passageId: String): List<HighlightRecord> {
        val response = YouVersionApi.highlights.highlights(
            versionId = bibleId,
            passageId = passageId
        )

        val records = response.map { HighlightRecord(it) }
        return records
    }

    suspend fun updateHighlight(bibleId: Int, passageId: String, color: String): Boolean {
        val response = YouVersionApi.highlights.updateHighlight(
            versionId = bibleId,
            passageId = passageId,
            color = color
        )

        return response
    }

    suspend fun deleteHighlight(bibleId: Int, passageId: String): Boolean {
        val response = YouVersionApi.highlights.deleteHighlight(
            versionId = bibleId,
            passageId = passageId,
        )

        return response
    }
}