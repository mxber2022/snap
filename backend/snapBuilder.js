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
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
            }
            .donation-container {
                max-width: 400px;
                margin: 0 auto;
                padding: 20px;
                border: 1px solid #ccc;
                border-radius: 10px;
                background-color: #f9f9f9;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            .donation-container h1 {
                color: #333;
                text-align: center;
                font-size: 24px;
                margin-bottom: 10px;
            }
            .donation-container p {
                color: #666;
                text-align: center;
                font-size: 16px;
                margin-bottom: 20px;
            }
            .donation-container label {
                display: block;
                margin-bottom: 5px;
                font-weight: bold;
            }
            .donation-container select,
            .donation-container input {
                width: 100%;
                padding: 10px;
                margin-bottom: 15px;
                border: 1px solid #ccc;
                border-radius: 5px;
                box-sizing: border-box;
            }
            .donation-container button {
                width: 100%;
                padding: 10px;
                background-color: #007bff;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 16px;
                transition: background-color 0.3s;
            }
            .donation-container button:hover {
                background-color: #0056b3;
            }
        </style>
        
        <div class="donation-container">
            <h1>Please Donate</h1>
            <p>For social cause</p>
            
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
