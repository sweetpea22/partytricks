// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";

contract Escrow is Ownable {
    address[] public winners;    // Array of winners
    bool public winnerSelected; // Flag to indicate if the winner is selected
    bool public isSplit; // Flag to indicate if the winner is selected
    uint256 public escrowAmount; // Total funds collected
    
    constructor() {
        winners = _winners;
        winnerSelected = false;
        isSplit = false;
    }
    
    modifier notWinnerSelected() {
        require(!winnerSelected, "Winner has already been selected");
        _;
    }
    
    function deposit() external payable {
        require(!winnerSelected, "Winner has already been selected");
        escrowAmount += msg.value;
    }

    function addWinner(address _newWinner) external onlyOwner {
        winners.push(_newWinner);
    }

    function releasePrize() external payable onlyOwner {
        require(msg.value > 0, "No funds sent with the transaction");
        require(winners.length > 0, "No winners specified");

        uint256 amountToSend = msg.value;
        if (winners.length == 2) {
            amountToSend /= 2;
        } 

        for (uint256 i = 0; i < winners.length; i++) {
            payable(winners[i]).transfer(amountToSend);
        }
    }

    function retrieve() public view returns (uint256) {
        return escrowAmount;
    }

}

