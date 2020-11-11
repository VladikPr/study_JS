'use strict';

class Todo {
    constructor(form, input, todoList, todoCompleted, todoContainer) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted);
        this.todoContainer = document.querySelector(todoContainer);
        this.todoData = new Map(JSON.parse(localStorage.getItem('toDoList')));
    }

    addToStorage() {
        localStorage.setItem('toDoList', JSON.stringify([...this.todoData]) || []);
    }
    
    render() {
        this.todoList.textContent = '';
        this.todoCompleted.textContent = '';
        this.todoData.forEach(this.createItem, this);
        this.addToStorage();
    }

    createItem(todo) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.key = todo.key;
        li.borderLine = todo.borderLine;
        li.insertAdjacentHTML('beforeend', `
            <span class="text-todo" contenteditable=${todo.edit}>${todo.value}</span>
            <div class="todo-buttons">
                <button class="todo-edit"></button>
				<button class="todo-remove"></button>
				<button class="todo-complete"></button>
			</div>
        `);

    
        if(todo.completed){
            this.todoCompleted.append(li);
        } else {
            this.todoList.append(li);
        }

        if(li.borderLine === true){
            li.querySelector('.text-todo').style.border= "1px solid black";
        } else {
            li.querySelector('.text-todo').style.border= "none";
        }

    }

    addTodo(e) {
        e.preventDefault();

        if(this.input.value.trim()) {
            const newTodo = {
                value: this.input.value,
                completed: false,
                key: this.generateKey(),
                edit: false,
                borderLine: false
            };

            this.todoData.set(newTodo.key, newTodo);
            this.render();
            this.input.value = '';
        } else {
            alert('Поле не может быть пустым!');
        }
    }


    generateKey() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    deletedItem(key,elem) {
        let startAnimation;
        let changer = 0;
        const height = 50;
        const elementGrandfather = elem.closest('.todo-item');
        //CSS Animation
        /* elementGrandfather.style.cssText = `transition: all 0.5s ease;
                                            transform: translateY(-200px);
                                            opacity: 0;`;
        elem.parentNode.parentNode.addEventListener('transitionend', ()=> {
            this.todoData.delete(key);
            this.render();
        }); */

        elem.parentNode.parentNode.textContent = "";
        this.todoData.forEach((element) => {
            if(key === element.key){
                let deleteItem = () => {
                    changer+=5;
                    if((height-changer) < 0){
                        cancelAnimationFrame(deleteItem);
                    } else {
                        startAnimation = requestAnimationFrame(deleteItem);
                        elementGrandfather.style.height = (height - changer) + 'px';
                        elementGrandfather.style.opacity = 1 - changer * 0.02;
                    }
                };
                deleteItem();
                
            }
        });
    
       
        setTimeout(()=>{
            this.todoData.delete(key);
            this.render();
        },500);
        
    }

    completedItem(key,elem) {
        const item = elem.closest('.todo-item');

        this.todoData.forEach((element) => {
            if(key === element.key){
                if(element.completed) {
                    item.style.cssText = `transition: all 0.3s ease;
                                        transform: translateY(-100px);
                                        opacity: 0;`;
                    item.addEventListener('transitionend', ()=> {
                        element.completed = false;
                        this.render();
                    });
                    
                } else{
                    item.style.cssText = `transition: all 0.3s ease;
                                        transform: translateY(100px);
                                        opacity: 0;`;
                    item.addEventListener('transitionend', ()=> {
                        element.completed = true; 
                        this.render();
                    });
                    
                }
            }
        });
    }
    
    editItem(key){
        this.todoData.forEach((element) => {
            if(key === element.key){
               element.edit = true;

               if(element.borderLine === false){
                element.borderLine = true;
               }else{
                element.borderLine = false;
               }
            }
        });
    }

    saveChanges(key,elem){
        elem.style.outline = '';
        const defaultValue = elem.textContent;
        //change event
        elem.addEventListener('blur', ()=> {
            elem.style.outline = "0px solid transparent"; 
            this.todoData.forEach((element) => {
                if(key === element.key){
                   if(elem.textContent <1){
                        element.value = defaultValue;
                   } else{
                        element.value = elem.textContent;
                   }
                   element.edit = false;
                   element.borderLine = false;
                   this.render();
                }
            });
        });
    }

    handler() {
        this.todoContainer.addEventListener('click', (e) =>{
            const {target} = e;
            if(!target.matches('.todo-list, .todo-completed')){
                const targetKey = target.closest('.todo-item').key;
                
                if (target.classList.contains('todo-complete')){
                    this.completedItem(targetKey, target);
                } else if (target.classList.contains('todo-remove')){
                    this. deletedItem(targetKey, target);
                } else if(target.classList.contains('todo-edit')){
                    this.editItem(targetKey);
                    this.render();
                } else if (target.classList.contains('text-todo')){
                    this.saveChanges(target.parentNode.key, target);
                }
            } 

        });
    }

    

    init() {
        this.form.addEventListener('submit', this.addTodo.bind(this));
        this.render();
        this.handler();
    }
}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed', '.todo-container');

todo.init();
