api.controller = function ($scope, $timeout) {
    var c = this;
    var pendingSwitch;
    var requestId = 0;
    var destroyed = false;
    c.activeApi = 'builder';
    c.applying = false;
    c.error = c.data.error || '';
    c.status = '';
    c.mandatory = [];
    c.formModel = c.data.formModels ? c.data.formModels.builder : null;
    c.builderSource = c.data.examples.builder;
    c.definitionText = c.appliedDefinition = c.data.examples.definition;

    function bindModel() {
        // sp-model caches field directives; unlink them before binding another model.
        c.formModel = null;
        c.mandatory = [];
        $timeout.cancel(pendingSwitch);
        pendingSwitch = $timeout(function () {
            c.formModel = c.data.formModels[c.activeApi];
        });
    }

    c.selectApi = function (apiName) {
        if (apiName === c.activeApi || !c.data.formModels || !c.data.formModels[apiName]) return;
        c.activeApi = apiName;
        bindModel();
    };

    function requestPreview(payload) {
        var currentRequest = ++requestId;
        c.applying = true;
        c.error = '';
        c.status = '';
        return c.server.get(payload).then(function (response) {
            if (destroyed || currentRequest !== requestId) return;
            c.applying = false;
            var result = response && response.data;
            if (!result || result.error || !result.formModels) {
                c.error = (result && result.error) || 'No form model was returned.';
                return;
            }
            c.data = result;
            c.builderSource = result.examples.builder;
            c.definitionText = c.appliedDefinition = result.examples.definition;
            c.status = payload.action === 'reset' ? 'Sample restored.' : 'Preview updated.';
            bindModel();
        }, function () {
            if (destroyed || currentRequest !== requestId) return;
            c.applying = false;
            c.error = 'The preview could not be updated. Your previous form is still available.';
        });
    }

    c.applyPreview = function () {
        if (c.applying) return;
        c.error = '';
        c.status = '';
        try {
            JSON.parse(c.definitionText);
        } catch (error) {
            c.error = 'Invalid JSON: ' + error.message;
            return;
        }
        return requestPreview({ action: 'preview', definition: c.definitionText });
    };

    c.resetSample = function () {
        if (!c.applying) return requestPreview({ action: 'reset' });
    };

    $scope.$on('$destroy', function () {
        destroyed = true;
        requestId++;
        $timeout.cancel(pendingSwitch);
    });
};
