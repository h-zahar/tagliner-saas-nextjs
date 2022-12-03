"use client";

import { useRef, useState } from "react";

const TagLiner: React.FC = () => {
    const [keyword, setKeyword] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const ENDPOINT = 'https://api-saas.onrender.com/snippet';
    const [tagLine, setTagLine] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onsubmit = () => {
        if (keyword === '') return;
        inputRef.current ? inputRef.current.hidden = true : null;
        setIsLoading(true);

        fetch(`${ENDPOINT}?user_input=${keyword}`)
        .then(res => res.json())
        .then(data => {
            setTagLine(data?.content);
            setKeyword('');
            inputRef.current ? inputRef.current.hidden = false : null;
            setIsLoading(false);
        })
        .catch(err => {
            console.log(err);
            inputRef.current ? inputRef.current.hidden = false : null;
            setIsLoading(false);
        });
    }
    return (
        <>
            <div>
                <h1>TagLiner</h1>
                <p>Enter Keywords for your brand</p>
            </div>
            <div ref={inputRef}>
                <input 
                    placeholder="tea" 
                    value={keyword}
                    onChange={(e) => setKeyword(e.currentTarget.value)} 
                    onKeyUp={(e) => {
                        if (e.key === 'Enter') onsubmit();
                    }}
                />
                <button onClick={onsubmit}>Submit</button>
            </div>
            {isLoading ? <p>Loading...</p> : null}
            <div>
                {
                    tagLine !== '' && !isLoading ?
                    <p>{tagLine}</p>
                    : null
                }
            </div>
        </>
    );
};

export default TagLiner;