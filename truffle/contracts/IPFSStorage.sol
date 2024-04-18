// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract IPFSStorage {
    string[] ipfsHashes;

    function addHash(string memory _ipfsHash) public {
        ipfsHashes.push(_ipfsHash);
    }

    function getHashes() public view returns (string[] memory) {
        return ipfsHashes;
    }
}