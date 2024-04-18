import React, { useState, useContext } from 'react';
import { create } from 'ipfs-http-client';
import { EthContext } from '../../contexts/EthContext/'; // Path to your EthProvider file

const IpfsUpload = () => {
    const { state } = useContext(EthContext);
    const [file, setFile] = useState(null);
    const [ipfsHash, setIpfsHash] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        try {
            const ipfsClient = create({ host: 'localhost', port: 5001, protocol: 'https' });
            const added = await ipfsClient.add(file);
            const hash = added.cid.toString();
            setIpfsHash(hash);

            // Call the setHash method of the contract
            await state.contract.methods.setHash(hash).send({ from: state.accounts[0] });
        } catch (error) {
            console.error('Error uploading file to IPFS:', error);
        }
    };

    return (
        <div>
            <h1>IPFS File Upload</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            {ipfsHash && <p>IPFS Hash: {ipfsHash}</p>}
        </div>
    );
};

export default IpfsUpload;