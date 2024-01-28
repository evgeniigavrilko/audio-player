document.addEventListener("DOMContentLoaded", function () {
  const audio = document.getElementById("audio");
  const playPauseBtn = document.getElementById("playPauseBtn");
  const seekBar = document.getElementById("seekBar");
  const volumeBar = document.getElementById("volumeBar");
  const artistInfo = document.getElementById("artist");
  const trackInfo = document.getElementById("track");
  const cover = document.getElementById("audioCover");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const repeatBtn = document.getElementById("repeatBtn");
  const currentTimeDisplay = document.getElementById("currentTime");

  let isPlaying = false;
  let isRepeating = false;

  const tracks = [
    {
      artist: "Sounds of Nature",
      track: "Alps",
      coverSrc: "./assets/img/alps.webp",
      audioSrc: "./assets/audio/alps.ogg",
    },
    {
      artist: "Sounds of Nature",
      track: "Village",
      coverSrc: "./assets/img/village.webp",
      audioSrc: "./assets/audio/village.ogg",
    },
    {
      artist: "Sounds of Nature",
      track: "Beach",
      coverSrc: "./assets/img/beach.webp",
      audioSrc: "./assets/audio/beach.ogg",
    },
    {
      artist: "Sounds of Nature",
      track: "Jungle",
      coverSrc: "./assets/img/jungle.webp",
      audioSrc: "./assets/audio/jungle.ogg",
    },
    {
      artist: "Sounds of Nature",
      track: "Lake",
      coverSrc: "./assets/img/lake.webp",
      audioSrc: "./assets/audio/lake.ogg",
    },
    {
      artist: "Sounds of Nature",
      track: "Bonfire",
      coverSrc: "./assets/img/bonfire.webp",
      audioSrc: "./assets/audio/bonfire.ogg",
    },
    {
      artist: "Sounds of Nature",
      track: "Purring",
      coverSrc: "./assets/img/purring.webp",
      audioSrc: "./assets/audio/purring.ogg",
    },
    {
      artist: "Sounds of Nature",
      track: "Birds",
      coverSrc: "./assets/img/birds.webp",
      audioSrc: "./assets/audio/birds.ogg",
    },
    {
      artist: "Sounds of Nature",
      track: "Cicadas",
      coverSrc: "./assets/img/cicadas.webp",
      audioSrc: "./assets/audio/cicadas.ogg",
    },
    {
      artist: "Sounds of Nature",
      track: "Rain",
      coverSrc: "./assets/img/rain.webp",
      audioSrc: "./assets/audio/rain.ogg",
    },
    {
      artist: "Sounds of Nature",
      track: "Wind",
      coverSrc: "./assets/img/wind.webp",
      audioSrc: "./assets/audio/wind.ogg",
    },
    {
      artist: "Sounds of Nature",
      track: "Blizzard",
      coverSrc: "./assets/img/blizzard.webp",
      audioSrc: "./assets/audio/blizzard.ogg",
    },
    {
      artist: "Sounds of Nature",
      track: "Thunderstorm",
      coverSrc: "./assets/img/thunderstorm.webp",
      audioSrc: "./assets/audio/thunderstorm.ogg",
    },
    {
      artist: "Sounds of Nature",
      track: "Sandstorm",
      coverSrc: "./assets/img/sandstorm.webp",
      audioSrc: "./assets/audio/sandstorm.ogg",
    },
  ];

  let currentTrackIndex = 0;

  function loadTrack(index) {
    const currentTrack = tracks[index];
    artistInfo.textContent = currentTrack.artist;
    trackInfo.textContent = currentTrack.track;
    cover.src = currentTrack.coverSrc;
    audio.src = currentTrack.audioSrc;
  }

  loadTrack(currentTrackIndex);

  let previousSeekBarValue = 0;

  audio.addEventListener("timeupdate", function () {
    const currentTime = formatTime(audio.currentTime);
    const duration = isNaN(audio.duration) ? "0:00" : formatTime(audio.duration);
    currentTimeDisplay.textContent = `${currentTime} / ${duration}`;

    if (!isPlaying) {
      return;
    }

    const seekBarValue = (audio.currentTime / audio.duration) * 100;
    seekBar.value = seekBarValue;
  });

  audio.addEventListener("play", function () {
    seekBar.value = previousSeekBarValue;
  });

  audio.addEventListener("pause", function () {
    previousSeekBarValue = seekBar.value;
  });

  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    return formattedTime;
  }

  playPauseBtn.addEventListener("click", togglePlayPause);
  seekBar.addEventListener("input", updateSeekBar);
  volumeBar.addEventListener("input", updateVolume);
  prevBtn.addEventListener("click", playPrevious);
  nextBtn.addEventListener("click", playNext);
  repeatBtn.addEventListener("click", toggleRepeat);

  function togglePlayPause() {
    isPlaying = !isPlaying;

    const playPauseIcon = document.getElementById("playPauseBtn").querySelector("span");

    if (isPlaying) {
      audio.play();
      playPauseIcon.classList.remove("icon-play3");
      playPauseIcon.classList.add("icon-pause2");
    } else {
      audio.pause();
      playPauseIcon.classList.remove("icon-pause2");
      playPauseIcon.classList.add("icon-play3");
    }
  }

  function updateSeekBar() {
    const seekTime = (audio.duration / 100) * seekBar.value;
    audio.currentTime = seekTime;
  }

  function updateVolume() {
    audio.volume = volumeBar.value / 100;
  }

  function playPrevious() {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) {
      audio.play();
    }
  }

  function playNext() {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) {
      audio.play();
    }
  }

  function toggleRepeat() {
    isRepeating = !isRepeating;
    audio.loop = isRepeating;

    const repeatIcon = document.getElementById("repeatBtn").querySelector("span");

    if (isRepeating) {
      repeatIcon.style.color = "#7c0a84";
    } else {
      repeatIcon.style.color = "";
    }
  }

  audio.addEventListener("ended", function () {
    if (isRepeating) {
      audio.play();
    } else {
      playNext();
    }
  });
});