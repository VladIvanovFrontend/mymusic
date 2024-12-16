import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classes from '@/style/searchPanel.module.css';
import Image from "next/image";

const SearchPanel = () => {
    const [query, setQuery] = useState('');
    const [songs, setSongs] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const fetchSongs = async (searchQuery: string) => {
        if (searchQuery.trim() === '') {
            setSongs([]);
            return;
        }

        setLoading(true);

        try {
            const response = await axios.get('http://localhost:5000/search', {
                params: { query: searchQuery },
            });
            setSongs(response.data);
        } catch (error) {
            console.error('Ошибка при поиске:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (query.length >= 3) {
            fetchSongs(query);
        } else {
            setSongs([]);
        }
    }, [query]);

    function resizeInput(event: React.FormEvent<HTMLInputElement>): void {
        const input = event.target as HTMLInputElement;

        if (!(input instanceof HTMLInputElement)) {
            console.error('Target is not a valid HTMLInputElement');
            return;
        }

        const tempSpan = document.createElement('span');
        tempSpan.style.visibility = 'hidden';
        tempSpan.style.position = 'absolute';
        tempSpan.style.whiteSpace = 'pre';
        tempSpan.style.fontSize = getComputedStyle(input).fontSize;
        tempSpan.style.fontFamily = getComputedStyle(input).fontFamily;
        tempSpan.textContent = input.value || input.placeholder;
        document.body.appendChild(tempSpan);

        const newWidth = Math.max(tempSpan.offsetWidth + 20, 500);
        input.style.width = `${newWidth}px`;

        document.body.removeChild(tempSpan);
    }

    return (
        <div>
            <main className={classes.searchWrapper}>
                <form
                    action="/search"
                    method="get"
                    aria-label="Поиск песни"
                    onSubmit={(e) => e.preventDefault()}
                >
                    <input
                        type="text"
                        id="song-search"
                        name="query"
                        placeholder="Название песни, артист"
                        value={query}
                        onChange={handleInputChange}
                        onInput={(e) => resizeInput(e)}
                        className={classes.searchInput}
                    />
                </form>

                {query.trim() && (
                    <div className={classes.results}>
                        {loading ? (
                            <p className={classes.resultsText}>Загрузка...</p>
                        ) : songs.length > 0 ? (
                            <ul className={classes.songList}>
                                {songs.map((song) => (
                                    <div key={song.id} className={classes.songContainer}>
                                        <li className={classes.cardMusic}>
                                            <h4 className={classes.resultsText}>{song.artist}</h4>
                                            <p className={classes.resultsText}>{song.title}</p>
                                        </li>
                                    </div>
                                ))}
                            </ul>
                        ) : (
                            <div className={classes.resultsRotateWrapper}>
                                <Image
                                    src={'/icon_rotate.png'}
                                    alt={'rotate'}
                                    width={61}
                                    height={61}
                                    className={classes.resultsRotate}
                                />
                                <span className={classes.resultsText}>Поиск...</span>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};

export default SearchPanel;
