// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IClsToken {
    function mint(address to,uint256 amount,uint8 multiple) external;
}
interface IFreezeNFT {
    function mintCard(
        uint256 lockClaAmount,
        uint256 startTimestamp,
        uint128 lockPeriod, 
        uint256 endTimestamp,
        address account) external;
}

contract FreezeContract {
    IERC20 claContract = IERC20(0xCF87f94fD8F6B6f0b479771F10dF672f99eADa63);
    // address claContract = 0xCF87f94fD8F6B6f0b479771F10dF672f99eADa63;
    // IClsToken public clsToken;
    // address private TokenCLS = 0x5F5dEC0d6402408eE81f52ab985a9C665b6e6010;
    IClsToken clsToken = IClsToken(0x5F5dEC0d6402408eE81f52ab985a9C665b6e6010);
    IFreezeNFT freezeNFT= IFreezeNFT(0x65daABC0e3fcCC59D63a518CCc897f9f1aBe4c80);

    address private deployer;

    constructor () {
       deployer = msg.sender;
   }

    function freeze(uint256 amount, uint8 multiple, uint256 startTimestamp, uint256 endTimestamp) public payable {
        require(amount > 0, 'amount can not be zero');
        //1. transferFrom CLA
        claContract.transferFrom(msg.sender, address(this), amount);
        //2. freezeNFT함수
        freezeNFT.mintCard(amount, startTimestamp, multiple, endTimestamp, msg.sender);
        //clsToken.mint함수를 보면, cla.safeTransferFrom를 처음 부르는데 
        //이거는 approve가 된상태에 실행이 되는것이기에 approve함수가 없다면 2번 코드를 진행할떄 거절당한다.
        //그러므로 아래의 코드가 반드시 필요함
        claContract.approve(address(clsToken), amount);
        //3. freeze함수 불러(mint함수)
        clsToken.mint(deployer, amount, multiple);
    }

}