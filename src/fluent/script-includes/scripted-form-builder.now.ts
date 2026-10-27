import '@servicenow/sdk/global'
import { ScriptInclude } from '@servicenow/sdk/core'

export const ScriptedFormBuilder = ScriptInclude({
    $id: Now.ID['scripted-form-builder'],
    name: 'ScriptedFormBuilder',
    description: 'Builds transient Service Portal form models with chainable field and layout methods.',
    active: true,
    accessibleFrom: 'package_private',
    clientCallable: false,
    script: Now.include('../../server/script-includes/ScriptedFormBuilder.js'),
})
