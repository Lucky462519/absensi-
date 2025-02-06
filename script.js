// Mengambil data absensi dari localStorage saat halaman dimuat
let absensiData = JSON.parse(localStorage.getItem('absensiData')) || [];

// Fungsi untuk menambah absensi baru
function tambahAbsen() {
    const nama = document.getElementById('nama').value;
    const status = document.getElementById('status').value;
    const keterangan = document.getElementById('keterangan').value;
    
    if (!nama) {
        alert('Nama harus diisi!');
        return;
    }

    const date = new Date();
    const tanggal = date.toLocaleDateString('id-ID');
    const waktu = date.toLocaleTimeString('id-ID');

    const absensi = {
        id: Date.now(),
        nama,
        tanggal,
        waktu,
        status,
        keterangan
    };

    absensiData.push(absensi);
    simpanData();
    tampilkanData();
    bersihkanForm();
}

// Fungsi untuk menampilkan data
function tampilkanData() {
    const absenList = document.getElementById('absenList');
    absenList.innerHTML = '';

    absensiData.forEach((absen, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${absen.nama}</td>
            <td>${absen.tanggal}</td>
            <td>${absen.waktu}</td>
            <td>${absen.status}</td>
            <td>${absen.keterangan || '-'}</td>
            <td>
                <button class="delete-btn" onclick="hapusAbsen(${absen.id})">Hapus</button>
            </td>
        `;
        absenList.appendChild(row);
    });
}

// Fungsi untuk menghapus absensi
function hapusAbsen(id) {
    if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
        absensiData = absensiData.filter(absen => absen.id !== id);
        simpanData();
        tampilkanData();
    }
}

// Fungsi untuk menyimpan data ke localStorage
function simpanData() {
    localStorage.setItem('absensiData', JSON.stringify(absensiData));
}

// Fungsi untuk membersihkan form
function bersihkanForm() {
    document.getElementById('nama').value = '';
    document.getElementById('status').value = 'Hadir';
    document.getElementById('keterangan').value = '';
}

// Menampilkan data saat halaman dimuat
tampilkanData();