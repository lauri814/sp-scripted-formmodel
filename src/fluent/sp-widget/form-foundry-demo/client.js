api.controller = function ($scope, $timeout) {
    var c = this;
    var pendingSwitch;
    c.activeApi = 'builder';
    c.formModel = c.data.formModels.builder;
    c.mandatory = [];

    c.selectApi = function (apiName) {
        if (apiName === c.activeApi || !c.data.formModels[apiName]) return;
        c.activeApi = apiName;
        // sp-model caches field directives; unlink them before binding another model.
        c.formModel = null;
        c.mandatory = [];
        $timeout.cancel(pendingSwitch);
        pendingSwitch = $timeout(function () {
            c.formModel = c.data.formModels[apiName];
        });
    };

    $scope.$on('$destroy', function () {
        $timeout.cancel(pendingSwitch);
    });
};
