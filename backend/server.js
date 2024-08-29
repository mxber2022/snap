const express = require('express')
const cors = require('cors')
const builder = require('./snapBuilder.js')
const app = express()
const port = 8000

app.use(cors())
app.use(express.json())

app.get('/', builder.helloWorldCtrl)
app.post('/generateDonation', builder.generateDonationSnap)
app.post('/generatePrediction', builder.generatePredictionSnap)
app.post('/generateBridge', builder.generateBridgeSnap)
app.post('/storeToIpfs', builder.storeToIpfsCtrl)

app.listen(port, () => {
  console.log(`snap listening on port ${port}`)
})
