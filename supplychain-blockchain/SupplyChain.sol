// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SupplyChain {
    enum Role { None, Farmer, Agent }

    struct Participant {
        string name;
        string location;
        Role role;
        bool isRegistered;
    }

    struct Produce {
        uint256 produceId;
        string crop;
        string harvestDate;
        uint256 quantity;
        string quality;
        address currentOwner;
        uint256 boughtPrice;
        string farmerName;
        string farmLocation;
        string harvestDateOrigin;
    }

    struct Transaction {
        Role role;
        string name;
        string location;
        uint256 boughtPrice;
        uint256 soldPrice;
        string date;
    }

    mapping(address => Participant) public participants;
    mapping(uint256 => Produce) public produces;
    mapping(uint256 => Transaction[]) private history;

    event ParticipantRegistered(address indexed participant, Role role, string name, string location);
    event ProduceAdded(uint256 indexed produceId, string crop, uint256 quantity, string quality, address farmer);
    event ProduceTransferred(uint256 indexed produceId, address from, address to, uint256 price, string date);

    modifier onlyRegistered() {
        require(participants[msg.sender].isRegistered, "Not registered");
        _;
    }

    // ---- Registration ----
    function registerFarmer(string calldata name, string calldata location) external {
        require(!participants[msg.sender].isRegistered, "Already registered");
        participants[msg.sender] = Participant(name, location, Role.Farmer, true);
        emit ParticipantRegistered(msg.sender, Role.Farmer, name, location);
    }

    function registerParticipant(string calldata name, string calldata location, uint256 role) external {
        require(!participants[msg.sender].isRegistered, "Already registered");
        require(role == uint256(Role.Agent), "Invalid role"); // only Agent allowed here
        participants[msg.sender] = Participant(name, location, Role(role), true);
        emit ParticipantRegistered(msg.sender, Role(role), name, location);
    }

    // ---- Farmer action ----
    function addProduce(
        uint256 produceId,
        string calldata crop,
        string calldata harvestDate,
        uint256 quantity,
        string calldata quality
    ) external onlyRegistered {
        require(participants[msg.sender].role == Role.Farmer, "Only farmers");
        require(produces[produceId].produceId == 0, "Produce already exists");

        Produce memory p = Produce({
            produceId: produceId,
            crop: crop,
            harvestDate: harvestDate,
            quantity: quantity,
            quality: quality,
            currentOwner: msg.sender,
            boughtPrice: 0,
            farmerName: participants[msg.sender].name,
            farmLocation: participants[msg.sender].location,
            harvestDateOrigin: harvestDate
        });

        produces[produceId] = p;

        emit ProduceAdded(produceId, crop, quantity, quality, msg.sender);
    }

    // ---- Transfer ----
    function transferProduce(
        uint256 produceId,
        address newOwner,
        uint256 soldPrice,
        string calldata date
    ) external onlyRegistered {
        Produce storage prod = produces[produceId];
        require(prod.produceId != 0, "Produce does not exist");
        require(prod.currentOwner == msg.sender, "Not the owner");

        // Record transaction
        history[produceId].push(
            Transaction({
                role: participants[msg.sender].role,
                name: participants[msg.sender].name,
                location: participants[msg.sender].location,
                boughtPrice: prod.boughtPrice,
                soldPrice: soldPrice,
                date: date
            })
        );

        // Update produce
        prod.currentOwner = newOwner;
        prod.boughtPrice = soldPrice;

        emit ProduceTransferred(produceId, msg.sender, newOwner, soldPrice, date);
    }

    // ---- View functions ----
    function getProduce(uint256 produceId) external view returns (Produce memory) {
        require(produces[produceId].produceId != 0, "Not found");
        return produces[produceId];
    }

    function getProduceHistory(uint256 produceId) external view returns (Transaction[] memory) {
        return history[produceId];
    }
}
