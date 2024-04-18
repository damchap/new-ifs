// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "../contracts/IPFSStorage.sol";
import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";

contract TestIPFSStorage {
    IPFSStorage ipfsStorage = IPFSStorage(DeployedAddresses.IPFSStorage());

    // Testing the setHash() function
    function testUserCanSetHash() public {
        ipfsStorage.setHash("QmPChd2hVbrJ6bfo3WBcTW4iZnpHm8TEzWkLHmLpXhF68A");
        string memory storedHash = ipfsStorage.getHash();
        Assert.equal(storedHash, "QmPChd2hVbrJ6bfo3WBcTW4iZnpHm8TEzWkLHmLpXhF68A", "The hash was not stored correctly.");
    }
}