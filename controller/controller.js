
var app = angular.module('app', []);
app.directive("repeatEnd", function(){
    return {
        restrict: "A",
        link: function (scope, element, attrs) {
            if (scope.$last) {
                scope.$eval(attrs.repeatEnd);
            }
        }
    };
});
app.filter('trustUrl', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
});
app.directive("repeatEnd", function(){
    return {
        restrict: "A",
        link: function (scope, element, attrs) {
            if (scope.$last) {
                scope.$eval(attrs.repeatEnd);
            }
        }
    };
});
app.factory('testInterceptor', testInterceptor)
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('testInterceptor');
    })
    .run(function ($http) {

    });
/*
app.factory('socket', function ($rootScope) {
    var socket = io.connect('wss://localhost');
    return {
        on: function (eventName, callback) {
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        }
    };
});

*/
function testInterceptor() {
    return {
        request: function (config) {

            showLoader();

            return config;
        },

        requestError: function (config) {
            hideLoader();
            return config;
        },

        response: function (res) {
            hideLoader();
            return res;
        },

        responseError: function (res) {
            hideLoader();
            return res;
        }
    }
}


app.controller('ctrl', controller);//Controlador logueado

var angularScope;
var angularHttp;
var angularSce;


function loadUser()
{
    var user =Cookies.get('access_token');

    postData(angularHttp,{token:user},'/user-data', function (res) {
        console.log(res.data);
    })

}

function showLoader() {

    //TODO
}
function hideLoader() {
    //TODO
}

function error(err) {

    //TODO
    console.log(err);
    alert("ERROR!");
}

function controller($scope/*, socket,*/, $http,$sce) {

    $scope.sendContact=function () {

        
        postData($http,$scope.msg,'/send-email',function (res) {
     
            if(res.data==true)
            {
                alert("Ok!");
                
            }
        },error);
    }

    $('.equal-height2').matchHeight();
    $('.equal-height').matchHeight();
    $('.equal-height3').matchHeight();

    
    angularSce=$sce;
    angularScope = $scope;
    angularHttp = $http;



    //loadUser();


};
angular.module('filters-module', [])
    .filter('trustAsResourceUrl', ['$sce', function ($sce) {
        return function (val) {

            return $sce.trustAsResourceUrl(val);
        };
    }])