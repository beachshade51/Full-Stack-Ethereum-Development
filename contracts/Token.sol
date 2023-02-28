import "hardhat/console.sol";

contract Token {
    string public name = "sid's test token";
    string public symbol = "STT";
    uint256 public totalSupply = 1000000;
    mapping(address => uint256) balances;

    constructor() {
        balances[msg.sender] = totalSupply;
    }

    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    function transfer(address to, uint256 amount) external {
        require(balances[msg.sender] >= amount, "not enough token");
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }

    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }
}
