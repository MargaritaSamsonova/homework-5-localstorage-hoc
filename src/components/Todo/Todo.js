import React, { PureComponent } from 'react';
import Card from '../Card';
import './Todo.css';
import withLocalstorage from '../../HOCs/withLocalstorage';

class Todo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.createNewRecordByEnter = this.createNewRecordByEnter.bind(this);
    this.toggleRecordComplete = this.toggleRecordComplete.bind(this);
    this.createNewRecord = this.createNewRecord.bind(this);
  }

  getId() {
    let { savedData } = this.props;
    savedData = savedData();
    const biggest = savedData.length ? savedData.reduce((acc, el) => Math.max(acc, el.id), 0) : 0;
    return biggest + 1;
  }

  handleChange = event => {
    this.setState({inputValue: event.target.value});
  };

  createNewRecordByEnter = event => {
    if(event.key === 'Enter') {
      this.createNewRecord(event);
    }
  };

  toggleRecordComplete = event => {
    let { savedData, saveData } = this.props;
    const id = +event.target.dataset.todoId;

    savedData = savedData();

    const newSavedData = savedData.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isComplete: !todo.isComplete
        }
      }

      return todo;
    });

    saveData(newSavedData);
  };

  createNewRecord = (event) => {
    const { savedData, saveData } = this.props;
    const todos = savedData();
    const id = this.getId();

    saveData([ {
      text: this.state.inputValue,
      id: id,
      isComplete: false
    }, ...todos ]);

    this.setState({inputValue: ''})
    event.target.value = '';
  };

  render() {
    let { savedData } = this.props;
    savedData = savedData();

    return (
        <Card title='Список дел'>
          <div className="todo t-todo-list">
            <div className="todo-item todo-item-new">
              <input type="text" className="todo-input t-input" onChange={this.handleChange} onKeyDown={this.createNewRecordByEnter} value={this.state.inputValue}/>
              <span className="plus t-plus" onClick={this.createNewRecord}>+</span>
            </div>
            {savedData.map((todo) => {
              return (
                  <div key={todo.id} className="todo-item t-todo">
                    <p className="todo-item__text">{ todo.text }</p>
                    <span className="todo-item__flag t-todo-complete-flag"
                          data-todo-id={todo.id}
                          onClick={this.toggleRecordComplete}>
                      { todo.isComplete ? '[x]' : '[ ]'}
                    </span>
                  </div>
              )
            })}
          </div>
        </Card>
    );
  }

  renderEmptyRecord() {
    return;
  }

  renderRecord = record => {
    return;
  };
}

export default withLocalstorage('todo-app', [])(Todo);
