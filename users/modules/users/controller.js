angular.module('cbtApp')
.controller("nimapController", ['ProductService','$uibModal',
    function(ProductService, $uibModal) {
        var ctrl = this;
        ctrl.searchObj = {};
        ctrl.categories = [];
        ctrl.products = [];


        ctrl.getAllProducts = function() { 
            ProductService.getAllProducts().get(ctrl.searchObj, function(response) {
                if (response.code == 200) {
                    ctrl.products = response.data;
                } else{
                    console.log('err')
                    // toastr.error(response.message);
                }
            });
        }
        ctrl.getAllProducts();

        ctrl.getAllCategories = function() { 
            ProductService.getAllCategories().get(ctrl.searchObj, function(response) {
                if (response.code == 200) {
                    ctrl.categories = response.data;
                } else{
                    console.log('err')
                    // toastr.error(response.message);
                }
            });
        }
        ctrl.getAllCategories();

        ctrl.editProduct = function(product) {
            $uibModal.open({
                templateUrl: './nimap/modules/users/views/editProduct.html',
                resolve: {
                    product: product
                },
                controllerAs: 'ctrl',
                controller: ['$uibModalInstance', 'ProductService', '$state', 'product', function($uibModalInstance, ProductService, $state, product) {
                    var ctrl = this;
                    ctrl.product = product;
                    ctrl.getAllCategories = function() { 
                        ProductService.getAllCategories().get(ctrl.searchObj, function(response) {
                            if (response.code == 200) {
                                ctrl.categories = response.data;
                            } else{
                                console.log('err')
                                // toastr.error(response.message);
                            }
                        });
                    }
                    ctrl.getAllCategories();

                    if(ctrl.product) {
                        ctrl.updateProduct = function(updateData){
                            ProductService.product().update(updateData, function(response) {
                                if (response.code == 200) {
                                    console.log('update')
                                    $uibModalInstance.close();
                                } else {
                                    console.log('fail')
                                }
                            });
                        }
                    } else {
                        ctrl.updateProduct = function(updateData){
                            ProductService.product().save(updateData, function(response) {
                                if (response.code == 200) {
                                    console.log('update')
                                    $uibModalInstance.close();
                                } else {
                                    console.log('fail')
                                }
                            });
                        }
                    }
                    

                    ctrl.cancel = function() {
                        $uibModalInstance.dismiss('cancel');
                    };
                }]
            }).result.then(function() {
                ctrl.getAllProducts();
            }, function() {})
        }

        ctrl.confirmDelete = function(id) {
            $uibModal.open({
                templateUrl: '/nimap/modules/users/views/delete.html',
                controllerAs: 'ctrl',
                controller: ['$uibModalInstance', 'ProductService', function($uibModalInstance, ProductService) {
                    var ctrl = this;
                    ctrl.cancel = function() {
                        $uibModalInstance.dismiss('cancel');
                    };

                    ctrl.deleteRecord = function() {
                        ctrl.loading = true;
                        ProductService.product().delete({
                            id: id
                        }, function(response) {
                            ctrl.loading = false;
                            if (response.code == 200) {
                                // toastr.success(response.message);
                                $uibModalInstance.close();
                            }
                        })
                    }
                }]
            }).result.then(function() {
                ctrl.getAllProducts();
            }, function() {})
        };

        ctrl.addCategory = function(product) {
            $uibModal.open({
                templateUrl: './nimap/modules/users/views/addCategory.html',
                resolve: {
                    product: product
                },
                controllerAs: 'ctrl',
                controller: ['$uibModalInstance', 'ProductService', 'product', function($uibModalInstance, ProductService, product) {
                    var ctrl = this;
                    ctrl.category = product;
                    
                    if(ctrl.category) {
                        ctrl.updateCategory = function(updateData){
                            ProductService.category().update(updateData, function(response) {
                                if (response.code == 200) {
                                    console.log('update')
                                    $uibModalInstance.close();
                                } else {
                                    console.log('fail')
                                }
                            });
                        }
                    } else {
                        ctrl.updateCategory = function(updateData){
                            ProductService.category().save(updateData, function(response) {
                                if (response.code == 200) {
                                    console.log('update')
                                    $uibModalInstance.close();
                                } else {
                                    console.log('fail')
                                }
                            });
                        }
                    }
                    

                    ctrl.cancel = function() {
                        $uibModalInstance.dismiss('cancel');
                    };
                }]
            }).result.then(function() {
                ctrl.getAllCategories();
            }, function() {})
        }

        ctrl.deleteCategory = function(id) {
            $uibModal.open({
                templateUrl: '/nimap/modules/users/views/delete.html',
                controllerAs: 'ctrl',
                controller: ['$uibModalInstance', 'ProductService', function($uibModalInstance, ProductService) {
                    var ctrl = this;
                    ctrl.cancel = function() {
                        $uibModalInstance.dismiss('cancel');
                    };

                    ctrl.deleteRecord = function() {
                        ctrl.loading = true;
                        ProductService.category().delete({
                            id: id
                        }, function(response) {
                            ctrl.loading = false;
                            if (response.code == 200) {
                                // toastr.success(response.message);
                                $uibModalInstance.close();
                            }
                        })
                    }
                }]
            }).result.then(function() {
                ctrl.getAllCategories();
            }, function() {})
        };
    }
])