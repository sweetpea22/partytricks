
pragma solidity ^0.8.0;

contract EscrowContract {
    address public owner;          // The creator of the contract
    address public winner;         // The address of the winner
    uint256 public escrowAmount;   // The amount held in escrow

    bool public winnerSelected;    // Flag indicating if the winner has been selected

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can call this function");
        _;
    }

    modifier onlyWinner() {
        require(msg.sender == winner, "Only the winner can call this function");
        _;
    }

    function deposit() external payable {
        require(!winnerSelected, "Winner has already been selected");
        escrowAmount += msg.value;
    }

    function selectWinner(address _winner) external onlyOwner {
        require(!winnerSelected, "Winner has already been selected");
        winner = _winner;
        winnerSelected = true;
    }

    function releaseToWinner() external onlyWinner {
        require(winnerSelected, "Winner has not been selected yet");
        uint256 amountToSend = escrowAmount;
        escrowAmount = 0;  // Reset the escrow amount before sending to prevent reentry attacks
        payable(winner).transfer(amountToSend);
    }

    function cancel() external onlyOwner {
        require(!winnerSelected, "Winner has already been selected");
        payable(owner).transfer(escrowAmount);
        escrowAmount = 0;
    }
}
