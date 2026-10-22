
// 1. Ambil elemen dari HTML
const form = document.querySelector('#formDaftar');
const fields = form.querySelectorAll('input');
const tanggal = document.querySelector('#tanggal');
const statusForm = document.querySelector('#statusForm');

// 2. Daftar pesan error
const pesan = {
    nama: {
        kosong: 'Nama wajib diisi.',
        pendek: 'Nama minimal 3 huruf.'
    },
    email: {
        kosong: 'Email wajib diisi.',
        format: 'Format email belum benar. Contoh: nama@domain.com'
    },
    hp: {
        kosong: 'Nomor WhatsApp wajib diisi.',
        format: 'Nomor diawali 08 dan terdiri dari 10–13 digit.'
    },
    tanggal: {
        kosong: 'Pilih tanggal kehadiran.',
        lampau: 'Tanggal paling cepat hari ini.'
    }
};

// 3. Menampilkan pesan error
function showError(input, teks) {
    input.classList.add('is-invalid');
    input.setAttribute('aria-invalid', 'true');

    document.getElementById(input.id + '-error').textContent = teks;

    return false;
}

// Menghapus pesan error
function clearError(input) {
    input.classList.remove('is-invalid');
    input.removeAttribute('aria-invalid');

    document.getElementById(input.id + '-error').textContent = '';

    return true;
}

// 4. Memeriksa setiap input
function cekField(input) {
    const v = input.validity;
    const p = pesan[input.id];

    if (input.value.trim() === '') {
        return showError(input, p.kosong);
    }

    if (v.tooShort) {
        return showError(input, p.pendek);
    }

    if (v.typeMismatch || v.patternMismatch) {
        return showError(input, p.format);
    }

    if (v.rangeUnderflow) {
        return showError(input, p.lampau);
    }

    return clearError(input);
}

// Memeriksa semua input
function semuaFieldValid() {
    let valid = true;

    for (const input of fields) {
        if (!cekField(input)) {
            valid = false;
        }
    }

    return valid;
}

// 5. Menentukan tanggal minimal hari ini
function hariIni() {
    const d = new Date();

    const bulan = String(d.getMonth() + 1).padStart(2, '0');
    const tgl = String(d.getDate()).padStart(2, '0');

    return d.getFullYear() + '-' + bulan + '-' + tgl;
}

tanggal.min = hariIni();

// 6. Memeriksa input saat ditinggalkan
function saatBlur(event) {
    cekField(event.target);
}

for (const input of fields) {
    input.addEventListener('blur', saatBlur);
}

// 7. Memeriksa form saat tombol Daftar ditekan
function saatSubmit(event) {
    event.preventDefault();

    statusForm.className = '';
    statusForm.textContent = '';

    if (!semuaFieldValid()) {
        form.querySelector('[aria-invalid="true"]').focus();
        return;
    }

    statusForm.textContent =
        'Pendaftaran berhasil! Sampai jumpa di workshop.';

    statusForm.className = 'alert alert-success mt-3';

    form.reset();
}

form.addEventListener('submit', saatSubmit);
