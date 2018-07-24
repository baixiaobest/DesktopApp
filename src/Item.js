import React from 'react'
import ReactDOM from 'react-dom'
import {DragSource} from 'react-dnd'

const itemSource = {
    beginDrag(props){
        return props.item;
    },
    endDrag(props, monitor, component){
        return props.handleDrop(props.item.id);
    }
}

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging(),
    }
}

class Item extends React.Component {
    // const {connectDragSource, item} = this.props;
    render(){
        return this.props.connectDragSource(
                <div className="label label-default">
                    {this.props.item.name}
                </div>
            )
    }
}

export default DragSource('item', itemSource, collect)(Item);