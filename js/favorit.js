const clubData = [
  { id: "1", name: "Everton FC"},
  { id: "2", name: "Liverpool FC"},
  { id: "3", name: "Aston Villa FC"},
  { id: "4", name: "Leicester City FC"},
  { id: "5", name: "Tottenham Hotspur FC"},
  { id: "6", name: "Leeds United FC"},
  { id: "7", name: "Southampton FC"},
  { id: "8", name: "Crystal Palace FC"},
  { id: "9", name: "Wolverhampton Wanderers FC"},
  { id: "10", name: "Chelsea FC"},
  { id: "11", name: "Arsenal FC"},
  { id: "12", name: "West Ham United FC"},
  { id: "13", name: "Manchester City FC"},
  { id: "14", name: "Newcastle United FC"},
  { id: "15", name: "Manchester United FC"},
  { id: "16", name: "Brighton & Hove Albion FC"},
  { id: "17", name: "West Bromwich Albion FC"},
  { id: "18", name: "Burnley FC"},
  { id: "19", name: "Sheffield United FC"},
  { id: "20", name: "Fulham FC"},
];

const dbPromise = idb.open("favourite", 1, function(upgradeDb) {
  if (!upgradeDb.objectStoreNames.contains("clubs")) {
    upgradeDb.createObjectStore("clubs");
    upgradeDb.createObjectStore("fav");
    for (let i=0; i<clubData.length; i++) {
      addData(clubData[i], 'clubs');
    }
    console.log("inisialisasi berhasil");
  }
});

function addData(data, dest) {
  dbPromise.then(function(db) {
    const tx = db.transaction(dest, 'readwrite');
    const store = tx.objectStore(dest);
  
    store.add(data.name, data.id);
    return tx.complete;
  }).then(function() {
    console.log('Klub favorit berhasil ditambahkan.');
  }).catch(function() {
    console.log('Penambahan gagal.');
  })
}

function readData(id, src) {
  dbPromise.then(function(db) {
    const tx = db.transaction(src, 'readonly');
    const store = tx.objectStore(src);
    // mengambil primary key berdasarkan isbn
    return store.get(id); 
  }).then(function(val) {
    console.dir(val);
  });
}

function getAllFavs() {
  dbPromise.then(function(db) {
    const tx = db.transaction('fav', 'readonly');
    const store = tx.objectStore('fav');

    const items = store.getAll();

    return items;
  }).then(function(items) {
    showClubs(items);
  });
}

function deleteData(id, src) {
  dbPromise.then(function(db) {
    const tx = db.transaction(src, 'readwrite');
    const store = tx.objectStore(src);
    store.delete(id);
    return tx.complete;
  }).then(function() {
    console.log('Item deleted');
  });
}

function showClubs(items) {
  let shownClub = [];

  console.log(items);
  for (let i=0; i<clubData.length; i++) {
    let flag = 0;

    for (let j=0; j<items.length; j++) {
      if (clubData[i].name === items[j]) {
        flag = 1;
        break;
      }
    }

    if (flag == 0) {
      shownClub.push(clubData[i]);
    }
  } 

  // for (let i=0; i<shownClub.length; i++) {
  //   console.log(shownClub[i]);
  // }

  let selectHTML = `
    <div><h5>Tambah Klub Favorit</h5></div>
    <div class="input-field col s12">
      <select id="selectClub">
        <option value="" disabled selected>Pilih Klub</option>   
  `;
  
  shownClub.forEach(function(club) {
    selectHTML += `
      <option value="${club.id}">${club.name}</option>
    `;
  });
  selectHTML += `
      </select>
    </div>
    <button class="btn waves-effect waves-light" type="submit" id="btnFav" onclick="addFav()">Tambah</button>
  `;
  // Sisipkan komponen card ke dalam elemen dengan id #content

  let listHTML = `
    <br><br><div><h5>Daftar Klub Favorit</h5></div>
    <table class="highlight">
      <thead>
        <tr>
          <th>No</th>
          <th>Klub</th>
          <th>Aksi</th>
        </tr>
      </thead>

    <tbody>
  `;

  
  for (let j=0; j<items.length; j++) {
    listHTML += `
      <tr>
        <td>${j+1}</td>
        <td>${items[j]}</td>
        <td><button class="btn waves-effect waves-light red darken-4" type="submit" id="btnFav" onclick="delFav('${items[j]}')">Hapus</button></td>
      </tr>
    `;
  }

  listHTML += `
    </tbody>
  </table>
  `;
  document.getElementById("body-content").innerHTML = selectHTML + listHTML;

  const elems = document.querySelectorAll('select');
  const instances = M.FormSelect.init(elems);
}

function addFav() {
  const e = document.getElementById("selectClub");
  const selected = e.options[e.selectedIndex];

  addData({ id: selected.value, name: selected.innerHTML}, 'fav');

  location.reload();
}

function delFav(name) {
  let id = null;
  for (let i=0; i<20; i++) {
    if(clubData[i].name === name) {
      deleteData((i+1).toString(), 'fav');
      break;
    }  
  }

  location.reload();
}