api.controller = function ($scope) {
    var c = this;
    var forms = [];
    var ready = false;
    c.formModel = angular.copy(c.data.formModel);

    $scope.$on('spModel.gForm.env.created', function (event, form) {
        if (forms.indexOf(form) === -1) forms.push(form);
    });
    $scope.$on('spModel.gForm.initialized', function () {
        if (ready) return;
        ready = true;
        $scope.$emit('formFoundry.preview.ready', c.data.generation);
    });
    $scope.$on('$destroy', function () {
        forms.forEach(function (form) {
            // Release form callbacks before another preview can register client scripts.
            if (form.$private && form.$private.events) form.$private.events.cleanup();
        });
        forms = [];
        c.formModel = undefined;
    });
};
