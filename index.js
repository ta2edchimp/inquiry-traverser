module.exports = function (inquirer) {
  return function traverse (questions) {
    return new Promise(function executor (resolve, reject) {
      function promptSingle (id) {
        if (!id || !(id in questions)) {
          throw Error('Specified questions object lacks key "' + ('' + id) + '"!');
        }

        var step = questions[id];
        var question = Object.assign({}, step.question, { name: id });

        inquirer.prompt(question, function (answer) {
          if (!(id in answer)) {
            throw Error('Inquirer\'s answer object is lacking key "' + ('' + id) + '"!');
          }

          var value = '' + answer[id];

          if (!(value in step.resolve)) {
            throw Error('Questions\' Step "' + id + '" is lacking a resolution for "' + value + '"');
          }

          var resolution = step.resolve[value];

          if ('redirect' in resolution) {
            setTimeout(promptSingle, 0, resolution.redirect);
            return;
          }

          if ('value' in resolution) {
            return resolve(resolution.value);
          }

          reject({
            message: 'Questions\' Step "' + id + '" is lacking a resolution (either "redirect" or "value")!',
            id: id,
            step: step
          });
        });
      }

      if (!questions) {
        throw Error('No questions to traverse specified!');
      }

      if (!questions.entry || !(questions.entry in questions)) {
        throw Error('Specified questions object lacks entry point!');
      }

      promptSingle(questions.entry);
    });
  }
};
