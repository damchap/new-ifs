// migrations/2_deploy_contracts.js
var IPFSStorage = artifacts.require("./IPFSStorage.sol");

module.exports = function(deployer) {
  deployer.deploy(IPFSStorage);
};