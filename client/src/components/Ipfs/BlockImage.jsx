import React, { useCallback, useEffect, useState, useContext } from 'react';
import { EthContext } from '../../contexts/EthContext/';

const DynamicImage = () => {
    const { state } = useContext(EthContext);
    const [hashes, setHashes] = useState([]); // Initialize hashes as an empty array

    const handleRetrieve = useCallback(async () => {
        try {
            if (!state.contract) {
                console.log('Contract is not initialized yet');
                return;
            }

            const hashes = await state.contract.methods.getHashes().call();
            setHashes(hashes);
        } catch (error) {
            console.error('Error retrieving IPFS hashes:', error);
        }
    }, [state.contract]);

    useEffect(() => {
        handleRetrieve();
    }, [handleRetrieve]);

    return (
        <div className="flex flex-wrap justify-center">
            {hashes.map((hash, index) => (
                <>
                    <img key={hash} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 h-64 object-cover m-2" src={`http://localhost:8080/ipfs/${hash}`} alt="IPFS" />
                </>
            ))}
        </div>
    );
};

export default DynamicImage;