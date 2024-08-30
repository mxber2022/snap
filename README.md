# Snap

Welcome to Snap! We aim to connect web3 technology with everyday web applications. Traditionally, engaging with blockchain technology involves using separate applications, which can hinder broad adoption. Snap eliminates these obstacles by enabling users to design custom components using HTML and JavaScript. These components are uploaded to IPFS and dynamically rendered by our browser extension, facilitating seamless blockchain interactions within common web environments.

## Contracts Deployment

### Donation Contract
- **Crosschain Ethereum Sepolia**: `0x51E92Aaac8e019d9E2903745dB2DB4fd119c3804`
- **Crosschain Optimism Sepolia**: `0x6B6d0aE4Ee2d2DDd5fF306463Cf969c6aF8242a2`
- **USDC Token on Ethereum Sepolia**: `0xb204fd728AC0Aeee4D33C0Cb7f164E3072Fc3D9C`

### Prediction Market Contract
- **Optimism Sepolia**: `0xaaa906c8c2720c50b69a5ba54b44253ea1001c98`
- **Ethereum Sepolia**: `0x4EEc84B0f4Fb1c035013a673095b1E7e73ea63cc`

## How It Works 🔧

### Generating SNAP

1. **Genearate Custom SNAP**: Choose from the template.
2. **Save SNAP**: Receive SNAP Link.
3. **Rendering**: Render the SNAP on X, Facebook anywhere.

## Architecture

Snap is designed to integrate smoothly with existing web3 technologies and web2 stack. 

## Technical Architecture

<pre>
{`
+--------------------+        +----------------------+          +------------------------+          +-------------------------+
|   Frontend (UI)    |        |      Express.js      |          |      IPFS Gateway      |          |    Ethereum Network     |
|  - Web3 Frontend   | <----> |   - Receives SNAP    | <------> |   - Publish HTML/JS    | <------> |   - Smart Contracts     |
|  - Build SNAP      |        |   - GraphQL Client   |          |   - Return CID         |          |   - Handle Transactions |
|                    |        |   - IPFS Publisher   |          |                        |          |   - Cross-Chain wormhole|
+--------------------+        +----------------------+          +------------------------+          +-------------------------+

+--------------------+        
|   Chrome           |       
|  - Plugin          | 
|                    |             
+--------------------+ 
`}
</pre>

## Getting Started

#### Clone the Repository

```bash
git clone https://github.com/mxber2022/snap
```

#### Setting Up Backend

1. **Setup the Environment**  
   - Rename `.env.example` file to `.env`.
   - Enter `PINATA_API_KEY`, `PINATA_SECRET_API_KEY`

2. **Install Dependencies**

   ```bash
   cd backend
   npm install
   ```

3. **Run the Server**

   ```bash
   npm run dev
   ```

#### Setting Up the Frontend

1. **Install Dependencies**

   ```bash
   cd snap
   cd frontend
   npm install
   ```

2. **Run the App**

   ```bash
   yarn dev
   ```

3. **Add the Extension**

   - In your browser's extension setting page, enable developer mode.
   - Click "Load unpacked" and select the `extension` folder.

## Support

If you have any questions or need support, feel free to contact us at [mxber2022@gmail.com].

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

By following these instructions, you can set up Snap and start integrating blockchain technology into everyday web applications. Enjoy your experience with Snap! 🚀
```
