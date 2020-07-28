// What happens if we don't commit all changes?
// lint-stage run tests, and they may pass locally, but fail remotely.
// Consider an approach where testing is made against
// against a copy of the working tree about to be committed
module.exports = {
  "hooks": {
    "pre-commit": "lint-staged",

    // The hook below will run only when TTY is available.
    "prepare-commit-msg": "exec < /dev/tty && git cz --hook || true",

    "commit-msg": "commitlint -E HUSKY_GIT_PARAMS",
  }
};
