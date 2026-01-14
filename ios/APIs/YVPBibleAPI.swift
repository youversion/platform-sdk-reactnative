import ExpoModulesCore
import YouVersionPlatform

struct YVPBibleAPI {
    static func versions(languageTag: String?, promise: Promise) {
        Task {
            do {
                let response = try await YouVersionAPI.Bible.versions(forLanguageTag: languageTag)
                let records = response.map(BibleVersionRecord.init)
        
                promise.resolve(records)
            } catch {
                promise.reject(error)
            }
        }
    }
    
    static func version(versionId: Int, promise: Promise) {
        Task {
            do {
                let response = try await YouVersionAPI.Bible.version(versionId: versionId)
                let record = BibleVersionRecord.init(bibleVersion: response)
        
                promise.resolve(record)
            } catch {
                promise.reject(error)
            }
        }
    }
    
    static func chapter(bibleReference record: BibleReferenceRecord, promise: Promise) {
        Task {
            do {
                let response = try await YouVersionAPI.Bible.chapter(reference: self.bibleReference(record))
        
                promise.resolve(response)
            } catch {
                promise.reject(error)
            }
        }
    }
    
    static func bibleReference(_ record: BibleReferenceRecord) -> BibleReference {
        if let start = record.verseStart, let end = record.verseEnd {
            return BibleReference(
                versionId: record.versionId,
                bookUSFM: record.bookUSFM,
                chapter: record.chapter,
                verseStart: start,
                verseEnd: end
            )
        }
        
        return BibleReference(
            versionId: record.versionId,
            bookUSFM: record.bookUSFM,
            chapter: record.chapter,
            verse: record.verse
        )
    }
}

internal struct BibleVersionRecord: Record {
    @Field
    var id: Int
    
    @Field
    var abbreviation: String?
    
    @Field
    var promotionalContent: String?
    
    @Field
    var copyright: String?
    
    @Field
    var languageTag: String?
    
    @Field
    var localizedAbbreviation: String?
    
    @Field
    var localizedTitle: String?
    
    @Field
    var readerFooter: String?
    
    @Field
    var readerFooterUrl: String?
    
    @Field
    var title: String?

    @Field
    var bookCodes: [String]?
    
    @Field
    var organizationId: String?
    
    @Field
    var books: [BibleBookRecord]?
    
    @Field
    var textDirection: String?
    
    init() { }
    
    init(bibleVersion: BibleVersion) {
        self.id = bibleVersion.id
        self.abbreviation = bibleVersion.abbreviation
        self.promotionalContent = bibleVersion.promotionalContent
        self.copyright = bibleVersion.copyright
        self.languageTag = bibleVersion.languageTag
        self.localizedAbbreviation = bibleVersion.localizedAbbreviation
        self.localizedTitle = bibleVersion.localizedTitle
        self.readerFooter = bibleVersion.readerFooter
        self.readerFooterUrl = bibleVersion.readerFooterUrl
        self.title = bibleVersion.title
        self.organizationId = bibleVersion.organizationId
        self.bookCodes = bibleVersion.bookCodes
        
        if let bibleVersionBooks = bibleVersion.books {
            self.books = bibleVersionBooks.map(BibleBookRecord.init)
        }
        
        self.textDirection = bibleVersion.textDirection
    }
}

internal struct BibleBookRecord: Record {
    @Field
    var id: String?
    
    @Field
    var abbreviation: String?
    
    @Field
    var title: String?
    
    @Field
    var fullTitle: String?
    
    @Field
    var chapters: [BibleChapterRecord]?
    
    @Field
    var canon: String?
    
    init() { }
    
    init(bibleBook: BibleBook) {
        self.id = bibleBook.id
        self.abbreviation = bibleBook.abbreviation
        self.title = bibleBook.title
        self.fullTitle = bibleBook.fullTitle
        self.canon = bibleBook.canon
        
        if let bibleBookChapters = bibleBook.chapters {
            self.chapters = bibleBookChapters.map(BibleChapterRecord.init)
        }
    }
}

internal struct BibleChapterRecord: Record {
    @Field
    var id: String?
    
    @Field
    var passageId: String?
    
    @Field
    var title: String?
    
    init() { }
    
    init(bibleChapter: BibleChapter) {
        self.id = bibleChapter.id
        self.passageId = bibleChapter.passageId
        self.title = bibleChapter.title
    }
}

internal struct BibleReferenceRecord: Record {
    @Field
    var versionId: Int
    
    @Field
    var bookUSFM: String
    
    @Field
    var chapter: Int
    
    @Field
    var verseStart: Int?
    
    @Field
    var verseEnd: Int?
    
    @Field
    var verse: Int?
}
