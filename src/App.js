import './App.css';
import { useState } from 'react';
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json'
import Token from './artifacts/contracts/Token.sol/Token.json'
const ethers = require("ethers")



const greeterAddress = "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853"
const tokenAddress = "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6"

function App() {
   const [greeting, setGreetingValue] = useState()
   const [userAccount, setUserAccount] = useState()
   const [amount, setAmount] = useState(0)


  async function getBalance() {
   if (typeof window.ethereum !== 'undefined') {
     const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
     const provider = new ethers.providers.Web3Provider(window.ethereum);
     const contract = new ethers.Contract(tokenAddress, Token.abi, provider)
     const balance = await contract.balanceOf(account);
     console.log("Balance: ", balance.toString());
   }
 }
 async function sendCoins() {
   if (typeof window.ethereum !== 'undefined') {
     await requestAccount()
     const provider = new ethers.providers.Web3Provider(window.ethereum);
     const signer = provider.getSigner();
     const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
     const transaction = await contract.transfer(userAccount, amount);
     await transaction.wait();
     console.log(`${amount} Coins successfully sent to ${userAccount}`);
   }
 }

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  async function fetchGreeting() {
   if (typeof window.ethereum !== 'undefined') {
     const provider = new ethers.providers.Web3Provider(window.ethereum)
     console.log({ provider })
     const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider)
     try {
       const data = await contract.greet()
       console.log('data: ', data)
     } catch (err) {
       console.log("Error: ", err)
     }
   }    
 }


    async function setGreeting() {
      if (!greeting) return
      if (typeof window.ethereum !== 'undefined') {
        await requestAccount()
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        console.log({ provider })
        const signer = provider.getSigner()
        const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer)
        const transaction = await contract.setGreeting(greeting)
        await transaction.wait()
        fetchGreeting()
      }
    }

    return (
      <div className="App">
        <header className="App-header">
          <button onClick={fetchGreeting}>Fetch Greeting</button>
          <button onClick={setGreeting}>Set Greeting</button>
          <input onChange={e => setGreetingValue(e.target.value)} placeholder="Set greeting" />
  
          <br />
          <button onClick={getBalance}>Get Balance</button>
        <button onClick={sendCoins}>Send Coins</button>
        <input onChange={e => setUserAccount(e.target.value)} placeholder="Account ID" />
        <input onChange={e => setAmount(e.target.value)} placeholder="Amount" />
        </header>
      </div>
    );
}

export default App;
