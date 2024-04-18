import React from 'react';

const IpfsImage = ({ hash }) => {
    const url = `http://localhost:8080/ipfs/${hash}`;

    return (
        <img src={url} alt="IPFS" />
    );
};

export default IpfsImage;