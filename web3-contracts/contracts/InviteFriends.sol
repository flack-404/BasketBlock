// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract InviteFriends {
    IERC20 public BasketBlockToken;
    mapping(address => bool) public invited;
    mapping(address => uint256) public tokens;

    event InvitationSent(address indexed inviter, address indexed invitee, uint256 amount);
    event InvitationAccepted(address indexed invitee, uint256 amount);

    constructor(address _BasketBlockToken) {
        BasketBlockToken = IERC20(_BasketBlockToken);
    }

    function invite(address invitee, uint256 amount) external {
        require(!invited[invitee], "Already invited");
        require(BasketBlockToken.balanceOf(msg.sender) >= amount, "Insufficient token balance");

        invited[invitee] = true;
        tokens[invitee] = amount;
        emit InvitationSent(msg.sender, invitee, amount);
    }

    function acceptInvitation() external {
        require(invited[msg.sender], "Not invited");
        uint256 amount = tokens[msg.sender];
        tokens[msg.sender] = 0;
        invited[msg.sender] = false;

        // Transfer tokens to the invitee
        BasketBlockToken.transfer(msg.sender, amount);
        emit InvitationAccepted(msg.sender, amount);
    }
}