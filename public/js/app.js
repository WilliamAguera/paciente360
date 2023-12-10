import './../scss/app.scss';

import angular from "angular";
import 'angular-ui-router';
import 'angular-ui-mask';
import 'angular-sanitize';
import 'angular-animate';
import 'angular-toastr';

const app = angular
    .module('app', [
        'ui.router',
        'ui.mask',
        'ngSanitize',
        'ngAnimate',
        'toastr',
    ]);

// Toastr configuration settings
app.config((toastrConfig) => {
    angular.extend(toastrConfig, {
        autoDismiss: false,
        containerId: 'toast-container',
        maxOpened: 0,
        newestOnTop: true,
        positionClass: 'toast-top-right',
        preventDuplicates: false,
        preventOpenDuplicates: true,
        closeButton: true,
        closeHtml: '<button>&times;</button>',
        timeOut: 5000,
        extendedTimeOut: 1000,
        iconClasses: {
            error: 'toast-error',
            info: 'toast-info',
            success: 'toast-success',
            warning: 'toast-warning',
        },
        messageClass: 'toast-message',
        tapToDismiss: true,
        titleClass: 'toast-title',
        toastClass: 'toast',
        target: 'body',
    });
});

export default app;