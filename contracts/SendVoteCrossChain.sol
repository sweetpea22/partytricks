pragma solidity ^0.8.9;

import { AxelarExecutable} from  './axelar/AxelarExecutable.sol';
import { IAxelarGateway } from  './axelar/interfaces/IAxelarGateway.sol';
import { IAxelarGasService } from  './axelar/interfaces/IAxelarGasService.sol';

contract SendVoteCrossChain is AxelarExecutable {

    IAxelarGasService public immutable gasService;
    string public message;

    constructor(address gateway_, address gasService_) AxelarExecutable(gateway_) {
        gasService = IAxelarGasService(gasService_);
    }

    function sendVote(
        string calldata destinationChain,
        string calldata destinationAddress,
        string calldata message_
    ) external payable {
        bytes memory payload = abi.encode(message_);
        gasService.payNativeGasForContractCall{value: msg.value} (
            address(this),
            destinationChain,
            destinationAddress,
            payload,
            msg.sender
        );
        gateway.callContract(destinationChain, destinationAddress, payload);
    }

    //receive
    function _execute(
        string calldata sourceChain,
        string calldata sourceAddress,
        bytes calldata payload_
    ) internal override {
        message = abi.decode(payload_, (string)); 

    }

}