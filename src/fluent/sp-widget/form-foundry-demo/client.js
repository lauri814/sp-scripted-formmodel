api.controller = function ($scope, $timeout) {
    var c = this;
    var pendingMount;
    var requestId = 0;
    var destroyed = false;
    c.activeApi = c.data.activeApi;
    c.applying = false;
    c.previewReady = false;
    c.previewVisible = !!c.data.preview;
    c.error = c.data.error || '';
    c.status = '';
    c.builderSource = c.data.examples.builder;
    c.definitionText = c.appliedDefinition = c.data.examples.definition;

    $scope.$on('formFoundry.preview.ready', function (event, generation) {
        if (generation !== c.data.generation) return;
        event.stopPropagation();
        c.previewReady = true;
        c.applying = false;
    });

    function mountPreview(result) {
        // Finish destroying the old widget and its form scope before mounting the next.
        c.previewVisible = false;
        c.previewReady = false;
        $timeout.cancel(pendingMount);
        pendingMount = $timeout(function () {
            if (destroyed) return;
            c.data = result;
            c.activeApi = result.activeApi;
            c.previewVisible = true;
        });
    }

    function requestPreview(payload) {
        var currentRequest = ++requestId;
        payload.generation = currentRequest;
        payload.api = payload.api || c.activeApi;
        c.applying = true;
        c.error = '';
        c.status = '';
        return c.server.get(payload).then(function (response) {
            if (destroyed || currentRequest !== requestId) return;
            var result = response && response.data;
            if (!result || result.error || !result.preview) {
                c.applying = false;
                c.error = (result && result.error) || 'No form model was returned.';
                return;
            }
            c.builderSource = result.examples.builder;
            c.appliedDefinition = result.examples.definition;
            if (payload.action !== 'switch') c.definitionText = result.examples.definition;
            c.status = payload.action === 'reset' ? 'Sample restored.' :
                payload.action === 'switch' ? '' : 'Preview updated.';
            mountPreview(result);
        }, function () {
            if (destroyed || currentRequest !== requestId) return;
            c.applying = false;
            c.error = 'The preview could not be updated.';
        });
    }

    c.selectApi = function (apiName) {
        if (c.applying || !c.previewReady || apiName === c.activeApi ||
            ['builder', 'definition'].indexOf(apiName) === -1) return;
        return requestPreview({ action: 'switch', api: apiName, definition: c.appliedDefinition });
    };

    c.applyPreview = function () {
        if (c.applying || !c.previewReady) return;
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
        if (!c.applying && (!c.previewVisible || c.previewReady)) return requestPreview({ action: 'reset' });
    };

    $scope.$on('$destroy', function () {
        destroyed = true;
        requestId++;
        $timeout.cancel(pendingMount);
    });
};
