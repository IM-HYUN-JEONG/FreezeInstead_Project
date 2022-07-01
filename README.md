# [FreezeInstead_Project](https://freezeinstead.vercel.app/)
주소 : https://freezeinstead.vercel.app/

## FreezeInstead_Project를 만들게 된 계기
ClaimSwap을 사용하다가 CLA를 freeze를 하면 특정 기간동안 묶여있다는 점을<br />
NFT의 특성을 활용하여 freeze를 증명하는 하나의 증표로 사용하여 자산을 유동화하고자 프로젝트를 만들었습니다.
<hr />

## 작동 과정

![image](https://user-images.githubusercontent.com/95120267/176818050-026e1f62-df11-4576-a39a-eb39711937de.png)
전제 : CLA가 있는 ClaimSwap사용자
1) 사용자A가 Freeze메뉴에서 임의의 CLA와 특정기간을 선택한 후 Freeze 버튼을 누른다.
2) Freeze Conttract가 ClaimSwap쪽으로 대신 freeze를 한다.
3) Freeze Conttract가 FreezeNFT Conttract를 호출하여 임의의CLA와 특정기간동안 입금을 증명하는 NFT를 발행한다. (NFT List메뉴에서 확인가능하다.)
4) 사용자A는 NFT List에서 Sales Approval Status가 Available일 경우에만 Sale을 등록하여 다른 사용자들과 NFT거래를 할 수 있다.

<hr />
<hr />

## 기술 스택,  선정 이유

### [Next.js](https://nextjs.org/)
Next.js는 서버사이드 렌더링을 ***쉽게 구현***하도록 도와주는 React의 프레임워크로써 CSR벙식으로 사용하면서 SPA의 장점이 있고, file을 기반으로 한 라우팅을 사용 할 수 있어서 선택하게 되었습니다.

### [Recoil](https://recoiljs.org/ko/)
중앙집중식인 Redux에 비해 단위별로 관리하는 Recoil이 이 프로젝트에 적합하다고 판단하여 <br />
상태관리를 위해 Recoil 기능 중 atom만을 사용해서 기능을 구현하였으며 이 프로젝트에서는 지갑타입, 연결주소, 로그인상태, Approve상태, 기간선택 등 을 위해 사용하였습니다.

### [Chakra-ui](https://chakra-ui.com/)
디자인시스템이 없기에 제작가능한 컴포넌트는 제외하고 Modal, Icon, Grid, Box등 필요한 컴포넌트에 디자인을 입혀 사용하였습니다.

### [bignumber.js](https://mikemcl.github.io/bignumber.js/)
bignumber는 임의 정밀도 산술을 위한 JavaScript 라이브러리이며 큰 값을 반환할때 지수표현을 방지하고자 사용하였습니다.
<hr />

## 폴더구조
```
📦src
 ┣ 📂ABI
 ┣ 📂components //➡️ pages에 들어가는 각 컴포넌트들
 ┃ ┣ 📜BuyNFT.js
 ┃ ┣ 📜BuyNFTCards.js
 ┃ ┣ 📜CardList.js
 ┃ ┣ 📜ConnectWallet.js
 ┃ ┣ 📜FreezeAmount.js
 ┃ ┣ 📜FreezeBtn.js
 ┃ ┣ 📜FreezingPeriod.js
 ┃ ┣ 📜Header.js
 ┃ ┗ 📜SaleModal.js
 ┣ 📂constants //➡️ 직접 변경해야하는 컴포넌트들 
 ┃ ┣ 📜Address.js
 ┃ ┣ 📜Introduction.js
 ┃ ┣ 📜Notlogin.js
 ┃ ┗ 📜navLinks.js
 ┣ 📂pages
 ┃ ┣ 📜_app.js //➞ Header.js
 ┃ ┣ 📜index.js //➞ Introduction.js 
 ┃ ┣ 📜freeze.js //➞ FreezeAmount.js, FreezingPeriod.js, FreezeBtn.js / Notlogin.js 
 ┃ ┣ 📜nftList.js //➞ CardList.js / Notlogin.js 
 ┃ ┗ 📜buyNft.js //➞ BuyNFT.js / Notlogin.js
 ┣ 📂styles
 ┗ 📜atoms.js  //➡️ 상태관리
```
<hr />

## 작동 화면
### 로그인 전 
<img width="965" alt="image" src="https://user-images.githubusercontent.com/95120267/176821171-a4fd6384-c731-49df-867f-6817dc346a8b.png">
<img width="909" alt="image" src="https://user-images.githubusercontent.com/95120267/176824023-dffb76c3-35d9-423a-bb33-47c715ece5d8.png">

### 로그인 전_지갑선택
<img width="964" alt="image" src="https://user-images.githubusercontent.com/95120267/176821214-4bcfd20f-8fe3-47b4-8a2c-f4a9b73428ea.png">

### 로그인 후(MetaMask, KAS)
<img width="965" alt="image" src="https://user-images.githubusercontent.com/95120267/176821273-70e4b817-e0de-4cf1-b034-16284dfac1e7.png">
<img width="992" alt="image" src="https://user-images.githubusercontent.com/95120267/176823711-a95fc263-46ee-44b5-9edb-3903866300dc.png">

### 로그인 후_Freeze
<img width="890" alt="image" src="https://user-images.githubusercontent.com/95120267/176821339-a3a50b1e-5bd9-426f-89d5-4cb820cd1c15.png">
<img width="951" alt="image" src="https://user-images.githubusercontent.com/95120267/176823510-0b45e849-23ca-4f0e-937d-f544a5d83725.png">
<img width="988" alt="image" src="https://user-images.githubusercontent.com/95120267/176823804-a58170f4-ea56-4181-8d86-3b4e267432cd.png">
<img width="1135" alt="image" src="https://user-images.githubusercontent.com/95120267/176823844-b8b85591-fb45-4dad-b078-8fd4c0cbbeda.png">

### 로그인 후_NFT List
<img width="909" alt="image" src="https://user-images.githubusercontent.com/95120267/176823888-f1ff8e62-3cbd-478c-bd1a-abe19447a057.png">
<img width="910" alt="image" src="https://user-images.githubusercontent.com/95120267/176823947-718eafba-13ac-4a29-b2ad-7fe3c3af8c95.png">
<img width="887" alt="image" src="https://user-images.githubusercontent.com/95120267/176824475-dab423f2-0bda-4d63-822d-f3e5fe56d27a.png">

### 로그인 후_BuyNFT
<img width="1143" alt="image" src="https://user-images.githubusercontent.com/95120267/176824138-98f8fece-146d-41d6-8946-6bf75f4747bb.png">
<img width="909" alt="image" src="https://user-images.githubusercontent.com/95120267/176824059-9d33c14d-c97f-4c1d-ab1b-1a6b168abd6e.png">
<img width="1135" alt="image" src="https://user-images.githubusercontent.com/95120267/176824088-bc275d86-f517-4af0-ab61-fc3d655ebb2a.png">

<br />
