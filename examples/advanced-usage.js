var
  inquirer = require( 'inquirer' ),
  traverser = require( '../index' ),

  traverse = traverser( inquirer ),

  //----------------------------------------------------------------------------
  // Show off all Inquirer.js prompt types
  //----------------------------------------------------------------------------
  questions = {
    // Determine the entry point
    entry: 'list',

    //--------------------------------------------------------------------------
    // List - { type: 'list' }
    //----------------------------------------------------------------------------
    list: {
      // The question is formatted as usual in Inquirer.js.
      // Only the name property is omitted, it will automatically
      // be created by the current step's key ("list" in this case).
      question: {
        message: 'Please select your meal:',
        type: 'list',
        choices: [ {
          value: 'pizza',
          name: 'Pizza'
        }, {
          value: 'burger',
          name: 'Burger'
        } ]
      },
      // The "resolve" child object specifies,
      // what to do in case of each of the question's possible answers.
      // Prompt type "list" returns the particular choice's value:
      resolve: {
        pizza: {
          redirect: 'rawlist'
        },
        burger: {
          redirect: 'expand'
        }
      }
    },

    //--------------------------------------------------------------------------
    // Raw List - { type: 'rawlist' }
    //--------------------------------------------------------------------------
    rawlist: {
      question: {
        message: 'Do you want your pizza as ...',
        type: 'rawlist',
        choices: [ {
          value: 'standard',
          name: 'Standard, 26"'
        }, {
          value: 'xxl',
          name: 'Big, 32"'
        }, {
          value: 'calzone',
          name: 'Calzone (26", wrapped)'
        } ]
      },
      // The "resolve" child object specifies,
      // what to do in case of each of the question's possible answers.
      // Prompt type "rawlist" returns the particular choice's value:
      resolve: {
        standard: {
          value: 'Standard Pizza, 26"'
        },
        xxl: {
          value: 'Big Pizza, 32"'
        },
        calzone: {
          value: 'Pizza Calzone'
        }
      }
    },

    //--------------------------------------------------------------------------
    // Expand - { type: 'expand' }
    //--------------------------------------------------------------------------
    expand: {
      question: {
        message: 'Make my burger a ...',
        type: 'expand',
        choices: [ {
          value: 'standard',
          key: '1',
          name: 'Standard (Beef Patty, Ketchup & Mustard)'
        }, {
          value: 'cheeseburger',
          key: '2',
          name: 'Cheeseburger (Beef Patty, Cheese, Ketchup & Mustard)'
        }, {
          value: 'doubleCheese',
          key: '3',
          name: 'Double Cheeseburger (2 Beef Patties, Cheese, Ketchup & Mustard)'
        }, {
          value: 'supreme',
          key: '4',
          name: 'Supreme Cheeseburger (with Tomatoes & Pickles)'
        }, {
          value: 'supremeBBQ',
          key: '5',
          name: 'Supreme BBQ Cheeseburger (Bacon, BBQ-Sauce, Tomatoes & Pickles)'
        }, {
          value: 'heartAttack',
          key: '6',
          name: 'Triple Supreme Barbecue Cheeseburger'
        } ]
      },
      // The "resolve" child object specifies,
      // what to do in case of each of the question's possible answers.
      // Prompt type "expand" returns the particular choice's value:
      resolve: {
        standard: {
          value: 'Standard (Beef Patty, Ketchup & Mustard)'
        },
        cheeseburger: {
          value: 'Cheeseburger (Beef Patty, Cheese, Ketchup & Mustard)'
        },
        doubleCheese: {
          value: 'Double Cheeseburger (2 Beef Patties, Cheese, Ketchup & Mustard)'
        },
        supreme: {
          value: 'Supreme Cheeseburger (Beef Patty, Cheese, Ketchup, Mustard, Tomatoes & Pickles)'
        },
        supremeBBQ: {
          value: 'Supreme BBQ Cheeseburger (Beef Patty, Bacon, Cheese, BBQ-Sauce, Tomatoes & Pickles)'
        },
        heartAttack: {
          value: 'Triple Supreme Barbecue Cheeseburger (3x Beef Patty, 3x Bacon, 3x Cheese, BBQ-Sauce, Tomatoes, & Pickles)'
        }
      }
    }
  };

traverse( questions )
  .then( function onResolve( value ) {
    console.log( 'You\'ll be served a\n', value );
  } )
  .catch( function onRejected( reason ) {
    console.log( 'The order has been rejected:', reason );
  } );
