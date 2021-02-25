angular.module('appConfig', [])

.constant('APP_CONST', {
    APP_API : 'http://localhost:10010',
    COOKIE_SECURE: false,
    COOKIE_DOMAIN: angular.injector(['ng']).get('$window').location.host
});