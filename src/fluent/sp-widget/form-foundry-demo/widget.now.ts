import '@servicenow/sdk/global'
import { SPWidget } from '@servicenow/sdk/core'

export const formFoundryDemoWidget = SPWidget({
    $id: Now.ID['x_934661_foundry_demo_widget'],
    $meta: { installMethod: 'demo' },
    id: 'x_934661_foundry_demo_widget',
    name: 'Form Foundry — Team offsite demo',
    description: 'Compares the builder and JSON definition APIs using the same interactive offsite form.',
    category: 'sample',
    controllerAs: 'c',
    public: false,
    htmlTemplate: Now.include('./template.html'),
    serverScript: `var formFoundryDefaultDefinition = ${Now.include('./offsite-definition.json')};
${Now.include('./builder-example.js')}
${Now.include('./server.js')}`,
    clientScript: Now.include('./client.js'),
    customCss: Now.include('./styles.scss'),
})
