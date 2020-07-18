pragma solidity >= 0.4.24;

contract StarNotary {
    string public starName;
    address public starOwner;

    event StarClaimed(address owner);

    constructor() public {
        starName = "Yangari's Fall";
    }

    function changeName(string memory _newName) public {
        starName = _newName;
    }

    function claimStar() public {
        starOwner = msg.sender;
        emit StarClaimed(msg.sender);
    }
}