const fs = require("fs");

const msg = fs.readFileSync(".git/COMMIT_EDITMSG", "utf-8").trim();
const mergeRE = /^(Merge pull request|Merge branch)/;
const commitRE =
  /^(revert: )?(feat|fix|docs|dx|refactor|perf|test|workflow|build|ci|chore|types|wip|release|deps)(\(.+\))?: .{1,50}/;

if (!commitRE.test(msg)) {
  if (!mergeRE.test(msg)) {
    console.log("git commit 信息格式有误");
    console.error(`需要使用以下格式 type(module): message
具体逻辑请看 scripts/verifyCommit.js`);
    process.exit(1);
  }
} else {
  console.log("git commit 校验通过");
}
