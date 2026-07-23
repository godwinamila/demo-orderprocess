import ballerina/http;

service / on new http:Listener(8080) {
    resource function post orders(@http:Payload OrderRequest request) returns http:Created|http:BadRequest {
        if request.userId.trim() == "" || request.items.length() == 0 {
            return <http:BadRequest>{
                body: {
                    message: "userId and items are required to create an order"
                }
            };
        }

        Order createdOrder = createOrder(request);
        orders[createdOrder.id.toString()] = createdOrder;

        return <http:Created>{
            body: createdOrder
        };
    }

    resource function get orders(string userId) returns Order[]|http:BadRequest {
        if userId.trim() == "" {
            return <http:BadRequest>{
                body: {
                    message: "userId query parameter is required"
                }
            };
        }

        return listOrdersForUser(userId);
    }

    resource function get orders/[int orderId]() returns Order|http:NotFound {
        Order? foundOrder = orders[orderId.toString()];
        if foundOrder is () {
            return <http:NotFound>{
                body: {
                    message: "Order not found"
                }
            };
        }

        return foundOrder;
    }
}

