import React from 'react';
import './index.css';
import Item from './Item';
import HTML5Backend from 'react-dnd-html5-backend'
import {DragDropContext} from 'react-dnd';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      items: [
        { id: 1, name: 'Item 1'},
        { id: 2, name: 'Item 2'},
        { id: 3, name: 'Item 3'},
        { id: 4, name: 'Item 4'},
      ],
    }
  }
  render(){
    return(
    <div className="item-container">
      {
        this.state.items.map((item, index) => (
          <Item key={item.id} item={item}/>
          ))
      }
    </div>
  )}
}

export default DragDropContext(HTML5Backend)(App)


