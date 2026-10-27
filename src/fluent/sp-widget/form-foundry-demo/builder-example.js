function createBuilderExample(definition) {
    var builder = new ScriptedFormBuilder();
    var lines = ['var formModel = new ScriptedFormBuilder()'];

    // Execute and serialize the same calls so the displayed example matches the model.
    function appendCall(method, args) {
        builder[method].apply(builder, args);
        var literals = args.map(function (value) { return JSON.stringify(value); });
        lines.push('    .' + method + '(' + literals.join(', ') + ')');
    }

    function emitElements(elements) {
        elements.forEach(function (element) {
            if (element.kind === 'field') {
                appendCall(element.fieldType, [element.name, element.label, element.options || {}]);
                return;
            }
            var options = JSON.parse(JSON.stringify(element.options || {}));
            if (element.columns[0].hashKey !== undefined)
                options.columnHashKey = element.columns[0].hashKey;
            appendCall('containerStart', [element.name, element.label, options]);
            element.columns.forEach(function (column, index) {
                if (index) {
                    var split = {};
                    if (column.hashKey !== undefined) split.hashKey = column.hashKey;
                    appendCall('containerSplit', [split]);
                }
                emitElements(column.elements);
            });
            appendCall('containerEnd', []);
        });
    }

    // ScriptedFormDefinition validates the complete definition before this function runs.
    emitElements(definition.elements);
    (definition.scripts || []).forEach(function (script) {
        appendCall('clientScript', [script.type, script.name, script.source, {
            fieldName: script.fieldName || ''
        }]);
    });
    lines.push('    .build();');
    return { model: builder.build(), source: lines.join('\n') };
}
