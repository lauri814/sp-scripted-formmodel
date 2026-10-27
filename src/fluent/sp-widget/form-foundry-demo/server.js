(function () {
    data.formModels = {
        builder: buildWithBuilder(),
        definition: buildWithDefinition()
    };
    data.examples = {
        builder: buildWithBuilder.toString() + '\n\nvar formModel = buildWithBuilder();',
        definition: buildWithDefinition.toString() + '\n\nvar formModel = buildWithDefinition();'
    };

    function buildWithBuilder() {
        return new ScriptedFormBuilder()
            .containerStart('contact', 'Your details', { displayTitle: true })
            .singleLineText('full_name', 'Your name', {
                mandatory: true,
                placeholder: 'Avery Chen'
            })
            .email('work_email', 'Work email', {
                mandatory: true,
                placeholder: 'avery@example.com'
            })
            .containerSplit()
            .reference('team_lead', 'Team lead', {
                reference: 'sys_user',
                help_text: 'Choose the person coordinating your team.'
            })
            .yesNo('distributed_team', 'Is your team distributed?', { value: 'Yes' })
            .containerEnd()
            .containerStart('offsite', 'Plan your offsite', { displayTitle: true })
            .singleLineText('event_name', 'Give your offsite a name', {
                mandatory: true,
                value: 'Better together'
            })
            .date('preferred_date', 'Preferred date', { mandatory: true })
            .selectBox('destination', 'Where would you like to go?', {
                mandatory: true,
                includeNone: true,
                noneLabel: '-- Choose a destination --',
                choices: [
                    { label: 'City studio', value: 'city' },
                    { label: 'Coastal retreat', value: 'coast' },
                    { label: 'Somewhere green', value: 'country' }
                ]
            })
            .containerSplit()
            .multipleChoice('focus', 'What is the main focus?', {
                value: 'connection',
                choices: [
                    { label: 'Team connection', value: 'connection' },
                    { label: 'Planning and ideas', value: 'planning' },
                    { label: 'A well-earned celebration', value: 'celebration' }
                ]
            })
            .checkbox('accessible_venue', 'Step-free venue access needed', { value: true })
            .url('agenda_url', 'Agenda or inspiration link', {
                placeholder: 'https://example.com/our-plan'
            })
            .containerEnd()
            .multiLineText('extra_details', 'Anything else we should plan for?', {
                help_text: 'Tell us about dietary needs, travel arrangements, or your big idea.',
                placeholder: 'A quiet room, a great lunch, and absolutely no trust falls.'
            })
            .build();
    }

    function buildWithDefinition() {
        var definition = {
            schemaVersion: 1,
            id: 'team-offsite',
            title: 'Plan a team offsite',
            elements: [
                {
                    id: 'contact', kind: 'container', name: 'contact', label: 'Your details',
                    options: { displayTitle: true },
                    columns: [
                        {
                            id: 'contact-left',
                            elements: [
                                {
                                    id: 'full-name', kind: 'field', name: 'full_name',
                                    label: 'Your name', fieldType: 'singleLineText',
                                    options: { mandatory: true, placeholder: 'Avery Chen' }
                                },
                                {
                                    id: 'work-email', kind: 'field', name: 'work_email',
                                    label: 'Work email', fieldType: 'email',
                                    options: { mandatory: true, placeholder: 'avery@example.com' }
                                }
                            ]
                        },
                        {
                            id: 'contact-right',
                            elements: [
                                {
                                    id: 'team-lead', kind: 'field', name: 'team_lead',
                                    label: 'Team lead', fieldType: 'reference',
                                    options: {
                                        reference: 'sys_user',
                                        help_text: 'Choose the person coordinating your team.'
                                    }
                                },
                                {
                                    id: 'distributed-team', kind: 'field', name: 'distributed_team',
                                    label: 'Is your team distributed?', fieldType: 'yesNo',
                                    options: { value: 'Yes' }
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 'offsite', kind: 'container', name: 'offsite', label: 'Plan your offsite',
                    options: { displayTitle: true },
                    columns: [
                        {
                            id: 'offsite-left',
                            elements: [
                                {
                                    id: 'event-name', kind: 'field', name: 'event_name',
                                    label: 'Give your offsite a name', fieldType: 'singleLineText',
                                    options: { mandatory: true, value: 'Better together' }
                                },
                                {
                                    id: 'preferred-date', kind: 'field', name: 'preferred_date',
                                    label: 'Preferred date', fieldType: 'date',
                                    options: { mandatory: true }
                                },
                                {
                                    id: 'destination', kind: 'field', name: 'destination',
                                    label: 'Where would you like to go?', fieldType: 'selectBox',
                                    options: {
                                        mandatory: true,
                                        includeNone: true,
                                        noneLabel: '-- Choose a destination --',
                                        choices: [
                                            { label: 'City studio', value: 'city' },
                                            { label: 'Coastal retreat', value: 'coast' },
                                            { label: 'Somewhere green', value: 'country' }
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            id: 'offsite-right',
                            elements: [
                                {
                                    id: 'focus', kind: 'field', name: 'focus',
                                    label: 'What is the main focus?', fieldType: 'multipleChoice',
                                    options: {
                                        value: 'connection',
                                        choices: [
                                            { label: 'Team connection', value: 'connection' },
                                            { label: 'Planning and ideas', value: 'planning' },
                                            { label: 'A well-earned celebration', value: 'celebration' }
                                        ]
                                    }
                                },
                                {
                                    id: 'accessible-venue', kind: 'field', name: 'accessible_venue',
                                    label: 'Step-free venue access needed', fieldType: 'checkbox',
                                    options: { value: true }
                                },
                                {
                                    id: 'agenda-url', kind: 'field', name: 'agenda_url',
                                    label: 'Agenda or inspiration link', fieldType: 'url',
                                    options: { placeholder: 'https://example.com/our-plan' }
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 'extra-details', kind: 'field', name: 'extra_details',
                    label: 'Anything else we should plan for?', fieldType: 'multiLineText',
                    options: {
                        help_text: 'Tell us about dietary needs, travel arrangements, or your big idea.',
                        placeholder: 'A quiet room, a great lunch, and absolutely no trust falls.'
                    }
                }
            ]
        };
        return new ScriptedFormDefinition().build(definition);
    }
})();
