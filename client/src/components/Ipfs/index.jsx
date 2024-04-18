import React, { useState, useContext, useEffect } from 'react';
import { create } from 'ipfs-http-client';
import { EthContext } from '../../contexts/EthContext/'; // Path to your EthProvider file
import IpfsImage from '../IpfsImage';

const IpfsUpload = () => {
    const { state } = useContext(EthContext);
    const [file, setFile] = useState(null);
    const [ipfsHash, setIpfsHash] = useState('');
    const [hashes, setHashes] = useState([]);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        try {
            const ipfsClient = create({ host: 'localhost', port: "5001", protocol: 'http' });
            const added = await ipfsClient.add(file);
            const hash = added.cid.toString();
            setIpfsHash(hash);

            // Call the addHash method of the contract
            await state.contract.methods.addHash(hash).send({ from: state.accounts[0] });
        } catch (error) {
            console.error('Error uploading file to IPFS:', error);
        }
    };

    const handleRetrieve = async () => {
        try {
            // Check if state.contract is null
            if (!state.contract) {
                console.log('Contract is not initialized yet');
                return;
            }
    
            // Call the getHashes method of the contract
            const hashes = await state.contract.methods.getHashes().call();
            setHashes(hashes);
        } catch (error) {
            console.error('Error retrieving IPFS hashes:', error);
        }
    };

    useEffect(() => {
        handleRetrieve();
    }, [state.contract]);

    return (
        <div>
            <h1>IPFS File Upload</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            <button onClick={handleRetrieve}>Retrieve IPFS Hash</button>
            {ipfsHash && <p>IPFS Hash: {ipfsHash}</p>}
            {hashes.map((hash, index) => (
                 <><IpfsImage hash={hash} /><p key={index}>Hash {index + 1}: {hash}</p></>
            ))}
        </div>
    );
};

export default IpfsUpload;