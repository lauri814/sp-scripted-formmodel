import '@servicenow/sdk/global'
import { SPPage } from '@servicenow/sdk/core'
import { formFoundryDemoWidget } from '../sp-widget/form-foundry-demo/widget.now'

export const formFoundryDemoPage = SPPage({
    $meta: { installMethod: 'demo' },
    pageId: 'x_934661_foundry_demo',
    title: 'Form Foundry — Plan a team offsite',
    shortDescription: 'A live comparison of the ScriptedFormBuilder and ScriptedFormDefinition APIs.',
    category: 'sample',
    public: false,
    containers: [{
        $id: Now.ID['x_934661_foundry_demo_container'],
        $meta: { installMethod: 'demo' },
        name: 'Form Foundry demo',
        width: 'container',
        parentClass: 'm-t-lg',
        order: 100,
        rows: [{
            $id: Now.ID['x_934661_foundry_demo_row'],
            $meta: { installMethod: 'demo' },
            order: 100,
            columns: [{
                $id: Now.ID['x_934661_foundry_demo_column'],
                $meta: { installMethod: 'demo' },
                size: 12,
                sizeSm: 12,
                sizeXs: 12,
                order: 100,
                instances: [{
                    $id: Now.ID['x_934661_foundry_demo_instance'],
                    $meta: { installMethod: 'demo' },
                    id: 'x_934661_foundry_demo_instance',
                    widget: formFoundryDemoWidget,
                    active: true,
                    order: 100,
                }],
            }],
        }],
    }],
})
