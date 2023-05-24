// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Tracking {

    enum ShipmentStatus {PENDING, IN_TRANSITE, DELIVERED}

    struct Shipment{
        address sender ;       // آدرس ارسال کننده ولت 
        address receiver;      // آدرس گیرنده ولت
        uint256 pickupTime;    // زمان سوار کردن
        uint256 deliveryTime;  // زمان تحویل 
        uint256 dictance;      // فاصله 
        uint256 price;         // قیمت حمل و نقل 
        ShipmentStatus status; // وضعیت حمل و نقل که سه حالت قبل بارگیری و در حال حمل و تحویل داده شده است
        bool isPaid;           // تایید تراکنش 
    }
    
    mapping(address => Shipment[]) public shipments;  // درست مثل دیکشنری در پایتون مجموعه آرایه ای از اطالاعات را به آدرسی نسبت می دهد
    uint256 public shipmentCount;

    struct TypeShipment {
        address sender;
        address receiver;
        uint256 pickupTime;
        uint256 deliveryTime;
        uint256 distance;
        uint256 price;
        ShipmentStatus status;
        bool isPaid;
    }

    TypeShipment[] public typeShipments;

    event ShipmentCreated(address indexed sender, 
                          address indexed receiver, 
                          uint256 pickupTime , 
                          uint256 distance, 
                          uint256 price
                         );

    event ShipmentInTransit(address indexed sender,
                            address indexed receiver, 
                            uint256 pickupTime
                           );                     

    event ShipmentDelivered(address indexed sender,
                            address indexed receiver,
                            uint256 deliveryTime
                           );

    event ShipmentPaid     (address indexed sender,
                            address indexed receiver,
                            uint256 amount
                           );

    constructor () {
        shipmentCount = 0;
    }

    function createShipment(address _receiver, uint256 _pickupTime, uint256 _distance 
    ,uint256 _price) public  payable {
        require(msg.value == _price , "Payment Amount Most Match the Price.");
        
        Shipment memory shipment = Shipment(msg.sender ,_receiver ,_pickupTime, 0, _distance, _price, ShipmentStatus.PENDING, false );
        // shipment در اصل یک آرایه است که ریخته می شود درون دیکشنری به نام 
        // به نام shipments منظور از دیکشنری همان mapping است 
        shipments[msg.sender].push(shipment);

        shipmentCount++;

        typeShipments.push(
            TypeShipment(
                msg.sender,
                _receiver,
                _pickupTime,
                0,
                _distance,
                _price,
                ShipmentStatus.PENDING,
                false
            )

        );

        emit ShipmentCreated(msg.sender, 
                          _receiver, 
                          _pickupTime , 
                          _distance, 
                          _price
                         );
    }

    function startShipment (address _sender, address _receiver , uint256 _index) public {
        
        Shipment     storage shipment     = shipments [_sender][_index];
        TypeShipment storage typeShipment = typeShipments [_index];

        require(shipment.receiver == _receiver , "Invalid receiver.");
        require(shipment.status   == ShipmentStatus.PENDING , "Shipment already to transit.");

        shipment.status     = ShipmentStatus.IN_TRANSITE;
        typeShipment.status = ShipmentStatus.IN_TRANSITE;

        emit ShipmentInTransit(_sender, _receiver, shipment.pickupTime);
    }

    function compeleteShipmnet(address _sender , address _receiver, uint256 _index) public payable {
        
        Shipment     storage shipment     = shipments[_sender][_index];
        TypeShipment storage typeShipment = typeShipments [_index];

        require(shipment.receiver == _receiver , "Invalid receiver.");
        require(shipment.status   == ShipmentStatus.IN_TRANSITE , "Shipment Not in transit.");
        require(!shipment.isPaid , "Shipment Already to Paid");

        shipment.status     =  ShipmentStatus.DELIVERED;
        typeShipment.status =  ShipmentStatus.DELIVERED;

        typeShipment.deliveryTime = block.timestamp;
        shipment.deliveryTime     = block.timestamp;

        uint256 amount = shipment.price;
        payable(shipment.sender).transfer(amount);

        shipment.isPaid     = true;
        typeShipment.isPaid = true;

        emit ShipmentDelivered(_sender, _receiver, shipment.deliveryTime);
        emit ShipmentPaid(_sender, _receiver, amount);

    }

    function getShipment(address _sender , uint256 _index) public view returns(
        address, address, uint256, uint256 , uint256 , uint256, ShipmentStatus , bool
    ) {

        Shipment memory shipment = shipments[_sender][_index];
        return(shipment.sender , shipment.receiver, shipment.pickupTime, 
                shipment.deliveryTime, shipment.distance, shipment.price, shipment.status, shipment.isPaid);


    }

}