const inquirer = require("inquirer");

const logins = [
  // {
  //   test: 1,
  // },
];

const questions = [
  {
    type: "editor",
    name: "bio",
    message: "Please write a short bio of at least 3 lines.",
    validate(text) {
      if (text.split("\n").length < 3) {
        return "Must be at least 3 lines.";
      }

      return true;
    },
  },
  {
    // when: (answers) => answers.login.whatToDo === OPTS.editRaw,
    name: "login.rawData",
    type: "editor",
    message: "Edit the logins list in raw json format.",
    postfix: "json",
    default: () => {
      if (logins.length) {
        return JSON.stringify(logins, null, 2);
      } else {
        const defaultLogins = [
          {
            url: "[redacted]",
            username: "MyUser",
            password: "someP@ssw0rd",
          },
        ];
        return JSON.stringify(defaultLogins, null, 2);
      }
    },
    validate(text) {
      try {
        JSON.parse(text);
        return true;
      } catch (error) {
        //console.log(JSON.stringify(text, null, "  "));
        return "INVALID JSON";
      }
    },
  },
];

inquirer.prompt(questions).then((answers) => {
  console.log(JSON.stringify(answers, null, "  "));
});
