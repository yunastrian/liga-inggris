const base_url = "https://api.football-data.org/v2/competitions/2021/";

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}
// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}
// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}
// Blok kode untuk melakukan request data json
function getAbout() {
  if ('caches' in window) {
    caches.match(base_url).then(function(response) {
      if (response) {
        response.json().then(function (data) {
          let aboutHTML = "";
          aboutHTML += `
            <div class="card">
              <div class="card-content">
                <span class="card-title truncate">${data.name}</span>
                <p>Matchday sekarang: ${data.currentSeason.currentMatchday}</p>
                <p>Tanggal mulai: ${data.currentSeason.startDate}</p>
                <p>Tanggal rencana selesai: ${data.currentSeason.endDate}</p>
              </div>
              <div class="card-action">
                <a href="./klasemen.html">Lihat Klasemen</a>
              </div>
            </div>
          `;
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("about").innerHTML = aboutHTML;
        });
      }
    })
  }

  fetch(base_url, {
    headers: {
      'X-Auth-Token': 'f2840543f4614bb7b9fcdc907b177975'
    },
  })
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.
      // Menyusun komponen card artikel secara dinamis
      let aboutHTML = "";
      aboutHTML += `
        <div class="card">
          <div class="card-content">
            <span class="card-title truncate">${data.name}</span>
            <p>Matchday sekarang: ${data.currentSeason.currentMatchday}</p>
            <p>Tanggal mulai: ${data.currentSeason.startDate}</p>
            <p>Tanggal rencana selesai: ${data.currentSeason.endDate}</p>
          </div>
          <div class="card-action">
            <a href="./klasemen.html">Lihat Klasemen</a>
          </div>
        </div>
      `;
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("about").innerHTML = aboutHTML;
    })
    .catch(error);
}

function getKlasemen() {
  if ('caches' in window) {
    caches.match(base_url + '/standings').then(function(response) {
      if (response) {
        response.json().then(function (data) {
          let klasemenHTML = `
            <table class="highlight">
            <thead>
              <tr>
                  <th>Posisi</th>
                  <th>Tim</th>
                  <th>Poin</th>
              </tr>
            </thead>

            <tbody>
          `;
          data.standings[0].table.forEach(function(team) {
            klasemenHTML += `
            <tr>
              <td>${team.position}</td>
              <td>${team.team.name}</td>
              <td>${team.points}</td>
            </tr>
            `;
          });
          klasemenHTML += `
              </tbody>
            </table>
          `;
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("body-content").innerHTML = klasemenHTML;
        });
      }
    })
  }

  fetch(base_url + '/standings', {
    headers: {
      'X-Auth-Token': 'f2840543f4614bb7b9fcdc907b177975'
    },
  })
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.
      // Menyusun komponen card artikel secara dinamis
      let klasemenHTML = `
        <table class="highlight">
        <thead>
          <tr>
              <th>Posisi</th>
              <th>Tim</th>
              <th>Poin</th>
          </tr>
        </thead>

        <tbody>
      `;
      data.standings[0].table.forEach(function(team) {
        klasemenHTML += `
        <tr>
          <td>${team.position}</td>
          <td>${team.team.name}</td>
          <td>${team.points}</td>
        </tr>
        `;
      });
      klasemenHTML += `
          </tbody>
        </table>
      `;
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("body-content").innerHTML = klasemenHTML;
    })
    .catch(error);
}