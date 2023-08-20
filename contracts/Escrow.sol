// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";

contract FundHoldingContract is Ownable {
    address public winner; // The address of the winner
    bool public winnerSelected; // Flag to indicate if the winner is selected
    uint256 public escrowAmount; // Total funds collected
    
    constructor() {
        winnerSelected = false;
    }
    
    modifier onlyWinner() {
        require(msg.sender == winner, "Only the winner can call this function");
        _;
    }
    
    modifier notWinnerSelected() {
        require(!winnerSelected, "Winner has already been selected");
        _;
    }
    
    function deposit() external payable {
        require(!winnerSelected, "Winner has already been selected");
        escrowAmount += msg.value;
    }
    
    function selectWinner(address _winner) external onlyOwner notWinnerSelected {
        require(_winner != address(0), "Invalid winner address");
        winner = _winner;
        winnerSelected = true;
    }
    
    function releaseToWinner() external onlyWinner {
        require(winnerSelected, "Winner has not been selected yet");
        require(address(this).balance > 0, "No funds to withdraw");
        uint256 amountToSend = escrowAmount;
        escrowAmount = 0; // Reset total funds after sending to the winner
        payable(winner).transfer(amountToSend);

     }
}
