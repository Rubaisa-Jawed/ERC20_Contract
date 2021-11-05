//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

contract TestToken is ERC20 {

    mapping(address => uint256) balances;
    mapping(address => mapping(address => uint256)) allowances;

    uint256 _totalSupply = 100000 * (10**18);

    constructor() ERC20("testToken", "TEST") {
    }

    function mint(address account, uint256 amount) public {
        require(account != address(0), "ERC20: mint to the zero address");
        _totalSupply += amount;
        balances[account] += amount;
        emit Transfer(address(0), account, amount);
        console.log(account);
        console.log(amount);
    }

    function totalSupply() public view virtual override returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address tokenOwner) public view override returns(uint) {
        return balances[tokenOwner];
    }

    function transfer(address receiver, uint numTokens) public override returns (bool) {
        require(numTokens <= balances[msg.sender]);
        balances[msg.sender] = balances[msg.sender] - numTokens;
        balances[receiver] = balances[receiver] + numTokens;
        emit Transfer(msg.sender, receiver, numTokens);
        return true;
    }

    function approve(address delegate, uint numTokens) public override returns (bool) {
        allowances[msg.sender][delegate] = numTokens;
        emit Approval(msg.sender, delegate, numTokens);
        return true;
    }

    function allowance(address owner, address delegate) public view override returns (uint) {
        return allowances[owner][delegate];
    }

    function transferFrom(address owner, address buyer, uint numTokens) public override returns (bool) { //spender, receiver
        require(numTokens <= balances[owner],"Number of tokens surpass the tokens in the account");
        if(owner!=msg.sender){
        require(numTokens <= allowances[owner][msg.sender],"Number of tokens exceed the number allowed");
        allowances[owner][msg.sender] = allowances[owner][msg.sender] - numTokens;
        }
        balances[owner] = balances[owner] - numTokens;
        balances[buyer] = balances[buyer] + numTokens;
        emit Transfer(owner, buyer, numTokens);
        return true;
    }
 
}