// Element selection

// const song = document.body.querySelector('.audio')

const homeButton = document.body.querySelector('.home button')

const playlistSongsMain = document.body.querySelector('.playlist-main')
const mainAlbums = document.body.querySelector('.main')

// library elements
const libraryList = document.body.querySelector('.list')

// playlist grid elements
const playlistGrid = document.body.querySelector('.playlist-grid')

let songList = [];
let currentSongIndex = -1;
let currentlyPlayingSong = null;

const playPause = document.body.querySelector('.play-pause');
const playButton = document.body.querySelector('.play-button');
const pauseButton = document.body.querySelector('.pause-button');


document.addEventListener('keydown', (event) => {
    if (event.key === 'Space' || event.key === ' ') {
        event.preventDefault();
        if (currentlyPlayingSong) {
            if (currentlyPlayingSong.paused) {
                currentlyPlayingSong.play();
                playButton.style.display = 'none';
                pauseButton.style.display = 'block';
            } else {
                currentlyPlayingSong.pause();
                playButton.style.display = 'block';
                pauseButton.style.display = 'none';
            }
        } else {
            console.error('No song is currently selected to play/pause.');
        }
    }
}
);

playPause.addEventListener('click', () => {
    if (currentlyPlayingSong) {
        const currentSongPoster = document.querySelector('.current-song-poster');
        const posterImg = currentSongPoster.querySelector('img');
        const posterBars = currentSongPoster.querySelector('.music-bars');
        if (currentlyPlayingSong.paused) {
            currentlyPlayingSong.play();
            playButton.style.display = 'none';
            pauseButton.style.display = 'block';
            if (posterImg) posterImg.style.display = 'none';
            if (posterBars) posterBars.style.display = 'flex';
        } else {
            currentlyPlayingSong.pause();
            playButton.style.display = 'block';
            pauseButton.style.display = 'none';
            if (posterImg) posterImg.style.display = 'block';
            if (posterBars) posterBars.style.display = 'none';
        }
    } else {
        console.error('No song is currently selected to play/pause.');
    }
});


function seekbarOperations(song) {
    const seekbar = document.body.querySelector('#seekbar');
    const volume = document.body.querySelector('#volume');
    const currentTimeDiv = document.body.querySelector('.current-time');
    const totalTimeDiv = document.body.querySelector('.total-time');

    if (!song || !song.src || song.readyState === 0) {
        console.error('Audio file is not loaded properly.');
        return;
    }

    // Initial setup
    seekbar.value = 0;
    song.volume = 1;
    volume.value = song.volume;

    // Seekbar
    song.load();
    song.addEventListener('loadedmetadata', () => {
        if (song.duration) {
            seekbar.max = song.duration;
            totalTimeDiv.innerHTML = formatTime(song.duration);
        } else {
            console.error('Unable to retrieve song duration.');
        }
    });

    song.addEventListener('timeupdate', () => {
        if (song.duration && song.currentTime) {
            const value = (song.currentTime / song.duration) * 100;
            seekbar.style.background = `linear-gradient(to right, #34bd6b ${value}%, grey ${value}%)`;
            seekbar.value = song.currentTime;
            currentTimeDiv.innerHTML = formatTime(song.currentTime);
        }
    });

    seekbar.addEventListener('input', () => {
        const value = (seekbar.value / seekbar.max) * 100;
        seekbar.style.background = `linear-gradient(to right, #34bd6b ${value}%, grey ${value}%)`;
        song.currentTime = seekbar.value;
        currentTimeDiv.innerHTML = formatTime(seekbar.value);
    });


    // Format time function
    function formatTime(seconds) {
        const formatedMinutes = Math.floor(Number(seconds / 60));
        const formatedSeconds = Math.floor(Number(seconds % 60));
        return `${formatedMinutes}:${formatedSeconds < 10 ? '0' : ''}${formatedSeconds}`;
    }

    // Volume bar
    volume.addEventListener('input', () => {
        const value = volume.value * 100;
        volume.style.background = `linear-gradient(to right, #33bc69 ${value}%, grey ${value}%)`;
        song.volume = volume.value;
    });
}


