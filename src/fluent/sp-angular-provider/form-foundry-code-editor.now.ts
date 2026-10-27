import '@servicenow/sdk/global'
import { SPAngularProvider } from '@servicenow/sdk/core'

export const formFoundryCodeEditor = SPAngularProvider({
    $id: Now.ID['x_934661_foundry_code_editor'],
    $meta: { installMethod: 'demo' },
    name: 'formFoundryCodeEditor',
    type: 'directive',
    script: Now.include('./form-foundry-code-editor.js'),
})
