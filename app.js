function app (){
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const video = document.querySelector('.vid');
    const outline = document.querySelector('.moving-outline circle');

    const sounds = document.querySelectorAll('.plyer-section button');

    const displayTime = document.querySelector('.time');

    const timeSelect = document.querySelectorAll('.time-select button');

    let outlineLength = outline.getTotalLength();

    outline.style.strokeDasharray = outlineLength
    outline.style.strokeDashoffset = outlineLength

    let fakeDaraction = 600;
    
    play.addEventListener('click', () => {
        checkSong(song)
    })

    timeSelect.forEach(option => {
        option.addEventListener('click', function(){
            fakeDaraction = this.getAttribute('data-time');
            displayTime.textContent = `${Math.floor(fakeDaraction / 60)}:${Math.floor(fakeDaraction % 60)}`;
        })
    })

    sounds.forEach(sound => {
        sound.addEventListener('click', function(){
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            checkSong(song);
            for(i = 0; i < sounds.length; i++){
                sounds[i].className = sounds[i].className.replace('active', '')
            }
            this.classList.add('active');
            // if(this.classList.contains('active')){
            //     this.style.opacity = '1'
            // }
        })
    })

    const checkSong = song => {
        if(song.paused){
            song.play();
            play.src = './svg/pause.svg'
            video.play()
        }else{
            song.pause();
            play.src = './svg/play.svg';
            video.pause();
        }
    }

    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = fakeDaraction - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes  = Math.floor(elapsed / 60);

        let progress = outlineLength - (currentTime / fakeDaraction) * outlineLength;
        outline.style.strokeDashoffset = progress;

        displayTime.textContent = `${minutes}:${seconds}`;

        if(currentTime >= fakeDaraction){
            song.pause();
            song.currentTime = 0;
            play.src = './svg/pause.svg';
            video.pause();
        }
        
    }
}


app();