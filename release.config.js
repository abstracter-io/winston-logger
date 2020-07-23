// https://semantic-release.gitbook.io/semantic-releas
// https://github.com/semantic-release/semantic-release/blob/master/docs/usage/configuration.md#configuration
module.exports = {
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    "@semantic-release/npm",

    // TODO: Pushing generated release assets is failing
    // When the branch is protected
    // https://github.com/semantic-release/git
    [
      "@semantic-release/git",
      {
        assets: ["package.json", "CHANGELOG.md"],
        // eslint-disable-next-line no-template-curly-in-string
        message: "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
      },
    ],

    // TODO: Configure this to include the package.tgz in the created release
    // https://github.com/semantic-release/github
    "@semantic-release/github",
  ],
};
