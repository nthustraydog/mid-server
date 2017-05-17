const fs = require('fs');
const uuid = require('uuid/v4');
const moment = require('moment');

function list(unaccomplishedOnly = false, searchText = '') {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync('data-todos.json')) {
            fs.writeFileSync('data-todos.json', '');
        }

        fs.readFile('data-todos.json', 'utf8', (err, data) => {
            if (err) reject(err);

            let todos = data ? JSON.parse(data) : [];


            if (todos.length > 0 && searchText) {
                todos = todos.filter(t => {
                    return t.text.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
                });
            }


            if (todos.length > 0 && unaccomplishedOnly === "true") {
                todos = todos.filter(t => {
                    return !t.doneTs;
                });
            }

            resolve(todos);
        });
    });
}

function create(mood, text) {
    return new Promise((resolve, reject) => {
        const newTodo = {
            id: uuid(),
            mood: mood,
            text: text,
            ts: moment().unix(),
            doneTs: null
        };

        list().then(todos => {
            todos = [
                newTodo,
                ...todos
            ];
            fs.writeFile('data-todos.json', JSON.stringify(todos), err => {
                if (err) reject(err);

                resolve(todos);
            });
        });
    });
}

function accomplish(todoId) {
    return new Promise((resolve, reject) => {
        let accomplishedTodo = null;
        let i=0;
        console.log("id: " +　todoId[1]);
        list().then(todos => {
            todos = todos.map(t => {
                console.log((i++) + " " + t.id);
                if(t.id === todoId) {
                    accomplishedTodo = t;
                    t.doneTs = moment().unix();
                }
                return t;
            });
            fs.writeFile('data-todos.json', JSON.stringify(todos), err => {
                if (err) reject(err);

                resolve(accomplishedTodo);
            });
        });
    });
}

module.exports = {
    list,
    create,
    accomplish
};
