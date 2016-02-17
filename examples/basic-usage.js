var
  inquirer = require( 'inquirer' ),
  traverser = require( 'inquiry-traverser' ),

  traverse = traverser( inquirer ),

<<<<<<< 86b04b83ff5ac0bc1eb2ffd5396095bdc1b3ca71
  questions = {
    // Determine the entry point
    entry: 'first',

    first: {
      // The question is formatted as usual in Inquirer.js.
      // Only the name property is omitted, it will automatically
      // be created by the current step's key ("first" in this case).
      question: {
        message: 'Do you want to answer a second question?',
        type: 'confirm'
      },
      // The "resolve" child object specifies,
      // what to do in case of each of the question's possible answers.
      // Prompt type "confirm" may return logical "true" or "false":
      resolve: {
        true: {
          // In case of answering "Yes", the user will be
          // redirected to the next question ("second").
          redirect: 'second'
        },
        false: {
          // In case of answering "No", the Promise will be
          // resolved with a string as value argument.
          value: 'Then this will be your answer.'
        }
      }
    },

    // The "second" step
    second: {
      question: {
        message: 'Is this second question enough?',
        type: 'confirm'
      },
      resolve: {
        true: {
          // In case of answering "Yes", the Promise will be
          // resolved with the following string as value argument.
          value: 'Ok, then.'
        }
=======
var questions = {
  // Determine the entry point
  entry: 'first',

  // The "first" step
  first: {
    // The question is formatted as usual in Inquirer.js.
    // Only the name property is omitted, it will automatically
    // be created by the current step's key ("first" in this case).
    question: {
      message: 'Do you want to answer a second question?',
      type: 'confirm'
    },
    // The "resolve" child object specifies,
    // what to do in case of each of the question's possible answers.
    // Prompt type "confirm" may return logical "true" or "false":
    resolve: {
      true: {
        // In case of answering "Yes", the user will be
        // redirected to the next question ("second").
        redirect: 'second'
      },
      false: {
        // In case of answering "No", the Promise will be
        // resolved with a string as value argument.
        value: 'Then this will be your answer.'
      }
    }
  },

  // The "second" step
  second: {
    question: {
      message: 'Is this second question enough?',
      type: 'confirm'
    },
    resolve: {
      true: {
        // In case of answering "Yes", the Promise will be
        // resolved with the following string as value argument.
        value: 'Ok, then.'
>>>>>>> Basic documentation
      }
      // Note, here's no resolution specified for when then
      // question will be answered with "No".
      // In this case, the Promise will be rejected.
    }
  };

traverse( questions )
  .then( function onResolve( value ) {
    console.log( 'Resolved:', value );
  } )
  .catch( function onRejected( reason ) {
    console.log( 'Rejected:', reason );
  } );
