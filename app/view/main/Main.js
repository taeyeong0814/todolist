/**
 * Todo 메인
 */

Ext.define('todolist.view.main.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'app-main',
    border: true,
    layout: 'border',
    viewModel: 'main',
    controller: 'main',

    items: [{
        xtype: 'panel',
        region: 'north',
        height: 100,
        layout: 'border',
        items: [{
            xtype: 'textfield',
            name: 'todoText',
            region: 'center',
            flex: 1,
            emptyText: '할일 추가...',
            listeners: {
                specialkey: function(f,e){
                    if(e.getKey() == e.ENTER){
                        Ext.getCmp('btnTodo').click();
                    }
                }
            }
        }, {
            xtype: 'button',
            id: 'btnTodo',
            text: 'add',
            region: 'east',
            width: 50,
            handler: 'addTodo'
        }]
    }, {
        xtype: 'panel',
        layout: 'border',
        region: 'west',
        flex: 2,

        items: [{
            xtype: 'progressPanel',
            region: 'center'
        },{
            xtype: 'donePanel',
            region: 'south'
        }]
    },{
        xtype: 'contentPanel',
        region: 'center',
    }],

    listeners: {
        render: 'load'
    }
});