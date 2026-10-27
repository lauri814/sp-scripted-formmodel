import '@servicenow/sdk/global'
import { SPWidget } from '@servicenow/sdk/core'

export const formFoundryPreviewWidget = SPWidget({
    $id: Now.ID['x_934661_foundry_demo_preview'],
    $meta: { installMethod: 'demo' },
    id: 'x_934661_foundry_demo_preview',
    name: 'Form Foundry — Form preview',
    category: 'sample',
    controllerAs: 'c',
    public: false,
    htmlTemplate: Now.include('./template.html'),
    clientScript: Now.include('./client.js'),
    serverScript: Now.include('./server.js'),
})
