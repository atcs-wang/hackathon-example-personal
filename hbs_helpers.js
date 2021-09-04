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

// Helpers receive the current context as the this-context of the function.

hbs.registerHelper('queryParamsWithUpdate', function (name, new_value) {
    let urlSearchParams = new URLSearchParams(this.query);
    urlSearchParams.set(name, new_value);
    return urlSearchParams.toString(); 
});

hbs.registerHelper('queryParamsWithoutSort', function () {
    let urlSearchParams = new URLSearchParams(this.query);
    urlSearchParams.delete('sort');
    return urlSearchParams.toString(); 
});


hbs.registerHelper('queryParamsWithoutFilters', function () {
    let urlSearchParams = new URLSearchParams(this.query);
    if (urlSearchParams.has('sort'))
        return 'sort=' + urlSearchParams.get('sort');
    else
        return ""; 
});



//Block helpers: When we register a custom block helper, 
// Handlebars automatically adds an options object as the last parameter in the callback function. 
// And the options object has an fn method, a hash object, and an inverse method.

// hbs.registerHelper("noop", function(options) {
//     return options.fn(this);
//   });
