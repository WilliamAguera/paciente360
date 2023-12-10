import angular from 'angular';
const app = angular.module('app');

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  '$locationProvider',
  function ($stateProvider, $urlRouterProvider, $locationProvider) {
    'use strict';

    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
    $locationProvider.hashPrefix('');

    $urlRouterProvider.otherwise('/home');

    $stateProvider
      .state('home', {
        url: '/home',
        views: {
          'main': {
            templateUrl: '/views/lista.html',
          }
        }
      })
      .state('pessoa', {
        url: '/pessoa',
        views: {
          'main': {
            templateUrl: '/views/pessoa.html',
          }
        }
      })
      .state('edit', {
        url: '/edit/{id}',
        views: {
          'main': {
            templateUrl: '/views/pessoa.html',
          }
        }
      })
      .state('profissao', {
        url: '/profissao',
        views: {
          'main': {
            templateUrl: '/views/profissao.html',
          }
        },
      });
  }
]);