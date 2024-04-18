const IPFSStorage = artifacts.require('../contracts/IPFSStorage.sol');

contract("IPFSStorage", accounts => {
  let ipfsStorageInstance;

  before(async () => {
    ipfsStorageInstance = await IPFSStorage.deployed();
  });

  it("stores an IPFS hash correctly", async () => {
    const ipfsHash = "QmPChd2hVbrJ6bfo3WBcTW4iZnpHm8TEzWkLHmLpXhF68A";
    await ipfsStorageInstance.setHash(ipfsHash, { from: accounts[0] });

    const storedHash = await ipfsStorageInstance.getHash();
    assert.equal(storedHash, ipfsHash, "The hash was not stored correctly.");
  });
});