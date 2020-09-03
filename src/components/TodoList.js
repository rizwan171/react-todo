import React, { Component } from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';

export default class TodoList extends Component {
  
  render() {
    const todos = this.props.todos;

    let todoItems = [];

    todos.forEach(todo => {
      todoItems.push(<TodoItem key={todo.id} todoItem={todo} markComplete={this.props.markComplete} removeTodo={this.props.removeTodo}/>);
    });

    return (
      <div className="todo-list">
        {todoItems}
      </div>
    );
  };
};
