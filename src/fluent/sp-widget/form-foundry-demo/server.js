(function () {
    data.error = '';
    data.title = '';
    data.preview = null;
    data.examples = { builder: '', definition: '' };
    data.activeApi = 'builder';
    data.generation = input && typeof input.generation === 'number' ? input.generation : 0;

    try {
        if (input && input.action !== 'preview' && input.action !== 'switch')
            throw new Error('Unsupported preview action.');
        if (input && input.api !== undefined && input.api !== 'builder' && input.api !== 'definition')
            throw new Error('Unsupported form API.');
        data.activeApi = input && input.api === 'definition' ? 'definition' : 'builder';

        var definition = formFoundryDefaultDefinition;
        var builderExample = createBuilderExample(formFoundryDefaultDefinition);
        var formModel = builderExample.model;
        if (data.activeApi === 'definition') {
            if (typeof input.definition !== 'string')
                throw new Error('Definition must be a JSON string.');
            definition = JSON.parse(input.definition);
            formModel = new ScriptedFormDefinition().build(definition);
        }
        data.preview = $sp.getWidget('x_934661_foundry_demo_preview', {
            formModel: formModel,
            generation: data.generation
        });
        data.examples = {
            builder: builderExample.source,
            definition: JSON.stringify(definition, null, 4)
        };
        data.title = definition.title || 'Plan a team offsite';
    } catch (error) {
        data.error = error.message || String(error);
    }
})();
