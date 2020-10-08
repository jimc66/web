import React, { useState, useEffect } from 'react';
import ReactJson from 'react-json-view'

function Svc(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState({});

    useEffect(() => {
        fetch(props.address)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    console.log(props);
                    setData(result);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [props])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return <ReactJson theme="solarized" name={false} collapsed={false} enableClipboard={false} src={data} />
    }
}

export default Svc;