// Home button

homeButton.addEventListener('click', () => {
    mainAlbums.style.display = 'block';
    playlistSongsMain.style.display = 'none';
})

// load playlist

// fetch("playlists.json")
//     .then((response) => {
//         return response.json()
//     }).then((playlists) => {
//         playlists.forEach((playlist) => {
//             console.log(playlist.name);
//             playlist.songs.forEach(songdetails => {
//                 console.log(songdetails.title)
//             });
//         });
//     })


// add playlists in library function

async function librarySongs() {
    try {
        const res = await fetch('playlists.json');
        const playlists = await res.json();

        playlists.forEach(playlist => {
            console.log(playlist.name)


            const elementDiv = document.createElement('div')
            elementDiv.className = 'element'

            const coverDiv = document.createElement('div')
            coverDiv.className = 'cover'

            const coverImg = document.createElement('img')

            const playlistName = document.createElement('div')
            playlistName.className = 'playlist-name'

            document.body.querySelector('.list').insertAdjacentElement('afterbegin', elementDiv)

            elementDiv.insertAdjacentElement('afterbegin', coverImg)
            coverImg.className = 'playlist-poster'
            coverImg.src = `${playlist.poster}`

            elementDiv.append(playlistName)
            playlistName.textContent = `${playlist.name}`

            // adding click event listener

            elementDiv.addEventListener('click', () => {

                document.body.querySelector('.playlist-songs').innerHTML = ''

                document.body.querySelectorAll('.element').forEach(element => {
                    element.style.backgroundColor = '';
                });

                document.body.querySelectorAll('.playlist-name').forEach(element => {
                    element.style.color = '';
                });

                playlistName.style.color = '#34bd6b'

                elementDiv.style.backgroundColor = '#3d3d3d'

                // inserting elements

                const clickedPlaylist = `${playlist.name}`
                const clickedPlaylistPoster = `${playlist.poster}`

                console.log('playlist clicked', clickedPlaylistPoster)

                const playlistMain = document.body.querySelector('.playlist-main')

                const playlistGridMain = document.body.querySelector('.main')

                playlistMain.style.display = 'block'
                playlistGridMain.style.display = 'none'


                const playlistSongs = document.body.querySelector('.playlist-songs')

                const playlistDetails = document.createElement('div')
                playlistDetails.className = 'playlist-details'

                const playlistCover = document.createElement('div')
                playlistCover.className = 'playlist-cover'

                const playlistCoverImg = document.createElement('img')

                const playlistSongsName = document.createElement('div')
                playlistSongsName.className = 'playlist-songs-name'

                const playlistSongsList = document.createElement('div')
                playlistSongsList.className = 'playlist-songs-list'


                playlistSongs.appendChild(playlistDetails)
                playlistSongs.appendChild(playlistSongsList)

                playlistDetails.appendChild(playlistCover)
                playlistCover.appendChild(playlistCoverImg)

                playlistCoverImg.src = `${playlist.poster}`

                playlistDetails.appendChild(playlistSongsName)
                playlistSongsName.textContent = `${clickedPlaylist}`

                // songs

                songList = [];
                currentSongIndex = -1;

                playlist.songs.forEach((songplay, index) => {

                    const songElement = document.createElement('div')
                    songElement.className = 'song'

                    const songDetails = document.createElement('div')
                    songDetails.className = 'song-details'

                    const playlistMusicIcon = document.createElement('div');
                    playlistMusicIcon.className = 'playlist-music-icon';

                    const playlistMusicIconImg = document.createElement('img');
                    playlistMusicIconImg.src = 'assets/music-icon.svg';
                    playlistMusicIconImg.style.display = 'block';

                    const musicBars = document.createElement('div');
                    musicBars.className = 'music-bars';
                    musicBars.style.display = 'none';
                    for (let i = 0; i < 5; i++) {
                        const bar = document.createElement('div');
                        bar.className = 'bar';
                        musicBars.appendChild(bar);
                    }

                    playlistMusicIcon.appendChild(playlistMusicIconImg);
                    playlistMusicIcon.appendChild(musicBars);

                    const songNameList = document.createElement('div')
                    songNameList.className = 'song-name-list'
                    songNameList.textContent = `${songplay.title}`

                    const songAudio = document.createElement('audio')
                    songAudio.src = `${songplay.location}`

                    playlistSongsList.appendChild(songElement)
                    songElement.appendChild(songDetails)
                    songDetails.appendChild(playlistMusicIcon)
                    songDetails.appendChild(songNameList)
                    playlistMusicIcon.appendChild(playlistMusicIconImg)
                    songDetails.appendChild(songAudio)

                    // Add song to songList
                    songList.push({
                        audio: songAudio,
                        title: songplay.title,
                        element: songElement,
                        nameList: songNameList
                    });

                    // adding click event listener to song element

                    songElement.addEventListener('click', () => {
                        document.body.querySelector('.play-button').style.display = 'none';
                        document.body.querySelector('.pause-button').style.display = 'block';
                        handleSongClick(songAudio, songplay.title, songList.length - 1, songElement, songNameList);
                    })

                });

            })
        });

    } catch (error) {
        console.log(error)
    }

}

