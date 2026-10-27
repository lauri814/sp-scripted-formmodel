api.controller = function ($scope) {
    var c = this;
    var forms = [];
    var ready = false;
    c.formModel = angular.copy(c.data.formModel);

    $scope.$on('spModel.gForm.env.created', function (event, form) {
        if (forms.indexOf(form) === -1) forms.push(form);
        // Transient fields already use their variable names. Catalog alias dispatch
        // would report the same change twice when name and variable_name match.
        if (c.formModel.is_transient && form.$private && typeof form.$private.options === 'function')
            form.$private.options({ getMappedFieldName: null });
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
