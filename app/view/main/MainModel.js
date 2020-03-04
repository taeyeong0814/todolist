Ext.define('todolist.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.main',

    add: function(config) {
        var todoList = this.get('todoList');
        todoList[config.todoId] = {
            todoId : config.todoId,
            checked : config.checked,
            text : config.text,
            content : config.content
        };

        this.set('todoList', todoList);
    },

    sync: function() {
        var todoList = this.get('todoList');
        localStorage.setItem('todoList', JSON.stringify(todoList));
    },

    data: {
        todoList: {},
    }
});
