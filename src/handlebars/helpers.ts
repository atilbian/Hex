import { handlebars } from 'hbs';

export function registerHandlebarsHelpers() {
    handlebars.registerHelper('ifCond', function (v1, v2, options) {
        if (v1 === v2) {
            return options.fn(this);
        }
        return options.inverse(this);
    });
}

export function unregisterHandlebarsHelpers() {
    handlebars.unregisterHelper('ifCond');
}