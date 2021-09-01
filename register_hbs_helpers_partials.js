//https://github.com/pillarjs/hbs#use
//https://javascriptissexy.com/handlebars-js-tutorial-learn-everything-about-handlebars-js-javascript-templating/

var hbs = require('hbs');
//Register helpers
// hbs.registerHelper('helper_name', function (options) { return 'helper value'; });

//Regular helpers can take no parameters
//   hbs.registerHelper('gimmeFive', function () { return 5; });
//or 1 parameters
//   hbs.registerHelper('isUndefined', function (thing) { return thing === undefined; });
//or multiple parameters
//   hbs.registerHelper('isEqual', function (thing1, thing2) { return thing1 == thing2; });

//Helpers receive the current context as the this-context of the function.

// hbs.registerHelper("noop", function(options) {
//     return options.fn(this);
//   });

//Block helpers: When we register a custom block helper, 
// Handlebars automatically adds an options object as the last parameter in the callback function. 
// And the options object has an fn method, a hash object, and an inverse method.

//Register partials
// hbs.registerPartial('partial_name', 'partial value');