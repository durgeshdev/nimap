angular.module('cbtApp')
.factory('ProductService', ['$resource', 'APP_CONST',
    function($resource, APP_CONST) {
        return {
            getAllCategories: function() {
                return $resource('http://localhost:10010/category');
            },
            getAllProducts: function() {
                return $resource('http://localhost:10010/products');
            },
            product: function () {
                return $resource('http://localhost:10010/products/:id',{id : '@_id'},{
                    update: {
                        method: 'PATCH'
                    }
                });
            },
            category: function () {
                return $resource('http://localhost:10010/category/:id',{id : '@_id'},{
                    update: {
                        method: 'PATCH'
                    }
                });
            }
        } 
    }
]);