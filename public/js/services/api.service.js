import angular from "angular";
const app = angular.module('app');

app.factory('APIService', [
    '$http',
    '$q',
    '$rootScope',
    function ($http, $q, $rootScope) {
        return {
            getPessoa: function (id) {
                var deferred = $q.defer();
                var req = {
                    method: 'GET',
                    url: $rootScope.URL + '/pessoa/' + id,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                };
                $http(req).then(
                    function (results) {
                        deferred.resolve(results.data);
                    },
                    function errorCallback(data, status) {
                        deferred.reject(data);
                    }
                );
                return deferred.promise;
            },
            addPessoa: function (data) {
                var deferred = $q.defer();
                var req = {
                    method: 'POST',
                    url: $rootScope.URL + '/pessoa',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data,
                };
                $http(req).then(
                    function (results) {
                        deferred.resolve(results.data);
                    },
                    function errorCallback(data, status) {
                        deferred.reject(data);
                    }
                );
                return deferred.promise;
            },
            updatePessoa: function (id, data) {
                var deferred = $q.defer();
                var req = {
                    method: 'PUT',
                    url: $rootScope.URL + '/pessoa/' + id,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data,
                };
                $http(req).then(
                    function (results) {
                        deferred.resolve(results.data);
                    },
                    function errorCallback(data, status) {
                        deferred.reject(data);
                    }
                );
                return deferred.promise;
            },
            deletePessoa: function (id) {
                var deferred = $q.defer();
                var req = {
                    method: 'DELETE',
                    url: $rootScope.URL + '/pessoa/' + id,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                };
                $http(req).then(
                    function (results) {
                        deferred.resolve(results.data);
                    },
                    function errorCallback(data, status) {
                        deferred.reject(data);
                    }
                );
                return deferred.promise;
            },
            addProfissao: function (data) {
                var deferred = $q.defer();
                var req = {
                    method: 'POST',
                    url: $rootScope.URL + '/profissao',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data,
                };
                $http(req).then(
                    function (results) {
                        deferred.resolve(results.data);
                    },
                    function errorCallback(data, status) {
                        deferred.reject(data);
                    }
                );
                return deferred.promise;
            },
            getProfissoes: function (data) {
                var deferred = $q.defer();
                var req = {
                    method: 'GET',
                    url: $rootScope.URL + '/profissao',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data,
                };
                $http(req).then(
                    function (results) {
                        deferred.resolve(results.data);
                    },
                    function errorCallback(data, status) {
                        deferred.reject(data);
                    }
                );
                return deferred.promise;
            },
            getPessoas: function () {
                var deferred = $q.defer();
                var req = {
                    method: 'GET',
                    url: $rootScope.URL + '/pessoa',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                };
                $http(req).then(
                    function (results) {
                        deferred.resolve(results.data);
                    },
                    function errorCallback(data, status) {
                        deferred.reject(data);
                    }
                );
                return deferred.promise;
            },
        };
    },
]);
