
var app = angular.module('app', []);

app.filter('trustUrl', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
});

app.factory('testInterceptor', testInterceptor)
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('testInterceptor');
    })
    .run(function ($http) {

    });
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
function processNavbar()
{

    var items =$(".navbar-item,#mobile-nav");
    $.each(items,function(idx,item){

        item =$(item);
        var info= item.data("config");
        if(info)
        {
            info = info.split(",");


            $.each(info,function(idx,inf){

                switch (inf)
                {
                    case "showLogged":
                        item.show();
                        break;
                    case "hideLogged":
                        item.hide();
                        break;

                }

            });


        }

    });
}



function controller($scope, socket, $http,$sce) {

    angularSce=$sce;

    function error() {
        showError(config.messages.error.unknownEror);
    }
    function getUserInfo()
    {
        getData($http,url,function () {

        },error);

    }

    postData($http,{id:user._id},"/user-data",function(res){

        $scope.user =res.data;

    },error);







    angularScope = $scope;
    angularHttp = $http;

    var p2p = new P2P(socket, $scope);
    processNavbar();

};
angular.module('filters-module', [])
    .filter('trustAsResourceUrl', ['$sce', function ($sce) {
        return function (val) {
            console.log("OKA");
            return $sce.trustAsResourceUrl(val);
        };
    }])