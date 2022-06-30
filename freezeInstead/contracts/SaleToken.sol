// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./FreezeNFT.sol";

contract SaleToken {
    FreezeNFT public freezeNftAddress;

    constructor(address _freezeNftAddress) {
        freezeNftAddress = FreezeNFT(_freezeNftAddress);
    }

    struct TradeData {
        uint tokenId;
        uint tokenPrice;
        uint lockClaAmount;
        uint startTimeStemp;
        uint lockPeriod;
        uint endTimestamp;
        address owner;
    }
    struct TokensData {
        uint tokenId;
        uint lockClaAmount;
        uint startTimeStemp;
        uint lockPeriod;
        uint endTimestamp;
        address owner;
    }

    // tokenId -> price가 나옴 
    mapping(uint => uint) public tokenPrices;
    //어떤것이 판매중인지 배열로 정리함 (push로 추가, pop으로 제거)
    TradeData[] public onSaleTokens;
    TokensData[] public tokenData;


    //판매등록하는 함수
    function setForSaleToken(uint _tokenId, uint _price) public {
        address tokenOwner = freezeNftAddress.ownerOf(_tokenId);
        uint lockClaAmount = freezeNftAddress.getLockClaAmount(_tokenId);
        uint startTimeStemp = freezeNftAddress.getStartTimestamp(_tokenId);
        uint lockPeriod = freezeNftAddress.getLockPeriod(_tokenId);
        uint endTimestamp = freezeNftAddress.getEndTimestamp(_tokenId);

        require(tokenOwner == msg.sender, "Caller is not token owner.");
        require(_price > 0, "Price is zero or lower.");
        require(tokenPrices[_tokenId] == 0, "This token is already on sale.");
        //이거 전에 freezeNftAddress에 approve를 해야 이 줄이 성공되고 다음으로 넘어감
        //isApprovedForAll => ⭐️setApproved를 실행되어야 이게 true로 나옴
        require(freezeNftAddress.isApprovedForAll(msg.sender, address(this)), "Token onwer did not approve token.");

        tokenPrices[_tokenId] = _price;
        onSaleTokens.push(TradeData(_tokenId,_price,lockClaAmount,startTimeStemp,lockPeriod,endTimestamp,msg.sender));
    }

    //구매함수, payable - klay가 거래될거기에 이게 필요함
    function purchaseToken(uint _tokenId) public payable {
        address tokenOwner = freezeNftAddress.ownerOf(_tokenId);

        require(tokenOwner != msg.sender, "Caller is token owner.");
        require(tokenPrices[_tokenId] > 0, "This token not sale.");
        require(tokenPrices[_tokenId] <= msg.value, "Caller sent lower than price.");

        payable(tokenOwner).transfer(msg.value); //돈 전송
        freezeNftAddress.safeTransferFrom(tokenOwner, msg.sender, _tokenId); //NFT전송
        tokenPrices[_tokenId] = 0; //판매중인 NFT가격 0으로 수정
        //popOnSaleToken(_tokenId); //가격이 0으로 된 NFT를 없앰
        for(uint i = 0; i < onSaleTokens.length; i++) {
            if(tokenPrices[onSaleTokens[i].tokenId] == 0) {
                onSaleTokens[i] = onSaleTokens[onSaleTokens.length - 1];
                onSaleTokens.pop();
            }
        }
    }

    function getTokenPrice(uint _tokenId) public view returns (uint) {
        return tokenPrices[_tokenId];
    }
    function getOnSaleTokensLength() public view returns (uint) {
    return onSaleTokens.length;
    }
    function getTokenInfo(uint _tokenId) public view returns(uint, uint, uint, uint, address) {
        uint lockClaAmount = freezeNftAddress.getLockClaAmount(_tokenId);
        uint startTimeStemp = freezeNftAddress.getStartTimestamp(_tokenId);
        uint lockPeriod = freezeNftAddress.getLockPeriod(_tokenId);
        uint endTimestamp = freezeNftAddress.getEndTimestamp(_tokenId);
        address tokenOwner = freezeNftAddress.ownerOf(_tokenId);
        return (lockClaAmount, startTimeStemp, lockPeriod, endTimestamp, tokenOwner);
    } 

    function getTokenData() public view returns(TokensData[] memory) {
        uint balanceLength = freezeNftAddress.balanceOf(msg.sender);
        require(balanceLength > 0, "You did not have token.");

        TokensData[] memory token = new TokensData[](balanceLength);

        uint totalTokensLength = freezeNftAddress.getCardsLength();
        for(uint i = 0; i < totalTokensLength; i++) {
            uint tokenId = freezeNftAddress.tokenOfOwnerByIndex(msg.sender, i);
            (uint lockClaAmount, uint startTimeStemp, uint lockPeriod, uint endTimestamp, address tokenOwner) = getTokenInfo(tokenId);
            token[i] = TokensData(tokenId, lockClaAmount, startTimeStemp, lockPeriod, endTimestamp, tokenOwner);
        }
        return token;
    }
}