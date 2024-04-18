// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract IPFSStorage {
    string ipfsHash;

    function setHash(string memory _ipfsHash) public {
        ipfsHash = _ipfsHash;
    }

    function getHash() public view returns (string memory) {
        return ipfsHash;
    }
}