import * as types from './types'

export const reorderOrdersList = (key, startIndex, endIndex) => ({
	type: types.REORDER_ORDERS_LIST,
	key,
	startIndex,
	endIndex,
})

export const moveOrdersList = (srcKey, destKey, srcIndex, destIndex) => ({
	type: types.MOVE_ORDER_LIST,
	srcKey,
	destKey,
	srcIndex,
	destIndex,
})