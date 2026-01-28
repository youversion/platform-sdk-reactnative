package com.youversion.reactnativesdk.api

import android.content.Context
import com.youversion.platform.core.api.YouVersionApi
import com.youversion.platform.core.bibles.domain.BibleReference
import com.youversion.platform.core.bibles.domain.BibleVersionRepository
import com.youversion.platform.core.bibles.models.BibleVersion

object YVPBibleApi {
    suspend fun versions(languageTag: String?): List<BibleVersionRecord> {
        val response = YouVersionApi.bible.versions(languageTag)
        // Use component1() to access the first component (data) of the data class
        val dataList = response.component1() as List<BibleVersion>
        val records = dataList.map { BibleVersionRecord(it) }
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