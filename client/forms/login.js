var FormView = require('ampersand-form-view');
var InputView = require('ampersand-input-view');
var templates = require('../templates');
var ExtendedInput = InputView.extend({
    template: templates.includes.formInput()
});

module.exports = FormView.extend({
    fields: function () {
        return [
            new ExtendedInput({
                label: 'Email',
                name: 'email',
                value: app.email,
                type: 'email',
                placeholder: 'Email',
                parent: this
            }),
            new ExtendedInput({
                label: 'Password',
                name: 'password',
                value: app.password,
                type: 'password',
                placeholder: 'Password',
                parent: this
            })
        ];
    }
});
