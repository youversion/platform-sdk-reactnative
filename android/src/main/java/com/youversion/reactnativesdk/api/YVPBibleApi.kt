package com.youversion.reactnativesdk.api

import android.content.Context
import com.youversion.platform.core.api.YouVersionApi

object YVPBibleApi {
    suspend fun versions(languageTag: String?): List<BibleVersionRecord> {
        val allResults = mutableListOf<BibleVersionRecord>()
        var pageToken: String? = null

        do {
            val response = YouVersionApi.bible.versions(languageTag, pageToken = pageToken)
            allResults.addAll(response.data.map { BibleVersionRecord(it) })

            pageToken = response.nextPageToken
        } while (pageToken != null)

        return allResults
    }

    suspend fun version(versionId: Int): BibleVersionRecord {
        val response = YouVersionApi.bible.version(versionId)
        val record = BibleVersionRecord(response)
        return record
    }

    suspend fun chapter(bibleReference: BibleReferenceRecord): String {
        val passageId = bibleReference.bookUSFM + "." + bibleReference.chapter.toString()

        val response = YouVersionApi.bible.passage(
            versionId = bibleReference.versionId,
            passageId = passageId
        )

        return response.content
    }
}