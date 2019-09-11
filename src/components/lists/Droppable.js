import React, { Fragment } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import OrderCard from '../cards/OrderCard'
import './lists.css'

const grid = 8;

const getListStyle = isDraggingOver => ({
    height: 'calc(100vh - 117px)',
    overflow: 'auto'
})

const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    borderRadius: 5,
    margin: `0 0 ${grid}px 0`,
    background: '#fff',
    boxShadow: isDragging ? '0px 0px 10px 1px rgba(0,0,0,0.1)' : 'none',
    cursor: 'pointer',
    ...draggableStyle
})

const DroppableList = ({provided, snapshot, list, title}) => {
  return (
    <div className="w-25">
      <div className="droppable-list-title text-center">{title}</div>
      <div
        ref={provided.innerRef}
        className="droppable-list"
        style={getListStyle(snapshot.isDraggingOver)}>
        {
          list.map((item, index) => (
            <Draggable
              key={item.orderId}
              draggableId={item.orderId}
              index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
                  <OrderCard order={item} />
                </div>
              )}
            </Draggable>
          ))
        }
        {provided.placeholder}
      </div>
    </div>
  )
}

export default DroppableList