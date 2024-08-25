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

}


module.exports = { helloWorldCtrl, generateDonationSnap, storeToIpfsCtrl }
