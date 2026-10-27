function formFoundryCodeEditor($window, $timeout) {
    return {
        restrict: 'E',
        require: 'ngModel',
        scope: { language: '@', label: '@', inputId: '@', readOnly: '=?', disabled: '=?' },
        link: function (scope, element, attrs, model) {
            var editor = $window.CodeMirror(element[0], {
                mode: scope.language === 'json' ? 'application/json' : 'text/javascript',
                lineNumbers: true,
                lineWrapping: false,
                indentUnit: 4,
                tabSize: 4,
                matchBrackets: true,
                readOnly: !!scope.readOnly || !!scope.disabled,
                inputStyle: 'textarea'
            });
            var input = editor.getInputField();
            input.id = scope.inputId;
            input.setAttribute('aria-label', scope.label);
            input.setAttribute('spellcheck', 'false');
            model.$render = function () {
                var value = model.$viewValue || '';
                if (editor.getValue() !== value) editor.setValue(value);
            };
            function changed(instance, change) {
                if (change.origin === 'setValue') return;
                scope.$evalAsync(function () { model.$setViewValue(instance.getValue()); });
            }
            editor.on('change', changed);
            var unwatch = scope.$watchGroup(['readOnly', 'disabled'], function () {
                editor.setOption('readOnly', !!scope.readOnly || !!scope.disabled);
            });
            var refresh = $timeout(function () { editor.refresh(); }, 0);
            model.$render();
            scope.$on('$destroy', function () {
                $timeout.cancel(refresh);
                unwatch();
                editor.off('change', changed);
                editor.getWrapperElement().remove();
            });
        }
    };
}