librarySongs()


// grid playlists function

async function mainPlaylist() {
    try {
        const res = await fetch('playlists.json')
        const playlists = await res.json()

        playlists.forEach(playlist => {

            // creating elements

            const playlistCard = document.createElement('div')
            playlistCard.className = 'playlist-card'

            const poster = document.createElement('div')
            poster.className = 'poster'

            const mainPoster = document.createElement('div')
            mainPoster.className = 'poster-image'

            const posterCover = document.createElement('img')
            posterCover.src = `${playlist.poster}`

            const greenIcon = document.createElement('div')
            greenIcon.className = 'play-green-icon'

            const greenIconImg = document.createElement('img')
            greenIconImg.src = 'assets/green-play-icon.svg'

            const posterPlaylistName = document.createElement('div')
            posterPlaylistName.className = 'poster-playlist-name'
            posterPlaylistName.textContent = `${playlist.name}`

            // inserting elements

            playlistGrid.appendChild(playlistCard)
            playlistCard.appendChild(poster)
            playlistCard.appendChild(posterPlaylistName)

            poster.appendChild(mainPoster)
            mainPoster.appendChild(posterCover)
            mainPoster.appendChild(greenIcon)

            greenIcon.appendChild(greenIconImg)

            playlistCard.addEventListener('click', () => {

                document.body.querySelector('.playlist-songs').innerHTML = ''

                // inserting elements

                const clickedPlaylist = `${playlist.name}`
                const clickedPlaylistPoster = `${playlist.poster}`

                console.log('playlist clicked', clickedPlaylistPoster)

                const playlistMain = document.body.querySelector('.playlist-main')

                const playlistGridMain = document.body.querySelector('.main')

                playlistMain.style.display = 'block'
                playlistGridMain.style.display = 'none'


                const playlistSongs = document.body.querySelector('.playlist-songs')

                const playlistDetails = document.createElement('div')
                playlistDetails.className = 'playlist-details'

                const playlistCover = document.createElement('div')
                playlistCover.className = 'playlist-cover'

                const playlistCoverImg = document.createElement('img')

                const playlistSongsName = document.createElement('div')
                playlistSongsName.className = 'playlist-songs-name'

                const playlistSongsList = document.createElement('div')
                playlistSongsList.className = 'playlist-songs-list'


                playlistSongs.appendChild(playlistDetails)
                playlistSongs.appendChild(playlistSongsList)

                playlistDetails.appendChild(playlistCover)
                playlistCover.appendChild(playlistCoverImg)

                playlistCoverImg.src = `${playlist.poster}`

                playlistDetails.appendChild(playlistSongsName)
                playlistSongsName.textContent = `${clickedPlaylist}`

                // songs

                songList = [];
                currentSongIndex = -1;

                playlist.songs.forEach(songplay => {

                    const songElement = document.createElement('div')
                    songElement.className = 'song'

                    const songDetails = document.createElement('div')
                    songDetails.className = 'song-details'

                    const playlistMusicIcon = document.createElement('div');
                    playlistMusicIcon.className = 'playlist-music-icon';

                    const playlistMusicIconImg = document.createElement('img');
                    playlistMusicIconImg.src = 'assets/music-icon.svg';
                    playlistMusicIconImg.style.display = 'block';

                    const musicBars = document.createElement('div');
                    musicBars.className = 'music-bars';
                    musicBars.style.display = 'none';
                    for (let i = 0; i < 5; i++) {
                        const bar = document.createElement('div');
                        bar.className = 'bar';
                        musicBars.appendChild(bar);
                    }

                    playlistMusicIcon.appendChild(playlistMusicIconImg);
                    playlistMusicIcon.appendChild(musicBars);

                    const songNameList = document.createElement('div')
                    songNameList.className = 'song-name-list'
                    songNameList.textContent = `${songplay.title}`

                    const songAudio = document.createElement('audio')
                    songAudio.src = `${songplay.location}`

                    playlistSongsList.appendChild(songElement)
                    songElement.appendChild(songDetails)
                    songDetails.appendChild(playlistMusicIcon)
                    songDetails.appendChild(songNameList)
                    playlistMusicIcon.appendChild(playlistMusicIconImg)
                    songDetails.appendChild(songAudio)

                    // Add song to songList
                    songList.push({
                        audio: songAudio,
                        title: songplay.title,
                        element: songElement,
                        nameList: songNameList
                    });

                    songElement.addEventListener('click', () => {
                        document.body.querySelector('.play-button').style.display = 'none';
                        document.body.querySelector('.pause-button').style.display = 'block';
                        handleSongClick(songAudio, songplay.title, songList.length - 1, songElement, songNameList);
                    })

                });

            })

        });

    } catch (error) {
        console.log(error)
    }
}

