console.log("Welcome to Spotify");

let masterPlay = document.getElementById("play");
let audioElement = new Audio("songs/0.mp3");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let myProgressBar = document.getElementById("myProgressBar");

let songItems = Array.from(document.getElementsByClassName("songItem"));

let songs = [{songName:"Dandelions",filePath:"songs/0.mp3",coverPath:"covers/1.jpg"},
            {songName:"Gasolina",filePath:"songs/1.mp3",coverPath:"covers/2.jpg"},
            {songName:"How long",filePath:"songs/2.mp3",coverPath:"covers/3.jpg"},
            {songName:"Night changes",filePath:"songs/3.mp3",coverPath:"covers/4.jpg"},
            {songName:"Saiyaan",filePath:"songs/4.mp3",coverPath:"covers/5.jpg"},
            {songName:"Heat Waves",filePath:"songs/5.mp3",coverPath:"covers/6.jpg"},
            {songName:"Best Song Ever",filePath:"songs/6.mp3",coverPath:"covers/7.jpg"},
            {songName:"Let her go",filePath:"songs/7.mp3",coverPath:"covers/8.jpg"}
]

function convertTime(time){
            
            var mins = Math.floor(time / 60);
            if (mins < 10) {
            mins = '0' + String(mins);
            }
            var secs = Math.floor(time % 60);
            if (secs < 10) {
            secs = '0' + String(secs);
            }

            return mins + ':' + secs;
}




songItems.forEach((element,i) => {
    
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    //element.getElementsByTagName("img")[0].style.width = "38px";
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
    let audio = new Audio(`songs/${i}.mp3`);
    audio.addEventListener('loadedmetadata',()=>{
        let time = audio.duration;
        let Time = convertTime(time);
        element.getElementsByClassName("Time")[0].innerText = Time  ;
    })
    
});


    

function makeAllPlays(){
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
        element.classList.remove("fa-pause-circle");
        element.classList.add("fa-play-circle");
    
    })
}








Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
    element.addEventListener('click',(e)=>{
        var idx = parseInt(e.target.id);
        if(audioElement.paused || audioElement.currentTime==0){
            makeAllPlays();
            e.target.classList.remove("fa-play-circle");
            e.target.classList.add("fa-pause-circle");

            audioElement.src = `songs/${idx}.mp3`;
            audioElement.currentTime=0;
            audioElement.play();
            gif.style.opacity=1;
            masterPlay.classList.remove("fa-play-circle");
            masterPlay.classList.add("fa-pause-circle");
            masterSongName.innerText = songs[idx].songName;


        }
        else{
            

            if(masterSongName.innerText == songs[idx].songName){
                audioElement.pause();
                gif.style.opacity=0;
                e.target.classList.remove("fa-pause-circle");
                e.target.classList.add("fa-play-circle");
                masterPlay.classList.remove("fa-pause-circle");
                masterPlay.classList.add("fa-play-circle");
            }
            else{
                makeAllPlays();
                audioElement.pause();
                e.target.classList.remove("fa-play-circle");
                e.target.classList.add("fa-pause-circle");
                idx = parseInt(e.target.id);
                audioElement.src = `songs/${idx}.mp3`;
                audioElement.currentTime=0;
                audioElement.play();
                gif.style.opacity=1;
                masterPlay.classList.remove("fa-play-circle");
                masterPlay.classList.add("fa-pause-circle");
                masterSongName.innerText = songs[idx].songName;

            }
            
        }
        

    })
});


masterPlay.addEventListener('click',()=>{
    
    let i = parseInt(audioElement.src.indexOf("songs"))+6;
    let k = document.getElementById(audioElement.src.charAt(i));
    if(audioElement.paused || audioElement.currentTime==0){
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        k.classList.remove("fa-play-circle");
        k.classList.add("fa-pause-circle");
    }
    else{
        audioElement.pause();
        gif.style.opacity=0;
        masterPlay.classList.remove("fa-pause-circle");
        masterPlay.classList.add("fa-play-circle");
        k.classList.remove("fa-pause-circle");
        k.classList.add("fa-play-circle");
    }
})

audioElement.addEventListener('timeupdate',()=>{
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
    
})

myProgressBar.addEventListener('change',()=>{
    let v = myProgressBar.value;
    audioElement.currentTime = v*audioElement.duration/100;
})

document.getElementById("next").addEventListener('click',()=>{
    let idx = audioElement.src.indexOf("songs")+6;
    // console.log("as per me index - " + idx);
    // console.log("as per it index - " + audioElement.src.lastIndexOf("0"));
    // console.log(audioElement.src.charAt(idx).toString());
    // console.log(audioElement.src);  
    
    // console.log(document.getElementById(audioElement.src.charAt(idx)));
    document.getElementById(audioElement.src.charAt(idx)).classList.remove("fa-pause-circle");
    document.getElementById(audioElement.src.charAt(idx)).classList.add("fa-play-circle");
    let no = audioElement.src.charAt(idx);
    if(no==7)no='0';
    else ++no;
    // console.log(no);
    // console.log("character increment"+ ++no);
    let v= "0";
    let k = document.getElementById(no);
            audioElement.src = `songs/${no}.mp3`;
            audioElement.currentTime=0;
            audioElement.play();
            gif.style.opacity=1;
            masterPlay.classList.remove("fa-play-circle");
            masterPlay.classList.add("fa-pause-circle");
            masterSongName.innerText = songs[no].songName;
            //console.log("k="+k);
            k.classList.remove("fa-play-circle");
            k.classList.add("fa-pause-circle");
})

document.getElementById("previous").addEventListener('click',()=>{
    let idx = parseInt(audioElement.src.indexOf("songs"))+6;
    document.getElementById(audioElement.src.charAt(idx)).classList.remove("fa-pause-circle");
    document.getElementById(audioElement.src.charAt(idx)).classList.add("fa-play-circle");
    let no = audioElement.src.charAt(idx);
    if(no==0)no=7;
    else --no;
    let k = document.getElementById(no);


            audioElement.src = `songs/${no}.mp3`;
            audioElement.currentTime=0;
            audioElement.play();
            gif.style.opacity=1;
            masterPlay.classList.remove("fa-play-circle");
            masterPlay.classList.add("fa-pause-circle");
            masterSongName.innerText = songs[no].songName;
            k.classList.remove("fa-play-circle");
            k.classList.add("fa-pause-circle");
})

audioElement.addEventListener('ended',()=>{
    let i = parseInt(audioElement.src.indexOf("songs"))+2;
    document.getElementById(i).classList.remove("fa-pause-circle");
    document.getElementById(i).classList.add("fa-play-circle");
    if(i>6)i=0;
    else i++;
    let k = document.getElementById(i);
           

            audioElement.src = `songs/${i}.mp3`;
            audioElement.currentTime=0;
            audioElement.play();
            gif.style.opacity=1;
            masterPlay.classList.remove("fa-play-circle");
            masterPlay.classList.add("fa-pause-circle");
            masterSongName.innerText = songs[i].songName; 
            k.classList.remove("fa-play-circle");
            k.classList.add("fa-pause-circle");
    
})