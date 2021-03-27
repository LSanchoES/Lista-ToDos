import './styles.css';

import { Todo, TodoList } from './classes';   //Busca index.js por defecto
import { crearTodoHtml } from './js/components';


export const todoList = new TodoList();

// todoList.todos.forEach( todo => crearTodoHtml ( todo ) ) ;

// -- Si el argumento  a enviar
//es igual al argumento de la función se pueden quitar de ambos lados (ABAJO)
//Funciona cuando solo hay un elemento
todoList.todos.forEach( crearTodoHtml ) 



//console.log(todoList.todos)

//const tarea = new Todo( ' Aprender JavaScript!!!');
//todoList.nuevoTodo( tarea );
//
//
//console.log(todoList);

//crearTodoHtml( tarea );


//Sesion storage es solo para la sesion / Localstorage almacena todo el tiempo

//localStorage.setItem('mi-key' , 'ABC123');
//sesionStorage.setItem('mi-key' , 'ABC123');
//
//setTimeout( ()=> {
//
//    localStorage.removeItem('mi-key')
//}, 1500);
