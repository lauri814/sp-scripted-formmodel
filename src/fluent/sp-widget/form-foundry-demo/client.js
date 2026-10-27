api.controller = function ($scope, $timeout) {
    var c = this;
    var pendingMount;
    var pendingEdit;
    var requestId = 0;
    var requestInFlight = false;
    var queuedEdit = false;
    var destroyed = false;
    c.activeApi = c.data.activeApi;
    c.applying = false;
    c.previewReady = false;
    c.previewVisible = !!c.data.preview;
    c.error = c.data.error || '';
    c.builderSource = c.data.examples.builder;
    c.definitionText = c.appliedDefinition = c.data.examples.definition;

    function queueDefinition(delay) {
        $timeout.cancel(pendingEdit);
        pendingEdit = $timeout(refreshDefinition, delay);
    }

    $scope.$on('formFoundry.preview.ready', function (event, generation) {
        if (generation !== c.data.generation) return;
        event.stopPropagation();
        c.previewReady = true;
        c.applying = false;
        if (queuedEdit && c.activeApi === 'definition') {
            queuedEdit = false;
            queueDefinition(0);
        }
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
        requestInFlight = true;
        c.applying = true;
        c.error = '';
        return c.server.get(payload).then(function (response) {
            if (destroyed || currentRequest !== requestId) return;
            requestInFlight = false;
            if (payload.action === 'preview' && payload.definition !== c.definitionText) {
                c.applying = false;
                queuedEdit = false;
                queueDefinition(0);
                return;
            }
            var result = response && response.data;
            if (!result || result.error || !result.preview) {
                c.applying = false;
                c.error = (result && result.error) || 'No form model was returned.';
                return;
            }
            if (result.activeApi === 'definition') {
                c.appliedDefinition = payload.definition;
                queuedEdit = c.definitionText !== c.appliedDefinition;
            }
            mountPreview(result);
        }, function () {
            if (destroyed || currentRequest !== requestId) return;
            requestInFlight = false;
            c.applying = false;
            c.error = 'The preview could not be updated.';
            if (queuedEdit && c.activeApi === 'definition') {
                queuedEdit = false;
                queueDefinition(0);
            }
        });
    }

    function refreshDefinition() {
        if (destroyed || c.activeApi !== 'definition') return;
        if (requestInFlight || !c.previewReady) {
            queuedEdit = true;
            return;
        }
        queuedEdit = false;
        try {
            JSON.parse(c.definitionText);
        } catch (error) {
            c.error = 'Invalid JSON: ' + error.message;
            return;
        }
        c.error = '';
        if (c.definitionText === c.appliedDefinition) return;
        return requestPreview({ action: 'preview', api: 'definition', definition: c.definitionText });
    }

    c.selectApi = function (apiName) {
        if (c.applying || !c.previewReady || apiName === c.activeApi ||
            ['builder', 'definition'].indexOf(apiName) === -1) return;
        $timeout.cancel(pendingEdit);
        queuedEdit = false;
        // Switching back to JSON restores its last valid form without discarding an invalid draft.
        return requestPreview({ action: 'switch', api: apiName,
            definition: apiName === 'definition' ? c.appliedDefinition : undefined });
    };

    var unwatch = $scope.$watch(function () { return c.definitionText; }, function (value, previous) {
        if (value === previous || c.activeApi !== 'definition') return;
        queuedEdit = true;
        c.error = '';
        queueDefinition(400);
    });

    $scope.$on('$destroy', function () {
        destroyed = true;
        requestId++;
        unwatch();
        $timeout.cancel(pendingMount);
        $timeout.cancel(pendingEdit);
    });
};
