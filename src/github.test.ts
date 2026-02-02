import { expect, test, describe, mock, beforeEach } from "bun:test";
import * as github from "@actions/github";
import * as core from "@actions/core";

// Mock @actions/core
mock.module("@actions/core", () => ({
  getInput: (name: string) => (name === "github-token" ? "fake-token" : ""),
  info: () => {},
}));

// Mock @actions/github
mock.module("@actions/github", () => ({
  getOctokit: () => ({
    rest: {
      pulls: {
        get: async (params: any) => {
          if (params.headers?.accept === "application/vnd.github.v3.diff") {
            return { data: "fake-diff" };
          }
          return {
            data: {
              body: "fake-description",
              title: "fake-title",
              number: 123,
            },
          };
        },
      },
    },
  }),
  context: {
    payload: {
      pull_request: {
        number: 123,
      },
    },
    repo: {
      owner: "owner",
      repo: "repo",
    },
  },
}));

import { getPRMetadata } from "./github";

describe("github metadata extraction", () => {
  test("getPRMetadata should return description and diff", async () => {
    const metadata = await getPRMetadata();
    expect(metadata.description).toBe("fake-description");
    expect(metadata.diff).toBe("fake-diff");
    expect(metadata.title).toBe("fake-title");
    expect(metadata.number).toBe(123);
  });
});
