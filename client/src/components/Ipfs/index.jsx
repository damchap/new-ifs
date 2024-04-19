import React, { useState, useContext, useEffect, useCallback } from 'react';
import { create } from 'ipfs-http-client';
import { EthContext } from '../../contexts/EthContext/'; // Path to your EthProvider file
import IpfsImage from '../IpfsImage';

const IpfsUpload = () => {
    const { state } = useContext(EthContext);
    const [ipfsHash, setIpfsHash] = useState('');
    const [hashes, setHashes] = useState([]);

    const handleFileChange = (event) => {
        // Check if a file was selected
        if (event.target.files.length > 0) {
            const file = event.target.files[0];

            // Call handleUpload with the selected file
            handleUpload(file);
        }
    };

    const handleUpload = async (file) => {
        try {
            const data = new Uint8Array(await file.arrayBuffer());
            const ipfsClient = create({ host: 'localhost', port: "5001", protocol: 'http' });
            const added = await ipfsClient.add(data);
            const hash = added.cid.toString();
            setIpfsHash(hash);

            // Call the addHash method of the contract
            await state.contract.methods.addHash(hash).send({ from: state.accounts[0] });
        } catch (error) {
            console.error('Error uploading file to IPFS:', error);
        }
    };

    

    

    return (
        <div className="py-7 flex flex-row items-center justify-center">
            <label className="w-72 flex flex-col items-center px-4 py-6 bg-green-700 text-blue rounded-lg shadow-lg tracking-wide uppercase cursor-pointer text-white hover:scale-105 hover:bg-green-800 transition-all">
                
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"  width="32" height="32" viewBox="0 0 1024 1024"><path fill="currentColor" d="M518.3 459a8 8 0 0 0-12.6 0l-112 141.7a7.98 7.98 0 0 0 6.3 12.9h73.9V856c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V613.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 459z"/><path fill="currentColor" d="M811.4 366.7C765.6 245.9 648.9 160 512.2 160S258.8 245.8 213 366.6C127.3 389.1 64 467.2 64 560c0 110.5 89.5 200 199.9 200H304c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8h-40.1c-33.7 0-65.4-13.4-89-37.7c-23.5-24.2-36-56.8-34.9-90.6c.9-26.4 9.9-51.2 26.2-72.1c16.7-21.3 40.1-36.8 66.1-43.7l37.9-9.9l13.9-36.6c8.6-22.8 20.6-44.1 35.7-63.4a245.6 245.6 0 0 1 52.4-49.9c41.1-28.9 89.5-44.2 140-44.2s98.9 15.3 140 44.2c19.9 14 37.5 30.8 52.4 49.9c15.1 19.3 27.1 40.7 35.7 63.4l13.8 36.5l37.8 10C846.1 454.5 884 503.8 884 560c0 33.1-12.9 64.3-36.3 87.7a123.07 123.07 0 0 1-87.6 36.3H720c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h40.1C870.5 760 960 670.5 960 560c0-92.7-63.1-170.7-148.6-193.3z"/></svg>
                <span className="mt-2 text-base leading-normal">Select a file</span>
                <input type='file' className="hidden" onChange={handleFileChange} />
            </label>
            {/* <button 
                className='bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded'
                onClick={handleUpload}>
                    Upload
            </button> */}
            {/* {ipfsHash && <p>IPFS Hash: {ipfsHash}</p>}
            {hashes.map((hash, index) => (
                 <><IpfsImage hash={hash} /><p key={index}>Hash {index + 1}: {hash}</p></>
            ))} */}
        </div>
    );
};

export default IpfsUpload;