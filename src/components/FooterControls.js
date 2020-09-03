import React, { Component } from 'react';
import './FooterControls.css';
import Button from 'react-bootstrap/Button';
import { ButtonGroup } from 'react-bootstrap';

export default class FooterControls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allActive: false,
      completeActive: false,
      incompleteActive: false
    };

    this.onBtnClick = this.onBtnClick.bind(this);
  };

  render() {
    return (
      <div className="footer-controls">
        <div className="counter">{this.props.todoCount} items</div>
        <ButtonGroup className="mid-controls">
          <Button name="all" active={this.state.allActive} className="filter-button" onClick={this.onBtnClick}>All</Button>
          <Button name="complete" active={this.state.completeActive} className="filter-button" onClick={this.onBtnClick}>Complete</Button>
          <Button name="incomplete" active={this.state.incompleteActive} className="filter-button" onClick={this.onBtnClick}>Incomplete</Button>
        </ButtonGroup>
      </div>
    );
  };

  onBtnClick(event) {
    const btnName = event.target.name;
    const activeAtr = btnName + 'Active';
    
    let updatedState = {
      allActive: false,
      completeActive: false,
      incompleteActive: false
    };
    updatedState[activeAtr] = true;

    this.setState(updatedState);

    this.props.filterTodos(btnName);
  };
};
