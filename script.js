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
            const folderBase2 = folderBase + "/" + i + "/"
            const variantName = i.pretty
            const variantFolder = i.folder

            for (j = 1; j < 4; j++) {
                var filename = folderBase2 + filenameBase + "_" + j + variantFolder + ".wav"

                const cellData = pretty + " " + variantName + j;
                var cell = document.createElement('td');
                cell.setAttribute("id", cellData);
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
