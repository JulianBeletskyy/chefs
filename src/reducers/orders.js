import * as types from '../actions/types'

const getItems = (count, offset = 0, key) => {
    return [...new Array(count)].map((item, i) => ({
        orderId: `${key}-${i + offset}`,
        content: `${key} ${i + offset}`
    }))
}

const initialState = {
    lists: {
        pending: getItems(10, 0, 'pending'),
        accepted: getItems(5, 10, 'accepted'),
        preparing: getItems(1, 15, 'preparing'),
        delivered: []
    },
}

const orders = (orders = initialState, action = {}) => {
    switch (action.type) {
        case types.REORDER_ORDERS_LIST:
            const { key, startIndex, endIndex } = action
            const list = Array.from(orders.lists[key])
            const [removedReorder] = list.splice(startIndex, 1)
            list.splice(endIndex, 0, removedReorder)
            return Object.assign({}, orders, {
                lists: {
                    ...orders.lists,
                    [key]: list,
                },
            })
        case types.MOVE_ORDER_LIST:
            const {srcKey, destKey, srcIndex, destIndex} = action
            const srcList = Array.from(orders.lists[srcKey])
            const destList = Array.from(orders.lists[destKey])
            const [removedMove] = srcList.splice(srcIndex, 1)
            destList.splice(destIndex, 0, removedMove)
            return Object.assign({}, orders, {
                lists: {
                    ...orders.lists,
                    [srcKey]: srcList,
                    [destKey]: destList,
                }
            })
        case types.CLEAR_STATE:
            return initialState
        default:
            return orders
    }
}

export default orders
