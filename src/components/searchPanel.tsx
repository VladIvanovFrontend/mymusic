import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import classes from '@/style/searchPanel.module.css';
import Image from 'next/image';

interface Song {
    id: number;
    title: string;
    artist: string;
    album: string;
    preview_url: string;
    image_url: string;
}

const SearchPanel: React.FC = () => {
    const [query, setQuery] = useState<string>('');
    const [songs, setSongs] = useState<Song[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setQuery(event.target.value);
    };

    const fetchSongs = async (searchQuery: string): Promise<void> => {
        if (!searchQuery.trim()) {
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

    const handleSongClick = (previewUrl: string): void => {
        if (audioRef.current) {
            // Если песня уже воспроизводится, ставим на паузу
            if (!audioRef.current.paused) {
                audioRef.current.pause();
                setIsPlaying(false);
            }

            // Убираем текущий источник и обновляем на новый
            audioRef.current.src = ''; // Очистка старого источника
            audioRef.current.load(); // Перезагружаем аудио

            // Устанавливаем новый источник и начинаем воспроизведение с начала
            audioRef.current.src = previewUrl;
            audioRef.current.currentTime = 0; // Устанавливаем начало песни
            audioRef.current.play(); // Начинаем воспроизведение
            setIsPlaying(true);
        }
    };

    return (
        <div>
            <main className={classes.searchWrapper}>
                <form aria-label="Поиск песни" onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="text"
                        placeholder="Название песни, артист"
                        value={query}
                        onChange={handleInputChange}
                        className={classes.searchInput}
                    />
                </form>

                {query.trim() && (
                    <div className={classes.resultsContainer}>
                        {loading ? (
                            <div className={classes.resultsRotateWrapper}>
                                <Image
                                    src={'/icon_rotate.png'}
                                    alt={'Загрузка'}
                                    width={61}
                                    height={61}
                                    className={classes.resultsRotate}
                                />
                                <span className={classes.resultsText}>Поиск...</span>
                            </div>
                        ) : songs.length > 0 ? (
                            songs.slice(0, 13).map((song) => (
                                <section
                                    key={song.id}
                                    className={classes.songSection}
                                    onClick={() => handleSongClick(song.preview_url)}
                                >
                                    <div className={classes.songContainer}>
                                        <Image
                                            src={song.image_url}
                                            alt={song.album}
                                            width={50}
                                            height={50}
                                            className={classes.albumImage}
                                        />
                                        <span>
                                            <h4 className={classes.resultsText}>{song.artist}</h4>
                                            <p className={classes.resultsText}>{song.title}</p>
                                        </span>
                                    </div>
                                </section>
                            ))
                        ) : (
                            <div></div>
                        )}
                    </div>
                )}
            </main>
            <audio ref={audioRef} />
        </div>
    );
};

export default SearchPanel;
