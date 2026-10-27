import '@servicenow/sdk/global'
import { ScriptInclude } from '@servicenow/sdk/core'

export const ScriptedFormDefinition = ScriptInclude({
    $id: Now.ID['scripted-form-definition'],
    name: 'ScriptedFormDefinition',
    description: 'Validates versioned JSON form definitions and builds Service Portal form models through ScriptedFormBuilder.',
    active: true,
    accessibleFrom: 'package_private',
    clientCallable: false,
    script: Now.include('../../server/script-includes/ScriptedFormDefinition.js'),
})
