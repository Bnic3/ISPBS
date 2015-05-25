/**
 * Created by john.nana on 5/19/2015.
 */

var configuration = ["$stateProvider", "$urlRouterProvider",function(stateProvider, urlRouterProvider){
    urlRouterProvider.otherwise("/home");
    stateProvider
        .state('home',{url: "/partial/home",
            templateUrl: "/partial/partial-home"})
        .state('about',{url: "/partial/about",
            templateUrl: "/partial/partial-about"})
        .state('tell',{url: "/partial/tell",
            templateUrl: "/partial/partial-tell"})

}];

module.exports = configuration;
