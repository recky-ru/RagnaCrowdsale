pragma solidity ^0.4.13;

import '../node_modules/zeppelin-solidity/contracts/token/MintableToken.sol';

contract RagnaCoin is MintableToken {
  string public name = "Ragna Coin";
  string public symbol = "RAC";
  uint256 public decimals = 8;
}
