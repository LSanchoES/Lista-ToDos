import { Todo } from "./todo.class";


export class TodoList {

    constructor(){
        //this.todos = [];   Si no existe se inicializa en cargarLocalStorage()
        this.cargarLocalStorage();
    }

    nuevoTodo( todo ){

        this.todos.push ( todo )
        this.guardarLocalStorage();
    }

    eliminarTodo( id ){

        this.todos = this.todos.filter ( todo => todo.id != id); //Lo añade al [] del constructor
        this.guardarLocalStorage();

    }

    marcarCompletado( id ){

        for ( const todo of this.todos ){

            if (todo.id == id){

                todo.completado = !todo.completado; //si es true cambia a false y vicebersa
                this.guardarLocalStorage();
                break;
            }
        }

    }


    eliminarCompletados(){

        this.todos = this.todos.filter ( todo => !todo.completado ); //Pido todos los que NO estan completados 
        this.guardarLocalStorage();
    }

    guardarLocalStorage(){

        localStorage.setItem('todo' , JSON.stringify( this.todos) );

    }

    cargarLocalStorage(){
/*         if (localStorage.getItem ('todo') ){
            //this.todos = localStorage.getItem ('todo'); //todos se está convirtiendo en string!! cuidado !
            this.todos = JSON.parse( localStorage.getItem('todo') ); //todos se está convirtiendo en string!! cuidado !
        }else{
            this.todos = [];
        }    SE PUEDE RESUMIR CON UN TERNARIO(ABAJO)*/
        this.todos = (localStorage.getItem ('todo') )
            ?  this.todos = JSON.parse( localStorage.getItem('todo') ) 
            : this.todos = [];


        //Esta parrada convierte el JSON de objeto a clase para 
        //poder usar los metodos de cada clase de nuevo :O
        this.todos = this.todos.map( Todo.formJson );
    }

}