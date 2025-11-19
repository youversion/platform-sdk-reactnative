package com.youversion.reactnativesdk.api

import com.youversion.platform.core.api.YouVersionApi

object YVPVotdApi {
    suspend fun verseOfTheDay(dayOfYear: Int): YouVersionVerseOfTheDayRecord {
        val votd = YouVersionApi.votd
            .verseOfTheDay(dayOfTheYear = dayOfYear)

        return YouVersionVerseOfTheDayRecord(votd)
    }
}