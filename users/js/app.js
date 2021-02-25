angular.module('cbtApp', ['ui.bootstrap', 'ui.router', 'appConfig', 'ngStorage', 'ui.router.state.events', 'ngResource'])
    .config([ 'APP_CONST','$urlRouterProvider','$stateProvider','$httpProvider',
        function(APP_CONST, $urlRouterProvider,$stateProvider, $httpProvider) {
        // //interceptors
        $httpProvider.interceptors.push('httpInterceptor');
        
        $urlRouterProvider.otherwise('/');
        $stateProvider
        .state('nimap', {
            url: '/',
            views: {
                'content': {
                    templateUrl: './nimap/modules/users/views/list.html',
                    controller: "nimapController",
                    controllerAs: 'ctrl'
                }
            }
        })
    }])


    .factory('httpInterceptor', ['$q','$window','APP_CONST',
    function($q, $location, $cookies, $injector,$window, APP_CONST) {
        return {
            request: function(config) {
                config.headers = config.headers || {};
                // if ($cookies.get('authtoken'))
                // var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
                // var isFirefox = typeof InstallTrigger !== 'undefined';
                // console.log('isChrome', isChrome, isFirefox)
                // if(isChrome) {
                //     config.headers['Authorization'] = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiOTdjZGZmODBiYWEwNTUyYzMzZTVlNmQyYzRiODM0OWE5YTY2YjBkZWU4ZjkxZjhkY2FlNGU2NzRlNDRmMzM3MjgzZjM0ZjFmYjg1MDYzMjEiLCJpYXQiOjE1OTgwMDcxOTAsIm5iZiI6MTU5ODAwNzE5MCwiZXhwIjoxNjI5NTQzMTkwLCJzdWIiOiIzNSIsInNjb3BlcyI6W119.HXkkfmCfi_O90-ZpkSzldYyQPDOJFW03lfSkA-Yucgnbld_QSjajwfNuiJtW0q7uMfU-_drsbXt-eAcL7kJgceJtb0CbmfV_VUlzy3rd1rI8VNBuv6aeFrV6Xp3lbQU2LFsOlSsheUfZYfrSUDn6hQf0JgA7fkoR_gJYMY8ch161lu8Ovq_pwa4y6nyfDgeWpZ5AxcGcvYOpFQRt4uZdM3gUGpYKQuM-MI3zuJszXfcGyczTaDIqsV6mrQWc7KMtUyrc7jkSf5fPT3B1-wymUfnfx8-XMKpWVerL3L-ZU6Mdmpb1LeNdhVu3CxnxpVHu6AGUhq-01QDUNFAabCh6VYkCyVKugrIYArLkExiQ-chikWe2RftDDO2XAyG_r3kJ9D8Cpjwda3Qay8GIXO1pMTHQyh2guKpO1eeYEGqATc4ZdVs0ieLhvJ1nZMCdBVCn-wCFugts_4rvdhklBGJBOr7LSBzbBaW4F5sK7H1Jxbk19nzT5gkCTP0Is92Zt6EKMZLw92k1d7H9hU3y5NcoPs4vPOjrcXu-3HsFHIHqxmA5n7yyYk7-LjE3PiuNtJh-nQO9YwZlJQ2sKqeorthEdh9IPVzAtqWaEQf3vUvPvODLm3wldkMSaAZDBAlzHV5_nzIvttD1oTJOoeZhFmbZ_KLUI9A1xhFaqLMw5GKrGxo';
                // }
                
                // if(isFirefox) {
                //     config.headers['Authorization'] = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiZDc5NjQ3MTk2OGYxODc0ZTdjY2RhYTk2OTE1ODFhMWU5NGFiYmVmMTc4ZWQ2NTQwOGI4OWVhNTAxYzY4NDNkMzkyOTNhOWI2MjFkZTUyMzgiLCJpYXQiOjE2MDAyNjM3MTksIm5iZiI6MTYwMDI2MzcxOSwiZXhwIjoxNjMxNzk5NzE5LCJzdWIiOiIzNyIsInNjb3BlcyI6W119.joNlgh0OaPtINNgF5BsUH5N-MsH0kD8FXfZKkxJq7OdjCa050B8k6e8KIiPQuKeL8VXKAX0h1xVMVz15xx1ZFuCio4jSBZxMvHWbX7Hzdu9lKg9Wg3Y8KBA_ytJSpu4xsTyXzyXuzzLvArHLDKIUZyqOaxLW3N486OEEWe6kICWHVweCX0VtVuYM73Oy80QWoZkX75UO4tZcFTR98QGo5Gd9DVU-lElJjk5a2HPn0ONh9OOL2r6rPTrvqC8EtuA_UD0BiTRQldoNNCiTXfB11W1vn7DxtcgOvu2OdvIWuYNw-g-mAZQv8QrJuVJkYWk2jo3H02C9Kz7yWj0KZfK7d-t7S0cpeFFZD5noJKc8N_hJH-8UuctYbSCqdALZkVpUHDfR0w2z64B-s1eIJLEGyqrsFDvwPDbJBBGRTSI95TLJGHOQXMY2NThtmv2TOA9hLMpjxSa47kAEx8poxwuwTD3F3lK4TKdZhylFPH1uWGrFlJ6pAS3ndYLd8ULozUbp9nW3waBdg5LpPlDqhTBt1R4MMYDpOO84HRJlUqSFCQRg7KrC42DGIVi3zQjAilGytmOiqq4A56L0w5ZpLwUpUvXSaGiWWsfDi58XJnX9Z_l58ihFrdd4eOPCadRhRLdw_f6E2Fq36T5bW1jwTSdJ7czTbMezse9E0JznkxVkCWE';
                // }
                
                return config;
            },
            response: function(response) {
                return response || $q.when(response);
            },
            'responseError': function(rejection) {

            }
        };
    }])