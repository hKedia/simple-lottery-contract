pragma solidity ^0.4.17;

contract Lottery {
    address public manager;
    address[] public players;
    
    function Lottery() public {
        manager = msg.sender; 
    }
    
    function enter() public payable {
        require(msg.value > 0.01 ether);
        
        players.push(msg.sender);
    }
    
    function pickWinner() public restricted{
        uint index = random() % players.length;
        players[index].transfer(this.balance);
        players = new address[](0); // dynamic array with zero length
    }
    
    function random() private view returns (uint) { // pseudo random function
        return uint(keccak256(block.difficulty, now, players));
    }
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    function getPlayers() public view returns(address[]) {
        return players;
    }
}