(function() {
    const input = document.querySelector('#itnew');
    const form = document.querySelector('#formitnew');
    const selectList = document.querySelector('#slist');
    const listContainer = document.querySelector('#lists');

    let todos = [];
    let lists = [
        { id: uuidv4(), text: 'General', count: 0 },
        { id: uuidv4(), text: 'Home', count: 0 },
        { id: uuidv4(), text: 'Job', count: 0 },
    ];

    document.addEventListener('DOMContentLoaded', e => {
        refreshUI();
        lists.forEach(list => {
            selectList.innerHTML += `<option value="${list.id}">${list.text}</option>`;
        });
    });

    function Todo(id, text, list, completed) {
        return { id: id, text: text, list: list, completed: completed };
    }

    form.addEventListener('submit', e => {
        e.preventDefault();
        const text = input.value.trim();
        const listId = selectList.value;

        if (text == '') return false;

        const newTodo = new Todo(uuidv4(), text, listId, false);

        todos.push(newTodo);
        input.value = '';
        refreshUI();
    });



    function refreshUI() {
        renderTodos();
        renderLists();
    }

    function renderTodos() {
        const todosContainer = document.querySelector('#todos');
        todosContainer.innerHTML = '';

        todos.forEach(todo => {
            todosContainer.innerHTML += renderTodo(todo);
        });

        document.querySelectorAll('.todo label input').forEach(item => {
            item.addEventListener('click', e => {
                const id = e.target.parentNode.parentNode.getAtribute('data-id');
                const index = todos.findIndex(i => i.id == id);

                todos[index].completed = !todos[index].completed;
            });
        });
    }

    function renderTodo(todo) {
        return `
            <div class="todo" data-id="${todo.id}">
            <label class="checkbox-container">${todo.text}
            <input type="checkbox" ${(todo.completed)? 'checked="checked"': ''} />
            <span class="checkmark"> </span>
            </label>
            </div>
        `;
    }

    function renderLists() {}


    function uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }


    ;
})();