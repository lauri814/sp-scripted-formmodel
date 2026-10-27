(function () {
    data.error = '';
    data.title = '';
    data.formModels = null;
    data.examples = { builder: '', definition: '' };

    try {
        var definition = formFoundryDefaultDefinition;
        if (input && input.action === 'preview') {
            if (typeof input.definition !== 'string')
                throw new Error('Definition must be a JSON string.');
            definition = JSON.parse(input.definition);
        } else if (input && input.action !== 'reset') {
            throw new Error('Unsupported preview action.');
        }

        var definitionModel = new ScriptedFormDefinition().build(definition);
        var builderExample = createBuilderExample(definition);
        data.formModels = {
            builder: builderExample.model,
            definition: definitionModel
        };
        data.examples = {
            builder: builderExample.source,
            definition: JSON.stringify(definition, null, 4)
        };
        data.title = definition.title || 'Plan a team offsite';
    } catch (error) {
        data.error = error.message || String(error);
    }
})();
