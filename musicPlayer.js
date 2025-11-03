const song = document.body.querySelector('.audio')
const playPause = document.body.querySelector('.play-pause')
const seekbar = document.body.querySelector('#seekbar')
const volume = document.body.querySelector('#volume')

seekbar.value = 0;

song.volume = 1
volume.value = song.volume

// seekbar

song.addEventListener('loadedmetadata', ()=>{
    seekbar.max = song.duration
})

song.addEventListener('timeupdate', ()=>{
    seekbar.value = song.currentTime
} )

seekbar.addEventListener('input', ()=>{
    song.currentTime = seekbar.value
})

// play-pause

playPause.addEventListener('click', ()=>{
    if(song.paused){
        song.play()
        document.body.querySelector('.play-button').style.display = 'none'
        document.body.querySelector('.pause-button').style.display = 'block'
    }
    else{
        song.pause()
        document.body.querySelector('.play-button').style.display = 'block'
        document.body.querySelector('.pause-button').style.display = 'none'
    }
})


// volume bar

volume.addEventListener('input', ()=>{
    song.volume = volume.value
})

