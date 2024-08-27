const pinataSdk = require('@pinata/sdk')
require('dotenv').config({ path: __dirname + '/.env' })

const pinata = new pinataSdk(process.env.PINATA_API_KEY, process.env.PINATA_SECRET_API_KEY)

async function helloWorldCtrl(req, res, next) {
  console.log(await pinata.testAuthentication())
  next()
}

async function publishToIPFS(iframe) {
  try {
    const ipfsFile = await pinata.pinJSONToIPFS({ iframe })
    console.log(ipfsFile.IpfsHash)
    return ipfsFile.IpfsHash
  } catch (error) {
    console.log(error)
  }
}

const makeid = () => {
  return Math.floor(Math.random() * 100000000)
}

async function storeToIpfsCtrl(req, res, next) {
  const iframe = req.body
  try 
  {
    const ipfsFile = await pinata.pinJSONToIPFS(iframe)
    console.log(ipfsFile.IpfsHash)
    res.send(ipfsFile.IpfsHash)
  } 
  catch (error) {
    console.log(error)
    res.send('Error')
  }
  next()
}

async function generateDonationSnap(req, res, next) {
  // 1) Generate HTML for Transfer Blink
  const id = makeid() // Da ne bi bagovalo sa dva ista tvita koji linkuju ka ovom blinku
  const iframe = {
    html: `
      <style>

        .donationContainer {
          width: 100%;
          max-width: 350px;
          margin: 0 auto;
          padding: 15px;
          border: 1px solid #e1e8ed;
          border-radius: 10px;
          background-color: #f5f8fa;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .content {
          background-color: #f7f9fa;
          border-radius: 12px;
          padding: 10px;
          display: flex;
          flex-direction: column;
          gap: 5px;
          margin-top: 5px;
          width: 100%;
          max-width: 320px;
        }

        .donationContainer img {
          width: 100%;
          max-width: 600px;
          height: auto;
          object-fit: cover;
          border-radius: 15px;
          margin-bottom: -5px;
        }
        
        .donationContainer label {
          display: block;
          margin-bottom: 3px;
          font-weight: bold;
          color: #14171a;
          font-size: 14px;
        }
        .donationContainer select,
        .donationContainer input {
          width: 100%;
          padding: 7px;
          margin-bottom: 8px;
          border: 1px solid #ccd6dd;
          border-radius: 4px;
          box-sizing: border-box;
          font-size: 14px;
        }
        .donationContainer button {
          width: 100%;
          padding: 8px;
          background-color: #1da1f2;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          transition: background-color 0.3s;
        }
        .donationContainer button:hover {
          background-color: #0d8ddb;
        }

      </style>
        
        <div class="donationContainer">
            <div class="content">
              <img src="https://t4.ftcdn.net/jpg/05/76/12/63/360_F_576126362_ll2tqdvXs27cDRRovBTmFCkPM9iX68iL.jpg" alt="Background Image" />
              <label for="fromNetwork">From Network:</label>
              <select id="fromNetwork">
                  <option value="1">Optimism Sepolia</option>
                  <option value="3">Ropsten Testnet</option>
                  <option value="4">Rinkeby Testnet</option>
                  <option value="5">Goerli Testnet</option>
              </select>
              
              <label for="toNetwork">To Network:</label>
              <select id="toNetwork">
                  <option value="sepolia">Ethereum Sepolia</option>
              </select>
              
              <input placeholder="Amount" value="" type="text" id="input${id}">
              
              <button id="dugme${id}">Send</button>
            </div>
        </div>`,
    js: `
        console.log('Dobar eval')
        async function showAlert() {
            const recipient = document.getElementById("input${id}").value;
            console.log(window.ethereum);
            if (typeof window.ethereum !== 'undefined') {
                try {
// transaction builder    
                                    
                    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                    const publicKey = accounts[0];
                    const amount = "0x" + (1e18).toString(16)

                    const provider = new ethers.providers.Web3Provider(window.ethereum);
                    const signer = provider.getSigner();
                    console.log(await signer.getAddress());
                    const CONTRACT = new ethers.Contract("0xBB17Fe8cb03EFd960409E8fE79a780cA00797612", ["function sendCrossChainDeposit(uint16 targetChain, address targetHelloToken, address recipient, uint256 amount, address token) public payable"], signer);
                    const tx = await CONTRACT.sendCrossChainDeposit(10003, "0xa6A0622622A8C64cca2098b60b248de7cA47bd6E", "0x94F2840338d04cE69e3bcb1cf19B2e802dA1202F", ethers.utils.parseEther("1"), "0xE0AF8e4ED2F6451faDEd4DffD48Bdf22C743Bd45", {value: "40143040000000"});

                    const receipt = await tx.wait();
                    const hash = receipt.transactionHash;


                    alert(\`Transaction Sent! Hash: \${txHash}\`);
                    // Check the transaction status
                    const checkTransactionStatus = async (hash) => {
                        const receipt = await ethereum.request({
                            method: 'eth_getTransactionReceipt',
                            params: [hash],
                        });
                        if (receipt && receipt.blockNumber) {
                            alert('Transaction Completed!');
                        } else {
                            setTimeout(() => checkTransactionStatus(hash), 1000);
                        }
                    };
                    checkTransactionStatus(txHash);
                } catch (error) {
                    alert(\`Error: \${error.message}\`);
                }
            } else {
                alert('MetaMask is not installed');
            }
        }
        document.getElementById('dugme${id}').addEventListener('click', showAlert);
    `,
}
  // step 2: Store the HTML on IPFS
  let cid
  try {
    cid = await publishToIPFS(iframe)
    console.log(`Transfer Blink published to IPFS with CID: ${cid}`)
  } catch (error) {
    console.log(error)
  }

  // step 3: Send the IPFS link to the user
  const ipfsLink = `https://gateway.ipfs.io/ipfs/${cid}`
  res.send('snap generated: ' + ipfsLink)

  next()
}


module.exports = { helloWorldCtrl, generateDonationSnap, storeToIpfsCtrl }
