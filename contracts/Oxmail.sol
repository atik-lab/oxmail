pragma solidity ^0.4.19;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';

/**
 * @title Oxmail
 * @dev Let users interact and send messages in the blockchain.
 */
contract Oxmail {
    mapping (uint => address) public zombieToOwner;

}
