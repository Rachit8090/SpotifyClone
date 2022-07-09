console.log("Welcome To Spotify");

//variables
let songIndex=0;
let audioElement=new Audio('songs/1.mp3');
let playbtn=document.getElementById('masterPlay');
let myprogressbar=document.getElementById('ProgressBar');
let gificon=document.getElementById('gifcon');
let headersong=document.getElementById('headingsong');
let songItems=Array.from(document.getElementsByClassName('songItem'));   //bcz it is a html collection
// create songs object containing img song name and file path
let songs=[
    {songName:"Toofan-KGF2",filePath:"songs/1.mp3",coverPath:"covers/1.jpg"},
    {songName:"Pasoori- Ash Gill",filePath:"songs/2.mp3",coverPath:"covers/2.jpg"},
    {songName:"HumDum - Shiddat",filePath:"songs/3.mp3",coverPath:"covers/3.jpg"},
    {songName:"Nain Ta Heere",filePath:"songs/4.mp3",coverPath:"covers/4.jpg"},
    {songName:"Rangsaari",filePath:"songs/5.mp3",coverPath:"covers/5.jpg"},
    {songName:"AAshiqui AGayi",filePath:"songs/6.mp3",coverPath:"covers/6.jpg"},
    {songName:"Jaan Hai Meri",filePath:"songs/7.mp3",coverPath:"covers/7.jpg"},
    {songName:"Paint It Red-Ik Zunoon",filePath:"songs/8.mp3",coverPath:"covers/8.jpg"}
];

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.currentTime = 0;
        audioElement.src = `songs/${songIndex+1}.mp3`;
        audioElement.play();
        headersong.innerText=songs[songIndex].songName;
        playbtn.classList.remove('fa-circle-play');
        playbtn.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    })
})


//listen to events by variables
//handle play pause of songs

playbtn.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime==0)
    {
        audioElement.play();
        //chaneg icon also
        gificon.style.opacity=1;
        playbtn.classList.remove('fa-circle-play');
        playbtn.classList.add('fa-circle-pause');
        gificon.style.opacity=1;
        
    }
    else
    {
        audioElement.pause();
        playbtn.classList.remove('fa-circle-pause');
        playbtn.classList.add('fa-circle-play');
        gificon.style.opacity=0;
    }

})
audioElement.addEventListener('timeupdate',()=>{
    console.log("time update");
    //update seekbar
    progress=parseInt(100*(audioElement.currentTime/audioElement.duration));
    //console.log(progress);
    myprogressbar.value=progress;
})

myprogressbar.addEventListener('change',()=>{
    audioElement.currentTime=((myprogressbar.value*audioElement.duration)/100);
})

//listen events of next btn
document.getElementById('nextbtn').addEventListener('click',()=>{
    if(songIndex<=8)
    {
       songIndex++;
    }
    else if(songIndex>8)
    {
        songIndex=0;
    }
    audioElement.currentTime = 0;
    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.play();
    headersong.innerText=songs[songIndex].songName;
    playbtn.classList.remove('fa-circle-play');
    playbtn.classList.add('fa-circle-pause');

})

document.getElementById('previousbtn').addEventListener('click',()=>{
    if(songIndex>=8)
    {
       songIndex--;
    }
    else if(songIndex<0)
    {
        songIndex=0;
    }
    audioElement.currentTime = 0;
    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.play();
    headersong.innerText=songs[songIndex].songName;
    playbtn.classList.remove('fa-circle-play');
    playbtn.classList.add('fa-circle-pause');

})
