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

The team-offsite demo has an editable JSON definition and a matching, read-only JavaScript builder example. Select **Apply preview** to validate the JSON, rebuild both models, and regenerate the builder code. Invalid input leaves the last working preview available; **Reset sample** restores the default definition. Switching APIs preserves each preview's answers, while applying a definition resets them. Changing the full name displays a greeting using `g_form.addInfoMessage()`.

The default definition is stored in `src/fluent/sp-widget/form-foundry-demo/offsite-definition.json` and included in the widget at build time. The builder example serializes the same method calls used to render its model; it does not depend on runtime function-source inspection or evaluate edited JavaScript on the server.

The demo page, widget, and layout records use `$meta: { installMethod: 'demo' }`. After installation, open `/esc?id=x_934661_foundry_demo` or `/sp?id=x_934661_foundry_demo`.

## Installation

Requires Node.js 20.18 or later and a ServiceNow development instance configured for SDK OAuth authentication.

Clone the repository and run the following commands from its root, where `now.config.json` and `package.json` live. This is an existing Fluent project, so **do not run `init`**.

```bash
git clone https://github.com/lauri814/sp-scripted-formmodel.git
cd sp-scripted-formmodel

# Install the project's pinned dependencies, including the local SDK.
npm ci

# Authenticate once; replace the example URL with your instance URL.
npx --no-install @servicenow/sdk auth --add https://your-instance.service-now.com --type oauth --alias dev

# Compile the Fluent source into application records.
npm run build

# Deploy the built application, including its demo records.
npm run deploy -- --auth dev --demoData
```

No global SDK installation is required. `npm run build` and `npm run deploy` use the local SDK installed by `npm ci`. The `deploy` script runs `now-sdk install`; here, **install means deploying to the instance**, not installing an npm dependency. For subsequent changes, repeat build and deploy.
