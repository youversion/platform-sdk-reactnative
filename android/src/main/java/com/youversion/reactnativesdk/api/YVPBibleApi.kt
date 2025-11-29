package com.youversion.reactnativesdk.api

import android.content.Context
import com.youversion.platform.core.api.YouVersionApi
import com.youversion.platform.core.bibles.domain.BibleReference
import com.youversion.platform.core.bibles.domain.BibleVersionRepository

object YVPBibleApi {
    suspend fun versions(languageTag: String?): List<BibleVersionRecord> {
        val response = YouVersionApi.bible.versions(languageTag)
        val records = response.map { BibleVersionRecord(it) }
        return records
    }

    suspend fun version(versionId: Int): BibleVersionRecord {
        val response = YouVersionApi.bible.version(versionId)
        val record = BibleVersionRecord(response)
        return record
    }

    suspend fun chapter(bibleReference: BibleReferenceRecord, context: Context): String {
        val response = BibleVersionRepository(context).chapter(
            reference = BibleReference(
                versionId = bibleReference.versionId,
                bookUSFM = bibleReference.bookUSFM,
                chapter = bibleReference.chapter,
            )
        )

        return response
    }
}