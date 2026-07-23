int orderSequence = 0;
map<Order> orders = {};

function createOrder(OrderRequest request) returns Order {
    orderSequence += 1;

    return {
        id: orderSequence,
        userId: request.userId,
        items: request.items,
        totalAmount: request.totalAmount,
        status: request.status ?: "CREATED"
    };
}

function listOrdersForUser(string userId) returns Order[] {
    Order[] userOrders = [];
    string[] keys = orders.keys();

    foreach string key in keys {
        Order currentOrder = orders.get(key);
        if currentOrder.userId == userId {
            userOrders.push(currentOrder);
        }
    }

    return userOrders;
}

