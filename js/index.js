// html5media enables <video> and <audio> tags in all major browsers
// External File: http://api.html5media.info/1.1.8/html5media.min.js


// Add user agent as an attribute on the <html> tag...
// Inspiration: http://css-tricks.com/ie-10-specific-styles/
var b = document.documentElement;
b.setAttribute('data-useragent', navigator.userAgent);
b.setAttribute('data-platform', navigator.platform);


// HTML5 audio player + playlist controls...
// Inspiration: http://jonhall.info/how_to/create_a_playlist_for_html5_audio
// Mythium Archive: https://archive.org/details/mythium/
jQuery(function ($) {
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        var index = 0,
            playing = false,
            mediaPath = '//archive.org/download/Teresa_Baudin/',
            extension = '',
            tracks = [{
                "track": 1,
                "name": "Infancia - Teresa Baudin",
                "length": "02:46",
                "file": "01"
            }, {
                "track": 2,
                "name": "Córdoba Mía Córdoba Azul",
                "length": "08:31",
                "file": "02"
            }, {
                "track": 3,
                "name": "Dolor",
                "length": "05:02",
                "file": "03"
            }, {
                "track": 4,
                "name": "El Llamado",
                "length": "08:32",
                "file": "04"
            }, {
                "track": 5,
                "name": "M'echaron del puesto",
                "length": "05:05",
                "file": "05"
            }, {
                "track": 6,
                "name": "El Overo",
                "length": "02:49",
                "file": "06"
            }, {
                "track": 7,
                "name": "El Remate",
                "length": "05:45",
                "file": "07"
            }, {
                "track": 8,
                "name": "Pintame Angelito Negros",
                "length": "05:27",
                "file": "08"
            }, {
                "track": 9,
                "name": "Que doloroso es amar",
                "length": "05:46",
                "file": "09"
            }, {
                "track": 10,
                "name": "Romance de la luna luna",
                "length": "05:25",
                "file": "10"
            }, {
                "track": 11,
                "name": "Profecía",
                "length": "05:54",
                "file": "11"
            }, {
                "track": 12,
                "name": "Qué Lástima",
                "length": "04:41",
                "file": "12"
            }],
            trackCount = tracks.length,
            npAction = $('#npAction'),
            npTitle = $('#npTitle'),
            audio = $('#audio1').bind('play', function () {
                playing = true;
                npAction.text('Now Playing...');
            }).bind('pause', function () {
                playing = false;
                npAction.text('Paused...');
            }).bind('ended', function () {
                npAction.text('Paused...');
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    audio.play();
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }).get(0),
            btnPrev = $('#btnPrev').click(function () {
                if ((index - 1) > -1) {
                    index--;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            btnNext = $('#btnNext').click(function () {
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            li = $('#plList li').click(function () {
                var id = parseInt($(this).index());
                if (id !== index) {
                    playTrack(id);
                }
            }),
            loadTrack = function (id) {
                $('.plSel').removeClass('plSel');
                $('#plList li:eq(' + id + ')').addClass('plSel');
                npTitle.text(tracks[id].name);
                index = id;
                audio.src = mediaPath + tracks[id].file + extension;
            },
            playTrack = function (id) {
                loadTrack(id);
                audio.play();
            };
        extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
        loadTrack(index);
    }
});