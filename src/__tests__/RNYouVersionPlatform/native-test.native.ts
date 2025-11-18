import {
  YouVersionPlatform,
  YouVersionAPI,
  BibleReference,
} from "../../../src";
import { Module } from "../../../src/native";

describe("YouVersionPlatform", () => {
  describe("#configure", () => {
    it("passes the provided appKey", async () => {
      YouVersionPlatform.configure("my-test-app-key");
      expect(Module.configure).toHaveBeenCalledWith("my-test-app-key");
    });
  });

  describe("#setApiHost", () => {
    it("passes the provided apiHost", async () => {
      YouVersionPlatform.setApiHost("api-dev.youversion.com");
      expect(Module.setApiHost).toHaveBeenCalledWith("api-dev.youversion.com");
    });
  });

  describe("#getAccessToken", () => {
    it("returns the access token from the native module", () => {
      const accessToken = YouVersionPlatform.getAccessToken();
      expect(Module.getAccessToken).toHaveBeenCalled();
      expect(accessToken).toBe("existing-access-token");
    });
  });
});

describe("YouVersionAPI.Users", () => {
  describe("#signIn", () => {
    it("passes the provided permissions", async () => {
      const result = await YouVersionAPI.Users.signIn(["bible_activity"]);

      expect(Module.signIn).toHaveBeenCalledWith(["bible_activity"]);

      expect(result).toEqual(
        expect.objectContaining({
          accessToken: "mock-access-token",
          permissions: ["bible_activity"],
          yvpUserId: "mock-yvp-user-id",
        }),
      );
    });
  });

  describe("#signOut", () => {
    it("calls `signOut` on the native module", async () => {
      await YouVersionAPI.Users.signOut();

      expect(Module.signOut).toHaveBeenCalled();
    });
  });

  describe("#userInfo", () => {
    it("passes the accessToken when provided", async () => {
      const result = await YouVersionAPI.Users.userInfo("test-access-token");

      expect(Module.userInfo).toHaveBeenCalledWith("test-access-token");
      expect(result).toEqual({
        avatarUrl: "https://example.com/avatar.png",
        firstName: "Mock",
        lastName: "User",
        yvpUserId: "mock-yvp-user-id",
      });
    });

    it("calls `userInfo` without an accessToken when not provided", async () => {
      const result = await YouVersionAPI.Users.userInfo();

      expect(Module.userInfo).toHaveBeenCalledWith(undefined);
      expect(result).toEqual({
        avatarUrl: "https://example.com/avatar.png",
        firstName: "Mock",
        lastName: "User",
        yvpUserId: "mock-yvp-user-id",
      });
    });
  });
});

describe("YouVersionAPI.VOTD", () => {
  describe("#verseOfTheDay", () => {
    it("calls `verseOfTheDay` on the native module with the provided dayOfYear", async () => {
      const result = await YouVersionAPI.VOTD.verseOfTheDay({ dayOfYear: 150 });

      expect(Module.verseOfTheDay).toHaveBeenCalledWith(150);
      expect(result).toEqual({
        day: 150,
        passageId: "GEN.1.1",
      });
    });
  });
});

describe("YouVersionAPI.Bible", () => {
  describe("#getVersions", () => {
    it("calls `versions` on the native module with the provided languageTag", async () => {
      const result = await YouVersionAPI.Bible.getVersions("en");

      expect(result.length).toBe(1);
      expect(Module.versions).toHaveBeenCalledWith("en");
    });

    it("calls `versions` on the native module without a languageTag when not provided", async () => {
      const result = await YouVersionAPI.Bible.getVersions();

      expect(result.length).toBe(1);
      expect(Module.versions).toHaveBeenCalledWith(undefined);
    });
  });

  describe("#getVersion", () => {
    it("calls `version` on the native module with the provided versionId", async () => {
      const result = await YouVersionAPI.Bible.getVersion(1);

      expect(Module.version).toHaveBeenCalledWith(1);
      expect(result.id).toBe(1);
    });
  });

  describe("#getChapter", () => {
    it("calls `chapter` on the native module with the provided bibleReference", async () => {
      const bibleReference: BibleReference = {
        versionId: 1,
        bookUSFM: "GEN",
        chapter: 1,
        type: "chapter",
      };

      const result = await YouVersionAPI.Bible.getChapter(bibleReference);

      expect(Module.chapter).toHaveBeenCalledWith(bibleReference);
      expect(result).toBe(
        "In the beginning God created the heaven and the earth.",
      );
    });
  });
});

describe("YouVersionAPI.Languages", () => {
  describe("#getLanguages", () => {
    it("calls `languages` on the native module with the provided country", async () => {
      const result = await YouVersionAPI.Languages.getLanguages("US");

      expect(Module.languages).toHaveBeenCalledWith("US");
      expect(result.length).toBe(1);
    });

    it("calls `languages` on the native module without a country when not provided", async () => {
      const result = await YouVersionAPI.Languages.getLanguages();

      expect(Module.languages).toHaveBeenCalledWith(undefined);
      expect(result.length).toBe(1);
    });
  });
});

describe("YouVersionAPI.Highlights", () => {
  describe("#createHighlight", () => {
    it("calls `createHighlight` on the native module with the provided parameters", async () => {
      const result = await YouVersionAPI.Highlights.createHighlight({
        bibleId: 1,
        passageId: "GEN.1.1",
        color: "#FFFF00",
      });

      expect(Module.createHighlight).toHaveBeenCalledWith(
        1,
        "GEN.1.1",
        "#FFFF00",
      );
      expect(result).toBe(true);
    });
  });

  describe("#getHighlights", () => {
    it("calls `getHighlights` on the native module with the provided parameters", async () => {
      const result = await YouVersionAPI.Highlights.getHighlights({
        bibleId: 1,
        passageId: "GEN.1.1",
      });

      expect(Module.getHighlights).toHaveBeenCalledWith(1, "GEN.1.1");
      expect(result.length).toBe(1);
    });
  });

  describe("#updateHighlight", () => {
    it("calls `updateHighlight` on the native module with the provided parameters", async () => {
      const result = await YouVersionAPI.Highlights.updateHighlight({
        bibleId: 1,
        passageId: "GEN.1.1",
        color: "#FF0000",
      });

      expect(Module.updateHighlight).toHaveBeenCalledWith(
        1,
        "GEN.1.1",
        "#FF0000",
      );
      expect(result).toBe(true);
    });
  });

  describe("#deleteHighlight", () => {
    it("calls `deleteHighlight` on the native module with the provided parameters", async () => {
      const result = await YouVersionAPI.Highlights.deleteHighlight({
        bibleId: 1,
        passageId: "GEN.1.1",
      });

      expect(Module.deleteHighlight).toHaveBeenCalledWith(1, "GEN.1.1");
      expect(result).toBe(true);
    });
  });
});
