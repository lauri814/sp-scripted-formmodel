import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    bom_json: {
                        table: 'sys_module'
                        id: 'f8b80a9e825f4f72a168dcb35ae744b7'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: '1156c3bfdea640289996b3566d51ea16'
                    }
                    'scripted-form-builder': {
                        table: 'sys_script_include'
                        id: 'f1aaf0ffacdf468f8d70843e6526bc63'
                    }
                    'scripted-form-definition': {
                        table: 'sys_script_include'
                        id: 'ec1695d7b1e44a38b220afb67f718aab'
                    }
                    x_934661_foundry_code_editor: {
                        table: 'sp_angular_provider'
                        id: 'ca388bb0938b49c6afa6c056fc78f1b7'
                    }
                    x_934661_foundry_demo_column: {
                        table: 'sp_column'
                        id: '16fee08e3f1a4556afb125a3a82acf82'
                    }
                    x_934661_foundry_demo_container: {
                        table: 'sp_container'
                        id: 'df84d0d58ef24f9ba18bc9d0ac5cb1de'
                    }
                    x_934661_foundry_demo_instance: {
                        table: 'sp_instance'
                        id: 'e0beb2c116d1410bbaa26bad0b68adb4'
                    }
                    x_934661_foundry_demo_preview: {
                        table: 'sp_widget'
                        id: 'a495be2a201443eb95d27f84f26acb73'
                    }
                    x_934661_foundry_demo_row: {
                        table: 'sp_row'
                        id: '669e55e4cf554c8db8987a8c2a336de4'
                    }
                    x_934661_foundry_demo_widget: {
                        table: 'sp_widget'
                        id: '48df1a6116254a87aa5ad8dce56f9861'
                    }
                }
                composite: [
                    {
                        table: 'm2m_sp_widget_dependency'
                        id: '79861a36bb2b4b8fbb90c76d49424b8f'
                        key: {
                            sp_widget: '48df1a6116254a87aa5ad8dce56f9861'
                            sp_dependency: '016f19255b301200e39fc7ad31f91abd'
                        }
                    },
                    {
                        table: 'sp_page'
                        id: '842d39380a7a4dd38e83ea272b0ab317'
                        key: {
                            id: 'x_934661_foundry_demo'
                        }
                    },
                    {
                        table: 'm2m_sp_ng_pro_sp_widget'
                        id: 'b07f836a370f46eb926bbb7b3c4180ca'
                        key: {
                            sp_widget: '48df1a6116254a87aa5ad8dce56f9861'
                            sp_angular_provider: 'ca388bb0938b49c6afa6c056fc78f1b7'
                        }
                    },
                ]
            }
        }
    }
}
