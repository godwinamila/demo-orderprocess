public type OrderRequest record {|
    string userId;
    string[] items;
    decimal totalAmount;
    string? status = "CREATED";
|};

public type Order record {|
    int id;
    string userId;
    string[] items;
    decimal totalAmount;
    string status;
|};

public type ErrorResponse record {|
    string message;
|};

