// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('bookStoreApp', ['ionic', 'bookStoreApp.controllers', 'BookStoreApp.factory'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.run(['$rootScope', 'AuthFactory',
    function($rootScope, AuthFactory) {
        $rootScope.isAuthenticated = AuthFactory.isLoggedIn();
        $rootScope.getNumber = function(num) {
            return new Array(num);
        }
    }
])

.run(function($ionicPlatform, $ionicPopup) {
    $ionicPlatform.ready(function() {
        if (window.Connection) {
            if (navigator.connection.type == Connection.NONE) {
                $ionicPopup.confirm({
                        title: "Internet Disconnected",
                        content: "The internet is disconnected on your device."
                    })
                    .then(function(result) {
                        if (!result) {
                            ionic.Platform.exitApp();
                        }
                    });
            }
        }
    });
})

.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
    function($stateProvider, $urlRouterProvider, $httpProvider) {
        $httpProvider.interceptors.push('TokenInterceptor');
        $stateProvider
            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/menu.html",
                controller: 'AppCtrl'
            })
            .state('app.browse', {
                url: "/browse",
                views: {
                    'menuContent': {
                        templateUrl: "templates/browse.html",
                        controller: 'BrowseCtrl'
                    }
                }
            })
            .state('app.book', {
                url: "/book/:bookId",
                views: {
                    'menuContent': {
                        templateUrl: "templates/book.html",
                        controller: 'BookCtrl'
                    }
                }
            })
            .state('app.cart', {
                url: "/cart",
                views: {
                    'menuContent': {
                        templateUrl: "templates/cart.html",
                        controller: 'CartCtrl'
                    }
                }
            })
            .state('app.purchases', {
                url: "/purchases",
                views: {
                    'menuContent': {
                        templateUrl: "templates/purchases.html",
                        controller: 'PurchasesCtrl'
                    }
                }
            });

        $urlRouterProvider.otherwise('/app/browse');
    }
])
