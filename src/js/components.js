// Referencias en el HTML

import { Todo } from '../classes'

import { todoList } from '../index';

const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro') //etiqueta <a> es anchortags

export const crearTodoHtml = (todo) => {


    const htmlTodo = `

    <li class="${(todo.completado) ? 'completed' : ''}" data-id="${todo.id}">
						<div class="view">
							<input class="toggle" type="checkbox"${(todo.completado) ? 'checked' : ''} >
							<label>${todo.tarea}</label>
							<button class="destroy"></button>
						</div>
						<input class="edit" value="Create a TodoMVC template">
					</li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild); //Necesitamos crear el div para meter todo el html pero hacemos el append a su prinmer hijo que es el li

    return div.firstElementChild;


}

//EVENTOS
//El (event) nos dice la tecla que se presiono

txtInput.addEventListener('keyup', (event) => {
    //console.log(event);

    if (event.keyCode === 13 && txtInput.value.length > 0) {
        //console.log(txtInput.value);

        const nuevoTodo = new Todo(txtInput.value);
        todoList.nuevoTodo(nuevoTodo);

        //console.log(todoList)

        crearTodoHtml(nuevoTodo);
        txtInput.value = ''; //Borrar tras poner la entrada
    };



});

divTodoList.addEventListener('click', (event) => {
    //console.log('click');
    //console.log (event.target.localName) //Podemos ver a que parte del div estamos haciendo target y su name
    const nombreElemento = event.target.localName; //input, label, button
    const todoElemento = event.target.parentElement.parentElement; // dos hijos para llegar al elemento li
    const todoId = todoElemento.getAttribute('data-id'); //añade el atributo

    //console.log(todoId)
    if (nombreElemento.includes('input')) { //hizo click en el check
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');
    } else if (nombreElemento.includes('button')) { //si nombreElemento (input , label , button) incluye button

        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);
    }

    //console.log(todoList)
});

btnBorrar.addEventListener('click', () => {

    todoList.eliminarCompletados();

    for (let i = divTodoList.children.length - 1; i >= 0; i--) { //For de abajo arriba

        const elemento = divTodoList.children[i];

        if (elemento.classList.contains('completed')) {
            divTodoList.removeChild(elemento);
        }
    }
})

ulFiltros.addEventListener('click', (event => {

    console.log(event.target.text);
    const filtro = event.target.text;

    if (!filtro) { return; }

    anchorFiltros.forEach(elem => elem.classList.remove('selected') );
    event.target.classList.add( 'selected'); //target del anchortag que hemos hecho click


    for (const elemento of divTodoList.children) {

        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch (filtro) {
            case 'Pendientes':
                if (completado) {
                    elemento.classList.add('hidden');

                }
                break;
            case 'Completados':
                if (!completado) {
                    elemento.classList.add('hidden');

                }

            //Se muestran todos si no entra en ninguno de los dos casos anteriores
        }
    }
}))