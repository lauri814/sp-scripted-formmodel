# sp-scripted-formmodel

Form Foundry builds transient Service Portal form models from JavaScript or JSON definitions. It uses the native `sp-model` renderer without creating catalog questions or persisting answers.

## ScriptedFormBuilder

`new ScriptedFormBuilder(options)` creates a chainable builder. Field methods take `(name, label, options)` and return the builder. `build()` returns an independent, JSON-serializable model; later changes to that model do not alter the builder.

```javascript
var formModel = new ScriptedFormBuilder()
    .singleLineText('summary', 'Summary', { mandatory: true })
    .email('email', 'Email')
    .selectBox('priority', 'Priority', {
        choices: [
            { label: 'Normal', value: 'normal' },
            { label: 'Urgent', value: 'urgent' }
        ],
        value: 'normal'
    })
    .build();
```

Supported fields include text, email, URL, IP address, dates, duration, references, list collectors, choices, numeric scales, checkboxes, masked fields, labels, HTML, widgets, and attachments. Shared options include `value`, `displayValue`, `mandatory`, `readonly`, `visible`, `placeholder`, and help metadata.

- Field names must be unique and match `[a-z][a-z0-9_]*`.
- `containerStart(name, label, options)`, `containerSplit()`, and `containerEnd()` define layout. Containers support up to twelve columns, cannot nest, and must be closed before `build()`.
- `clientScript(type, name, source, options)` registers `onLoad`, `onChange`, or `onSubmit` source. `onChange` requires `options.fieldName`. `onLoad(name, source)` is a convenience method.
- References and list collectors require `options.reference`. Qualifiers are passed through as metadata; the builder does not evaluate them or resolve lookup choices.
- Attachment fields require `attachmentGuid` in the constructor options. Uploading attachments can create attachment records.

## ScriptedFormDefinition

`new ScriptedFormDefinition().build(input, runtimeOptions)` accepts a definition object or JSON string and returns the same model shape as the builder. `runtimeOptions` are passed to `ScriptedFormBuilder`.

```javascript
var formModel = new ScriptedFormDefinition().build({
    schemaVersion: 1,
    id: 'request',
    elements: [{
        id: 'summary-field',
        kind: 'field',
        name: 'summary',
        label: 'Summary',
        fieldType: 'singleLineText',
        options: { mandatory: true }
    }]
});
```

Definitions require `schemaVersion: 1`, a nonempty `id`, and an `elements` array. A field's `fieldType` names a supported public builder field method. Containers use `kind: 'container'` with `columns: [{ id, elements }]`. Optional `scripts` contain `id`, `type`, `name`, `source`, and, for `onChange`, a declared field's `fieldName`.

The adapter copies its input, validates the complete definition, and then calls the builder. IDs must be unique across the definition, elements, columns, and scripts. Runtime names must also be unique, including generated checkbox groups. Invalid types, unknown properties, and unsupported nesting throw errors with the failing path or element context.

## Rendering and demo

Set a widget server property such as `data.formModel` to either API's result, then bind it in the template:

```html
<sp-model form-model="c.data.formModel" mandatory="c.mandatory"></sp-model>
```

Initialize `c.mandatory = []` in the widget controller. Both Script Includes are scoped to the application. Answer storage, submission, catalog transactions, and business validation belong to the consuming application.

The included team-offsite demo compares equivalent models from both APIs, displays their source, and switches the live preview between them. The demo page, widget, and layout records use `$meta: { installMethod: 'demo' }`. After installation, open `/esc?id=x_934661_foundry_demo` or `/sp?id=x_934661_foundry_demo`.

## Build and install

Requires Node.js 20.18 or later. The project uses ServiceNow SDK 4.14.0.

```bash
npm ci
npm run build
# With SDK authentication configured:
npx --no-install @servicenow/sdk install --demoData
```

`now.config.json` and `package.json` live at the repository root. The application remains **Form Foundry**, version **0.0.1**, scope `x_934661_foundry`; generated record identities are retained in `src/fluent/generated/keys.ts`.
