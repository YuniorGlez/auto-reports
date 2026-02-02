import * as github from "@actions/github";
import * as core from "@actions/core";

export interface PRMetadata {
  description: string;
  diff: string;
  title: string;
  number: number;
}

export async function getPRMetadata(): Promise<PRMetadata> {
  const token = core.getInput("github-token", { required: true });
  const octokit = github.getOctokit(token);
  const context = github.context;

  if (context.payload.pull_request == null) {
    throw new Error("This action must be run on a pull_request event.");
  }

  const prNumber = context.payload.pull_request.number;
  const { owner, repo } = context.repo;

  core.info(`Fetching metadata for PR #${prNumber} in ${owner}/${repo}`);

  // Fetch PR details
  const { data: pr } = await octokit.rest.pulls.get({
    owner,
    repo,
    pull_number: prNumber,
  });

  // Fetch PR diff
  const { data: diff } = await octokit.rest.pulls.get({
    owner,
    repo,
    pull_number: prNumber,
    headers: {
      accept: "application/vnd.github.v3.diff",
    },
  });

  return {
    description: pr.body || "",
    diff: typeof diff === "string" ? diff : "",
    title: pr.title,
    number: prNumber,
  };
}
