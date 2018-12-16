window.audioFiles = [];
window.startTimeMs = 0;
window.audioDurationMs = 0;

function shouldPlay(i) {
    //TODO
    return true;
}

function getCurrentLoopTime() {
    //TODO return ((Date.now() - window.startTimeMs) % window.audioDurationMs) / 1000;
    return 0;
}

function playAudio() {
    var arrayLength = window.audioFiles.length;
    for (var i = 0; i < arrayLength; i++) {
        var audioFile = window.audioFiles[i];
        if (! shouldPlay(i)) {
            audioFile.pause();
        } else {
            audioFile.currentTime = getCurrentLoopTime();;
            audioFile.play();
        }
    }
}

function isAllAudioLoaded() {
    var arrayLength = window.audioFiles.length;
    for (var i = 0; i < arrayLength; i++) {
        if (! (window.audioFiles[i].readyState == 4 /*HAVE_ENOUGH_DATA*/ )) {
            return false;
        }
    }
    return true;
}
function audioLoadedCallback() {
    if(isAllAudioLoaded()) {
        console.log("Audio: all loaded.");
        startTimeMs = Date.now();
        audioDurationMs = window.audioFiles[0].duration;
        playAudio();
        return;
    }
    console.log("Audio: still loading.");
}
function createAudio(filename) {
    var audio = new Audio(filename);
    audio.loop = true;
    audio.preload = true;
    audio.oncanplaythrough=function(){
        audioLoadedCallback();
        console.log(filename + " has finished loading.");
    };
    return audio;
}
function createTable() {
    var table = document.createElement('table');
    var tableBody = document.createElement('tbody');
    const instrumentNamesToFolderName =
        [
            {folder:"p1", filename:"1", pretty:"Drums"},
            {folder:"p2", filename:"2", pretty:"Bass"},
            {folder:"p3", filename:"3", pretty:"Pads"},
            {folder:"p4", filename:"4", pretty:"Leads"},
        ];
    const variants = 
        [
            {folder:"C", pretty:"A"},
            {folder:"D", pretty:"B"},
        ];

    instrumentNamesToFolderName.forEach(function(i) {
        const folderBase = "assets/" + i.folder;
        const filenameBase = i.filename;
        const pretty = i.pretty;

        var row = document.createElement('tr');
        variants.forEach(function(i) {
            const variantName = i.pretty
            const variantFolder = i.folder
            const folderBase2 = folderBase + "/" + variantFolder + "/"

            for (j = 1; j < 4; j++) {
                var filename = folderBase2 + filenameBase + "_" + j + variantFolder + ".wav"

                const cellData = pretty + " " + variantName + j;
                var cell = document.createElement('td');
                cell.setAttribute("id", cellData);
                cell.setAttribute("filename", filename);
                window.audioFiles.push(createAudio(filename));
                cell.appendChild(document.createTextNode(cellData));
                row.appendChild(cell);
            }

        });
        tableBody.appendChild(row);
    });

    table.appendChild(tableBody);
    document.body.appendChild(table);
}

createTable();
