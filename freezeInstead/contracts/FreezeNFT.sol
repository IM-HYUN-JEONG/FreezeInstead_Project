//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/interfaces/IERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract FreezeNFT is ERC721, Ownable, ERC721Enumerable{

    struct Card  {
        uint256 id;
        uint256 lockClaAmount; 
        uint256 startTimeStemp;
        uint128 lockPeriod;
        uint256 endTimestamp;
        address owner; 
    }
    Card[] public cards; // 첫 아이템의 인덱스는 0입니다

    constructor () ERC721("FreezeNFT", "FNFT") {}

    function mintCard(
        uint256 lockClaAmount,
        uint256 startTimestamp,
        uint128 lockPeriod, 
        uint256 endTimestamp,
        address account) public  
        {
        uint256 cardId = cards.length;
        cards.push(Card(cardId,lockClaAmount, startTimestamp, lockPeriod, endTimestamp, account));
        _mint(account, cardId); 
        }

    function getCardsLength() public view returns (uint) {
    return cards.length;
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }
    
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }


    //card 데이터 불러오는 함수
    function getLockClaAmount(uint256 _cardId) public view returns (uint256){
        return cards[_cardId].lockClaAmount;
    }
    function getEndTimestamp(uint256 _cardId) public view returns (uint256){
        return cards[_cardId].endTimestamp;
    }
    function getStartTimestamp(uint256 _cardId) public view returns (uint256){
        return cards[_cardId].startTimeStemp;
    }
    function getLockPeriod(uint256 _cardId) public view returns (uint128){
        return cards[_cardId].lockPeriod;
    }
}