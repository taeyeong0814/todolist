Ext.define('todolist.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    generateTodoId: function() {
        var random = Math.random();

        return Ext.String.format('T{0}', new Date().getTime());
    },

    load: function() {
        var self = this;
        var storeTodoList = this._loadTodoList();

        if(storeTodoList) {
            Object.keys(storeTodoList).forEach(function(todoId) {
                var config = storeTodoList[todoId];
                self.getViewModel().add(config);
                self._addTodoToPanel(config);
            });
        } else {
            return this.getView();
        }

    },

    getTodoText: function() {
        return this.getView().down('textfield[name=todoText]');
    },

    getProgressPanel: function() {
        return this.getView().down('progressPanel');
    },

    getDonePanel: function() {
        return this.getView().down('donePanel');
    },

    getContentPanel : function() {
        return this.getView().down('contentPanel');
    },

    getTodoPanel: function() {
        return this.getView().down('todo');
    },

    findTodoPanel: function(todoId) {
        var todoPanel;
        var todoList = [];

        todoList = todoList.concat(this.getProgressPanel().items.items);
        todoList = todoList.concat(this.getDonePanel().items.items);

        todoPanel = todoList.find(function(todo) {
           return todoId == todo.todoId;
        });

        return todoPanel;
    },

    updateContent: function(obj) {
        var contentPanel = this.getContentPanel();
        var todoPanel = this.findTodoPanel(obj.todoId);

        if (obj.target === 'content') {
            if (obj.type === 'textfield') {
                contentPanel.down('textfield').setValue(obj.value);
            } else if (obj.type === 'checkbox') {
                contentPanel.down('checkbox').setValue(obj.value);
            } else if (obj.type === 'content') {
                contentPanel.down('textarea').setValue(obj.value);
            }
        } else {
            if (obj.type === 'textfield') {
                todoPanel.down('textfield').setValue(obj.value);
            } else if (obj.type === 'checkbox') {
                todoPanel.down('checkbox').setValue(obj.value);
            } else if (obj.type === 'content') {
                todoPanel.content = obj.value;
            }
        }

        this.saveTodoList();
    },

    updateTodo: function(todoId, text) {
        var contentPanel = this.getTodoPanel();
        console.log("투두아이디"+todoId);
        contentPanel.down('textfield').setValue(todoId);
        //console.log(contentPanel.down('textfield').setValue(text));
    },

    toggleStatus: function(todoId) {
        var contentPanel = this.getContentPanel();
        contentPanel.down('textfield').setValue(text);
        console.log(contentPanel.down('textfield').setValue(text));

        var config = {
            checked: false,
            text: text
        };

        console.log("DonePanel : "+config);

        this._addDoneToPanel(config);

        var todoList = this._loadTodoList();

        if (!todoList) todoList = [];

        todoList.push(config);

        this._saveTodoList(todoList);

    },

    _loadTodoList: function() {
        return JSON.parse(localStorage.getItem('todoList'));
    },

    _saveTodoList: function(todoList) {
        localStorage.setItem('todoList', JSON.stringify(todoList));
    },

    saveTodoList: function() {
        var panels = [this.getProgressPanel(), this.getDonePanel()];
        var todoList = [];

        panels.forEach(function(panel) {
            panel.items.items.forEach(function(todo) {
                todoList.push({
                    todoId: todo.todoId,
                    checked: todo.getChecked(),
                    text: todo.getText(),
                    content: todo.getContent()
                });
            });
        });

        this._saveTodoList(todoList);
    },

    _addTodoToPanel: function (config) {
        var panel = config.checked ? this.getDonePanel() : this.getProgressPanel();
        var todo = Ext.create('todolist.view.main.Todo', {
            todoId : config.todoId
        });

        //todo.todoId = config.todoId;

        panel.add(todo);
    },

    _addDoneToPanel: function (config) {
        var panel = config.checked ? this.getProgressPanel() : this.getDonePanel();
        var todo = Ext.create('todolist.view.main.Todo', {
            todoId : config.todoId
        });
        //todo.todoId = config.todoId;
   /*     todo.down('textfield').setValue(config);
        console.log(config.text);*/
        panel.add(todo);
    },

    addTodo: function() {
        var text = this.getTodoText().getValue();
        this.getTodoText().setValue('');

        var config = {
            todoId: this.generateTodoId(),
            checked: false,
            text: text,
            content: '',
        };

        this.getViewModel().add(config);
        this._addTodoToPanel(config);
        this.getViewModel().sync();

        /*
        var storeTodoList = this._loadTodoList();

        if (!storeTodoList) storeTodoList = [];

        storeTodoList.push(config);

        this._saveTodoList(storeTodoList);
        */
    },

    save: function() {
        var contentPanel = this.getContentPanel();
        console.log(contentPanel.query('textfield'));
        console.log(contentPanel.down('textfield'));
        Ext.Msg.alert("저장","저장완료");

        var panel;

        if (contentPanel.todoId) {
            panel = this.getDonePanel();
        } else {
            panel = this.getProgressPanel();
        }

        //미완성..
        var todo = Ext.create('todolist.view.main.Todo');
        //여기서 기존 textfield를 삭제하고 다시 추가 시켜줘야할 것 같은데.
        todo.todoId = contentPanel.todoId;
        todo.down('textfield').setValue(contentPanel.down('textfield'));
        panel.add(todo);


        //localStorage.setItem('todoList', JSON.stringify(contentPanel.down('textfield')));
    },

    delete: function() {
        Ext.Msg.alert("삭제","삭제완료");
        var contentPanel = this.getContentPanel();
        //contentPanel.down('textfield').removed();
    }
});
