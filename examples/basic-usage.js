var
  inquirer = require( 'inquirer' ),
  traverser = require( 'inquiry-traverser' ),

  traverse = traverser( inquirer ),

  questions = {
    entry: 'first',

    first: {
      question: {
        message: 'Do you want to answer a second question?',
        type: 'confirm'
      },
      resolve: {
        true: {
          redirect: 'second'
        },
        false: {
          value: 'Then this will be your answer.'
        }
      }
    },

    second: {
      question: {
        message: 'Is this second question enough?',
        type: 'confirm'
      },
      resolve: {
        true: {
          value: 'Ok, then.'
        }
      }
    }
  };

traverse( questions )
  .then( function onResolve( value ) {
    console.log( 'Resolved:', value );
  } )
  .catch( function onRejected( reason ) {
    console.log( 'Rejected:', reason );
  } );
