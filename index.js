module.exports = function inquiryTraverser( inquirer ) {

  return function traverse( questions ) {

    return new Promise( function executor( resolve, reject ) {

      function promptSingle( id ) {

        var
          step,
          question;

        if ( !id || !( id in questions ) ) {
          return reject( {
            message: 'Specified questions object lacks key "' + id + '"!',
            id: id,
            step: null,
            inquirerAnswer: null
          } );
        }

        step = questions[ id ];
        question = Object.assign( {}, step.question, { name: id } );

        inquirer.prompt( question )
          .then( function handleAnsweredQuestion( answer ) {

            var
              value,
              resolution;

            if ( !( id in answer ) ) {
              return reject( {
                message: 'Inquirer\'s answer object is lacking key "' + id + '"!',
                id: id,
                step: step,
                inquirerAnswer: answer
              } );
            }

            value = '' + answer[ id ];

            if ( !( value in step.resolve ) ) {
              return reject( {
                message: 'Questions\' Step "' + id + '" is lacking a resolution for "' + value + '"',
                id: id,
                step: step,
                inquirerAnswer: answer
              } );
            }

            resolution = step.resolve[ value ];

            if ( 'redirect' in resolution ) {
              setTimeout( promptSingle, 0, resolution.redirect );
              return;
            }

            if ( 'value' in resolution ) {
              return resolve( resolution.value );
            }

            reject( {
              message: 'Questions\' Step "' + id + '" is lacking a resolution (either "redirect" or "value")!',
              id: id,
              step: step,
              inquirerAnswer: answer
            } );
          } )
          .catch( function handleInsufficientlyAnsweredQuestion( reason ) {
            reject( {
              message: 'Questions\' Step "' + id + '" is lacking a resolution (either "redirect" or "value")!',
              id: id,
              step: step,
              rejectReason: reason
            } );
          } );
      }

      if ( !questions ) {
        throw Error( 'No questions to traverse specified!' );
      }

      if ( !questions.entry || !( questions.entry in questions ) ) {
        throw Error( 'Specified questions object lacks entry point!' );
      }

      promptSingle( questions.entry );
    } );

  };

};
