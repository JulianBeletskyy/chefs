import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import DroppableList from '../../components/lists/Droppable'
import { reorderOrdersList, moveOrdersList, getOrders, changeOrderStatus } from '../../actions/orders'
import './orders.css'

const Orders = ({dispatch, orders}) => {
	useEffect(() => {
		dispatch(getOrders())
	}, [])
	const onDragEnd = ({source, destination}) => {
		if (!destination) {
			return
		}

		if (source.droppableId === destination.droppableId) {
			dispatch(reorderOrdersList(source.droppableId, source.index, destination.index))
		} else {
			const newStatus = destination.droppableId
			const order = orders.lists[source.droppableId][source.index]

			dispatch(changeOrderStatus(order.orderId, newStatus)).then(success => {
				if (!success) {
					dispatch(moveOrdersList(destination.droppableId, source.droppableId, destination.index, source.index))
				}
			})
			dispatch(moveOrdersList(source.droppableId, destination.droppableId, source.index, destination.index))
		}
	}
	return (
		<div className="orders h-100">
			<div className="d-flex overflow-auto">
				<DragDropContext onDragEnd={onDragEnd}>
					<Droppable
						droppableId="pending"
						children={(provided, snapshot) => 
							<DroppableList
								provided={provided}
								snapshot={snapshot}
								title="Pending"
								list={orders.lists.pending} />} />
					<Droppable
						droppableId="accepted"
						children={(provided, snapshot) =>
							<DroppableList
								provided={provided}
								snapshot={snapshot}
								title="Accepted"
								list={orders.lists.accepted} />} />
					<Droppable
						droppableId="preparing"
						children={(provided, snapshot) =>
							<DroppableList
								provided={provided}
								snapshot={snapshot}
								title="Preparing"
								list={orders.lists.preparing} />} />
					<Droppable
						droppableId="delivered"
						children={(provided, snapshot) =>
							<DroppableList
								provided={provided}
								snapshot={snapshot}
								title="Delivered"
								list={orders.lists.delivered} />} />
				</DragDropContext>
			</div>
		</div>
	)
}

const mapStateToProps = ({orders}) => {
	return {
		orders: orders
	}
}

export default connect(mapStateToProps)(Orders)
