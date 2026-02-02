package com.youversion.reactnativesdk.api

import com.youversion.platform.core.bibles.models.BibleBook
import com.youversion.platform.core.bibles.models.BibleChapter
import com.youversion.platform.core.bibles.models.BibleVersion
import com.youversion.platform.core.highlights.models.Highlight
import com.youversion.platform.core.languages.models.Language
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

data class LanguageRecord(
    @Field
    val id: String,
    @Field
    val language: String,
    @Field
    val script: String?,
    @Field
    val scriptName: String?,
    @Field
    val aliases: List<String>,
    @Field
    val displayNames: Map<String, String>,
    @Field
    val scripts: List<String>,
    @Field
    val variants: List<String>,
    @Field
    val countries: List<String>,
    @Field
    val textDirection: String,
    @Field
    val defaultBibleId: Int?

) : Record {
    constructor(language: Language) : this(
        id = language.id,
        language = language.language,
        script = language.script,
        scriptName = language.scriptName,
        aliases = language.aliases,
        displayNames = language.displayNames,
        scripts = language.scripts,
        variants = language.variants,
        countries = language.countries,
        textDirection = language.textDirection,
        defaultBibleId = language.defaultBibleVersionId
    )
}

data class BibleVersionRecord(
    @Field
    val id: Int,
    @Field
    val abbreviation: String?,
    @Field
    val promotionalContent: String?,
    @Field
    val copyright: String?,
    @Field
    val languageTag: String?,
    @Field
    val localizedAbbreviation: String?,
    @Field
    val localizedTitle: String?,
    @Field
    val readerFooter: String?,
    @Field
    val readerFooterUrl: String?,
    @Field
    val title: String?,
    @Field
    val bookCodes: List<String>?,
    @Field
    val books: List<BibleBookRecord>?,
    @Field
    val textDirection: String?,
    @Field
    val organizationId: String?
) : Record {
    constructor(bibleVersion: BibleVersion) : this(
        id = bibleVersion.id,
        abbreviation = bibleVersion.abbreviation,
        promotionalContent = bibleVersion.promotionalContent,
        copyright = bibleVersion.copyright,
        languageTag = bibleVersion.languageTag,
        localizedAbbreviation = bibleVersion.localizedAbbreviation,
        localizedTitle = bibleVersion.localizedTitle,
        readerFooter = bibleVersion.readerFooter,
        readerFooterUrl = bibleVersion.readerFooterUrl,
        title = bibleVersion.title,
        bookCodes = bibleVersion.bookCodes,
        books = bibleVersion.books?.map { BibleBookRecord(it) },
        textDirection = bibleVersion.textDirection,
        organizationId = bibleVersion.organizationId
    )
}

data class BibleBookRecord(
    @Field
    val id: String?,
    @Field
    val title: String?,
    @Field
    val abbreviation: String?,
    @Field
    val canon: String?,
    @Field
    val chapters: List<BibleChapterRecord>?,
    @Field
    val fullTitle: String?
) : Record {
    constructor(bibleBook: BibleBook) : this(
        id = bibleBook.id,
        title = bibleBook.title,
        abbreviation = bibleBook.abbreviation,
        canon = bibleBook.canon,
        chapters = bibleBook.chapters?.map { BibleChapterRecord(it) },
        fullTitle = bibleBook.fullTitle
    )
}

data class BibleChapterRecord(
    @Field
    val id: String?,
    @Field
    val passageId: String?,
    @Field
    val title: String?
) : Record {
    constructor(bibleChapter: BibleChapter) : this(
        id = bibleChapter.id,
        passageId = bibleChapter.passageId,
        title = bibleChapter.title
    )
}

data class BibleReferenceRecord(
    @Field
    val versionId: Int,
    @Field
    val bookUSFM: String,
    @Field
    val chapter: Int,
) : Record

data class HighlightRecord(
    @Field
    val id: String?,
    @Field
    val bibleId: Int,
    @Field
    val passageId: String,
    @Field
    val color: String,
    @Field
    val userId: String?,
    @Field
    val createTime: String?,
    @Field
    val updateTime: String?
) : Record {
    constructor(highlight: Highlight) : this(
        id = highlight.id,
        bibleId = highlight.versionId,
        passageId = highlight.passageId,
        color = highlight.color,
        userId = highlight.userId,
        createTime = highlight.createTime,
        updateTime = highlight.updateTime
    )
}