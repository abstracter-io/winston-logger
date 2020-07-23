module.exports = {
  "hooks": {
    "pre-commit": "lint-staged",

    // The hook below will run only when TTY is available.
    "prepare-commit-msg": "exec < /dev/tty && git cz --hook || true",

    "commit-msg": "commitlint -E HUSKY_GIT_PARAMS",
  }
};
