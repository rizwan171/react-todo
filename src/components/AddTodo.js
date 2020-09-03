import React, { Component } from 'react';
import './AddTodo.css';
import { uuid } from 'uuidv4';

export default class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: uuid(),
      title: '',
      completed: false
    };

    this.handleAddEvent = this.handleAddEvent.bind(this);
    this.handleChangeEvent = this.handleChangeEvent.bind(this);
  };

  render() {
    return (
      <div className="add-todo-bar">
         <input 
          type="text" 
          placeholder="What needs to be done?" 
          className="add-bar" 
          name="title"
          onChange={this.handleChangeEvent}
          onKeyUp={this.handleAddEvent}/>
      </div>
    );
  };

  handleChangeEvent(event) {
    const title = event.target.value;
    
    let state = JSON.parse(JSON.stringify(this.state));
    state.title = title;

    this.setState(state);
  };

  handleAddEvent(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.props.addTodo(this.state);

      event.target.value = '';

      this.setState({
        id: uuid(),
        title: '',
        completed: false
      });
    }
  };
};
