package com.youversion.reactnativesdk.api

import com.youversion.platform.core.votd.models.YouVersionVerseOfTheDay
import expo.modules.kotlin.records.Field
import expo.modules.kotlin.records.Record

data class YouVersionVerseOfTheDayRecord(
    @Field
    val passageId: String,
    @Field
    val day: Int
) : Record {
    constructor(votd: YouVersionVerseOfTheDay) : this(
        passageId = votd.passageUsfm,
        day = votd.day
    )
}