import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import Title from './Title';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import FooterControls from './FooterControls';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };

    this.addTodo = this.addTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.filterTodos = this.filterTodos.bind(this);
    this.markComplete = this.markComplete.bind(this);
  };

  componentDidMount() {
    this.initialiseTodos();
  };

  async initialiseTodos() {
    const request = fetch('https://jsonplaceholder.typicode.com/todos');
    const response = await request;
    const todosData = await response.json();

    let todos = [];

    for (let i = 0; i < 5; i++) {
      todos.push(this.unwrapTodoObject(todosData[i]));
    }

    this.setState({
      todos: todos,
      todosBackup: todos
    });
  };

  unwrapTodoObject({id, title, completed}) {
    return {id, title, completed};
  };

  addTodo(todo) {
    const updatedTodos = [...this.state.todos, todo];
    this.setState({
      todos: updatedTodos,
      todosBackup: updatedTodos
    });
  };

  removeTodo(todoId) {
    const updatedTodos = [...this.state.todos.filter((todo) => todo.id !== todoId)];
    this.setState({
      todos: updatedTodos,
      todosBackup: updatedTodos
    });
  };

  markComplete(todoId) {
    let updatedTodos = [...this.state.todos];
    updatedTodos.forEach(todo => {
      if (todo.id === todoId) {
        todo.completed = true;
      }
    });

    this.setState({
      todos: updatedTodos,
      todosBackup: updatedTodos
    });
  };

  filterTodos(option) {
    if (option === 'all') {
      const todosToShow = [...this.state.todosBackup];
      this.setState({
        todos: todosToShow,
        todosBackup: todosToShow
      });
    } else if (option === 'complete') {
      const backupOfTodos = [...this.state.todosBackup];
      const todosToShow = backupOfTodos.filter(todo => todo.completed);

      this.setState({
        todos: todosToShow,
        todosBackup: backupOfTodos
      });
    } else if (option === 'incomplete') {
      const backupOfTodos = [...this.state.todosBackup];
      const todosToShow = backupOfTodos.filter(todo => !todo.completed);

      this.setState({
        todos: todosToShow,
        todosBackup: backupOfTodos
      });
    }
  };
  
  render() {
    return (
      <div className="app-container">
        <Title />
        <div className="todos-container">
          <AddTodo addTodo={this.addTodo}/>
          <TodoList todos={this.state.todos} markComplete={this.markComplete} removeTodo={this.removeTodo}/>
          <FooterControls todoCount={this.state.todos.length} filterTodos={this.filterTodos}/>
        </div>
      </div>
    );
  };
};
