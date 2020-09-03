import React, { Component } from 'react';
import './TodoItem.css';
import { ImBin } from 'react-icons/im'

export default class TodoItem extends Component {
  render() {
    const todoItem = this.props.todoItem;
    let itemClasses = 'todo-item';
    if (todoItem.completed) {
      itemClasses += ' completed';
    } 

    return (
      <div className={itemClasses} onClick={() => this.props.markComplete(todoItem.id)}>
        <p>{todoItem.title}</p>
        <ImBin className="delete-icon" onClick={() => this.props.removeTodo(todoItem.id)}/>
      </div>
    );
  };
}
