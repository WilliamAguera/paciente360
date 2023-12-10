import angular from 'angular';
const app = angular.module('app');

app.controller('MainController', [
    '$rootScope',
    '$scope',
    '$state',
    '$stateParams',
    'APIService',
    'toastr',
    function ($rootScope, $scope, $state, $stateParams, apiService, toastr) {
        $rootScope.URL = '/api';
        $scope.pessoa = {};
        $scope.profissao = {};
        $scope.searchText = '';
        $scope.pessoas = [];

        $rootScope.$on('$stateChangeSuccess', function () {
            $scope.isEditing = !!$state.params.id;
            if ($state.params.id) {
                apiService.getPessoa($stateParams.id).then((data) => {
                    $scope.pessoa = {
                        id: data.id,
                        nome: data.pes_nome,
                        dt_nasc: new Date(data.pes_data_nascimento).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                        }),
                        cpf: data.pes_cpf,
                        telefone: data.pes_telefone,
                        profissao_id: data.prof_id.toString(),
                        observacao: data.pes_observacoes,
                    };
                });
            } else {
                $scope.pessoa = {};
            }
        });

        $scope.addPessoa = () => {
            formatDate();
            if ($scope.isEditing) {
                apiService.updatePessoa($scope.pessoa.id, $scope.pessoa).then((data) => {
                    $state.go('home');
                    getPessoas();
                    toastr.success('Registro salvo com sucesso', 'Pessoa');
                }).catch((error) => {
                    toastr.error(error, 'Pessoa');
                });
                return;
            }
            apiService.addPessoa($scope.pessoa).then((data) => {
                $scope.pessoas.push(data);
                $scope.pessoa = {};
                $state.go('home');
                toastr.success('Registro salvo com sucesso', 'Pessoa');
            }).catch((error) => {
                toastr.error(error, 'Pessoa');
            });
        };

        $scope.addProfissao = () => {
            apiService.addProfissao($scope.profissao).then((data) => {
                $scope.profissao = {};
                $state.go('pessoa');
                getProfissoes();
                toastr.success('Registro salvo com sucesso', 'Profissoes');
            }).catch((error) => {
                toastr.error(error, 'Profissoes');
            });
        };

        const getProfissoes = () => {
            apiService.getProfissoes().then((data) => {
                $scope.profissoes = data;
            }).catch((error) => {
                toastr.error(error, 'Profissoes');
            });
        };

        const getPessoas = () => {
            apiService.getPessoas().then((data) => {
                $scope.pessoas = data;
            }).catch((error) => {
                toastr.error(error, 'Pessoa');
            });
        };

        $scope.deletePessoa = (id) => {
            const confirm = window.confirm('Deseja realmente excluir a pessoa?');
            if (!confirm) {
                return;
            }
            apiService.deletePessoa(id).then(() => {
                getPessoas();
                toastr.success('Registro excluído com sucesso', 'Pessoa');
            }).catch((error) => {
                toastr.error(error, 'Pessoa');
            });
        };

        // Formato a data para se adequar ao padrao de data do banco de dados
        const formatDate = () => {
            const date = $scope.pessoa.dt_nasc = $scope.pessoa.dt_nasc.replace(/\//g, '');
            const day = date.substring(0, 2);
            const month = date.substring(2, 4);
            const year = date.substring(4, 8);
            const parsedDate = new Date(year, parseInt(month, 10) - 1, day);
            const formattedDate = parsedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
            $scope.pessoa.dt_nasc = formattedDate;
        };

        getProfissoes();
        getPessoas();
    },
]);

app.directive('searchText', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.on('input', function () {
                scope.$apply(function () {
                    scope.searchText = element.val();
                });
            });
        }
    };
});

app.filter('filterByName', function () {
    return function (pessoas, searchText) {
        if (!searchText) {
            return pessoas;
        }
        var filteredPessoas = [];
        angular.forEach(pessoas, function (pessoa) {
            if (pessoa.pes_nome.toLowerCase().indexOf(searchText.toLowerCase()) !== -1) {
                filteredPessoas.push(pessoa);
            }
        });
        return filteredPessoas;
    };
});

app.filter('mask', function () {
    return function (inputText, maskPattern) {
        if (!inputText) {
            return '';
        }
        let maskedText = '';
        let inputIndex = 0;
        for (let i = 0; i < maskPattern.length; i++) {
            if (maskPattern[i] === '9' || maskPattern[i] === 'A') {
                maskedText += inputText[inputIndex] || '';
                inputIndex++;
            } else {
                maskedText += maskPattern[i];
            }
        }
        return maskedText;
    };
});
