
let songIndex = 0;
let audioElement = new Audio('songs1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "So High School", filePath: "songs/1.mp3", coverPath: "covers/highschool.jpg"},
    {songName: "Steal my girl", filePath: "songs/2.mp3", coverPath: "covers/one.jpg"},
    {songName: "Summertime Sadness", filePath: "songs/3.mp3", coverPath: "covers/lana.jpg"},
    {songName: "Dil Dhadakne Do", filePath: "songs/4.mp3", coverPath: "covers/ddd.jpg"},
    {songName: "Something just like this", filePath: "songs/5.mp3", coverPath: "covers/coldplay.jpg"},
    {songName: "Shake it off", filePath: "songs/6.mp3", coverPath: "covers/1989.jpg"},
    {songName: "Fortnight", filePath: "songs/7.mp3", coverPath: "covers/fortnight.jpg"},
    {songName: "Daylight", filePath: "songs/8.mp3", coverPath: "covers/daylight.jpg"},
];

const playNextSong = () => {
    if (songIndex < songs.length - 1) {
        songIndex++;
        playSong();
    } else {
        songIndex = 0; 
        playSong();
    }
};

const playSong = () => {
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;
};

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        playSong();
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
});

audioElement.addEventListener('timeupdate', ()=>{
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
 });
 
 myProgressBar.addEventListener('change',()=>{
     audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
 });


audioElement.addEventListener('ended', playNextSong);


document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex >= 7){
        songIndex = 0
    }else{
        songIndex += 1;
    }
    audioElement.src= `songs${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
});

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }else{
        songIndex -= 1;
    }
    audioElement.src= `songs${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
});
const initializeSongItems = () => {
    songItems.forEach((element, i) => {
        element.getElementsByTagName("img")[0].src = songs[i].coverPath;
        element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
        element.getElementsByClassName("songItemPlay")[0].addEventListener('click', (e) => {
            makeAllPlays();
            songIndex = parseInt(e.target.id);
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            playSong();
        });
    });
};

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
};

initializeSongItems();

    


