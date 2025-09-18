// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/// @title Simple Supply Chain for demo (create / transfer / history)
contract SupplyChain {
    struct Batch {
        string produceName;
        string origin;
        address currentOwner;
        address[] previousOwners;
        uint256[] timestamps; // block timestamps of create + transfers
        bool exists;
    }

    mapping(string => Batch) private batches;

    event BatchCreated(string indexed batchID, string produceName, string origin, address indexed owner, uint256 timestamp);
    event BatchTransferred(string indexed batchID, address indexed from, address indexed to, uint256 timestamp);

    function createBatch(string memory batchID, string memory produceName, string memory origin) public {
        require(!batches[batchID].exists, "Batch already exists");
        address[] memory prev;
        uint256[] memory times;
        batches[batchID].produceName = produceName;
        batches[batchID].origin = origin;
        batches[batchID].currentOwner = msg.sender;
        batches[batchID].previousOwners = prev;
        batches[batchID].timestamps = times;
        batches[batchID].timestamps.push(block.timestamp); // record creation time
        batches[batchID].exists = true;

        emit BatchCreated(batchID, produceName, origin, msg.sender, block.timestamp);
    }

    function transferBatch(string memory batchID, address newOwner) public {
        require(batches[batchID].exists, "Batch not found");
        require(batches[batchID].currentOwner == msg.sender, "Only current owner can transfer");

        batches[batchID].previousOwners.push(msg.sender);
        batches[batchID].currentOwner = newOwner;
        batches[batchID].timestamps.push(block.timestamp);

        emit BatchTransferred(batchID, msg.sender, newOwner, block.timestamp);
    }

    /// @return produceName, origin, currentOwner, previousOwners[], timestamps[]
    function getHistory(string memory batchID)
        public
        view
        returns (
            string memory,
            string memory,
            address,
            address[] memory,
            uint256[] memory
        )
    {
        require(batches[batchID].exists, "Batch not found");
        Batch storage b = batches[batchID];
        return (b.produceName, b.origin, b.currentOwner, b.previousOwners, b.timestamps);
    }
}