mainPlaylist()


function handleSongClick(songAudio, songTitle, index, songElement, songNameList) {
    if (!songAudio.src || songAudio.readyState === 0) {
        console.error(`Audio file for "${songTitle}" is not loaded properly.`);
        return;
    }

    if (currentlyPlayingSong && currentlyPlayingSong !== songAudio) {
        currentlyPlayingSong.pause();
        currentlyPlayingSong.currentTime = 0;
    }

    document.querySelectorAll('.song').forEach(el => {
        el.style.backgroundColor = '';
        const icon = el.querySelector('.playlist-music-icon img');
        const bars = el.querySelector('.music-bars');
        if (icon) icon.style.display = 'block';
        if (bars) bars.style.display = 'none';
    });
    document.querySelectorAll('.song-name-list').forEach(el => {
        el.style.color = '';
    });

    songElement.style.backgroundColor = '#3d3d3d';
    songNameList.style.color = '#34bd6b';

    const icon = songElement.querySelector('.playlist-music-icon img');
    const bars = songElement.querySelector('.music-bars');
    if (icon) icon.style.display = 'none';
    if (bars) bars.style.display = 'flex';

    const currentSongPoster = document.querySelector('.current-song-poster');
    if (currentSongPoster) {
        const posterImg = currentSongPoster.querySelector('img');
        const posterBars = currentSongPoster.querySelector('.music-bars');
        if (posterImg) posterImg.style.display = 'none';
        if (posterBars) posterBars.style.display = 'flex';
    }

    currentlyPlayingSong = songAudio;
    currentSongIndex = index;

    document.body.querySelector('.song-name').innerHTML = songTitle;

    seekbarOperations(songAudio);
    songAudio.play();
}

document.body.querySelector('.next').addEventListener('click', () => {
    if (currentSongIndex < songList.length - 1) {
        currentSongIndex++;
        const nextSong = songList[currentSongIndex];
        handleSongClick(nextSong.audio, nextSong.title, currentSongIndex, nextSong.element, nextSong.nameList);
    }
});

document.body.querySelector('.previous').addEventListener('click', () => {
    if (currentSongIndex > 0) {
        currentSongIndex--;
        const previousSong = songList[currentSongIndex];
        handleSongClick(previousSong.audio, previousSong.title, currentSongIndex, previousSong.element, previousSong.nameList);
    }
});


