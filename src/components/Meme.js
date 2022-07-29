/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';

export default function Meme() {
    const [allMemes, setAllMemes] = useState([]);

    useEffect(() => {
        fetch('https://api.imgflip.com/get_memes')
            .then((res) => res.json())
            .then((data) => setAllMemes(data));
    }, []);

    const meme = {
        topTextInput: '',
        bottomTextInput: '',
        randomImg: 'http://i.imgflip.com/1bij.jpg',
    };

    const [memeImage, setMemeImage] = useState(meme);

    const onClickAction = () => {
        setMemeImage((prevMemeImage) => ({
            ...prevMemeImage,
            randomImg:
                allMemes.data.memes[
                    Math.floor(Math.random() * allMemes.data.memes.length)
                ].url,
        }));
    };

    const onChangeAction = (event) => {
        const { name, value } = event.target;

        setMemeImage((prevMemeImage) => ({
            ...prevMemeImage,
            [name]: value,
        }));
    };

    return (
        <main>
            <div id="submitForm">
                <div id="inputs">
                    <input
                        type="text"
                        id="topTextInput"
                        placeholder="Top Text"
                        name="topTextInput"
                        value={memeImage.topTextInput}
                        onChange={onChangeAction}
                    />
                    <input
                        type="text"
                        id="bottomTextInput"
                        placeholder="Bottom Text"
                        name="bottomTextInput"
                        value={memeImage.bottomTextInput}
                        onChange={onChangeAction}
                    />
                </div>
                <button type="submit" id="submitBtn" onClick={onClickAction}>
                    Get a new meme image{'  '}
                    <i className="fa-solid fa-image" />
                </button>
            </div>
            <div id="imgContainer">
                <h2 id="topText">{memeImage.topTextInput}</h2>
                <img src={memeImage.randomImg} id="memeImg" alt="meme-img" />
                <h2 id="bottomText">{memeImage.bottomTextInput}</h2>
            </div>
        </main>
    );
}
