const { antrian, kirim, listButton, sendButton, maps } = require('./cloudAPI.js')

const express = require('express')
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.json());
const port = 3000
const { json } = require('body-parser')
var base_url = `https://villages-phase-norfolk-corrected.trycloudflare.com/`

app.post('/api/webhook', async (req, res) => {
  let body_param = req.body
  const pushname = body_param.conversation.messages[0].sender.name
  const inbox = body_param.conversation.contact_inbox.inbox_id
  const chat = body_param.conversation.messages[0].content
  const from = body_param.conversation.contact_inbox.source_id
  const idMsg = body_param.conversation.messages[0].source_id
  if (inbox == "34493") {
    console.log(JSON.stringify(pushname, null, 2))
    try {
      switch (chat.toLowerCase()) {
        case "info":
          listButton(from, `Bapak/Ibu ${pushname} yang Kami hormati, Silahkan klik tombol berikut untuk melihat layanan!`);
          break;
        case "profile":
          maps(from)
          break;
        case "jadwal sidang":
          kirim(from, '[CONTENT JADWAL SIDANG]');
          break;
        case "tilang":
          kirim(from, '[CONTENT TILANG]');
          break;
        case "layanan":
          kirim(from, `Bapak/Ibu ${pushname}, Pengadilan Negeri Bulukumba telah melaksanakan Sistem Pelayanan Terpadu Satu Pintu (PTSP). Seluruh pelayanan publik dilakukan pada ruang Pelayanan Terpadu Satu Pintu (PTSP) Pengadilan Negeri Bulukumba

Terdapat 6 meja pelayanan yang dibuka, yaitu:
1. PERDATA\nMelayani segala pelayanan publik yang menjadi tupoksi Kepaniteraan Perdata. Pelayanan publik tersebut antara lain : pendaftaran perkara perdata, permohonan, gugatan.  
Untuk mengetahui lebih rinci pada pelayanan perdata klik link  e-Brosur dibawah ini
https://drive.google.com/file/d/1XxR8vXMcZd0Qx4HysKHLv3YrprfFh-AN/view
        
2. PIDANA\nMelayani segala pelayanan publik yang menjadi tupoksi Kepaniteraan Pidana. Pelayanan publik tersebut antara lain : pendaftaran perkara pidana biasa, praperadilan, dsb.
Untuk mengetahui lebih rinci pada pelayanan pidana klik link  e-Brosur dibawah ini
https://drive.google.com/file/d/1et0qy5E_F50P5LX7pe9ws1g791RQJBAN/view
        
3. HUKUM\nMeja Hukum melayani segala pelayanan publik yang menjadi tupoksi Kepaniteraan Hukum. Pelayanan publik tersebut antara lain : pembuatan surat keterangan, pendaftaran badan hukum, pendaftaran surat kuasa, dan Pengaduan terhadap aparat peradilan, termasuk bantuan dalam penggunaan aplikasi SIWAS oleh masyarakat.
Untuk mengetahui lebih rinci pada pelayanan hukum klik link  e-Brosur dibawah ini
https://drive.google.com/file/d/1CHhYD3oiat67ll4Esf6nCQDGYdMDZVML/view
                
4. UMUM\nmelayani segala pelayanan publik yang menjadi tupoksi sub bagian umum dan keuangan. Pelayanan publik tersebut antara lain : pelayanan surat masuk dan surat keluar.

5. e-cOURT\nmelayani segala pelayanan konsultasi yang berkaitan dengan Layanan e-Court dan e-Litigasi 
Untuk mengakses Layanan e-cOURT klik link dibawah ini
https://ecourt.mahkamahagung.go.id/Login

6. Meja Layanan Bantuan Hukum\nMelayani pelayanan konsultasi oleh Lembaga Bantuan Hukum 
`);
          break;
        case "posbakum":
          kirim(from, `Bapak/Ibu ${pushname}, 
Setiap orang atau sekelompok orang (Penggugat/ pemohon/ tergugat/ termohon/ terdakwa/ saksi) yang tidak mampu secara ekonomi dan / atau tidak memiliki akses pada informasi dan konsultasi hukum yang memerlukan layanan berupa pemberian informasi, konsultasi, advis hukum, atau bantuan pembuatan dokumen hukum yang dibutuhkan, dapat menerima layanan pada Pos bakum Pengadilan Negeri Bulukumba

Tidak mampu sebagaimana dimaksud di atas dibuktikan dengan melampirkan:

1. Surat Keterangan Tidak Mampu (SKTM) yang dikeluarkan oleh Kepala Desa/ Lurah/Kepala Wilayah setempat yang menyatakan “bahwa benar yang bersangkutan tidak mampu membayar biaya perkara”, atau

2. Surat Keterangan Tunjangan Sosial lainnya seperti :Kartu Keluarga Miskin (KKM), kartu Jaminan Kesehatan Masyarakat (Jamkesmas), Kartu Beras Miskin (raskin), Kartu Program Keluarga Harapan (PKH), Kartu Bantuan langsung Tunai (BLT), Kartu Perlindungan Sosial (KPS)atau dokumen lainnya yang berkaitan dengan daftar penduduk miskin dalam basis data terpadu pemerintah atau yang dikeluarkan oleh instansi lain yang berwenang memberikan keterangan tidak mampu, atau.

3. Surat pernyataan tidak mampu membayar jasa advokat yang dibuat dan ditandatangani oleh Pemohon layanan Posbakum Pengadilan dan disetujui oleh Petugas Posbakum Pengadilan, apabila Pemohon layanan Posbakum Pengadilan tidak memiliki dokumen sebagaimana disebut dalam huruf a atau b.

Selengkapnya dapat dilihat pada link berikut.
https://s.id/POSBAKUM`);
          break;
        case "pengaduan":
          kirim(from, `Bapak/Ibu ${pushname}, Tata Cara Pengaduan diatur dalam Peraturan Mahkamah Agung RI Nomor 9 Tahun 2016 Tentang PEDOMAN PENANGANAN PENGADUAN (WHISTLEBLOWING SYSTEM) DI MAHKAMAH AGUNG DAN BADAN PERADILAN YANG BERADA DIBAWAHNYA.

Pengaduan dapat disampaikan melalui:
a. Aplikasi SIWAS MA-RI pada situs Mahkamah Agung;
b. Layanan pesan singkat/SMS;
c. Surat elektronik (e-mail);
d. Faksimile;
e. Telepon
f. Meja Pengaduan;
g. Surat; dan/atau
h. Kotak Pengaduan.
        
Dalam hal Pengaduan diajukan secara lisan;
a. Pelapor datang menghadap sendiri ke PTSP Bagian Hukum, dan menyampaikan akan melakukan pengaduan dengan menunjukkan indentitas diri.
b. Petugas PTSP akan mengarahkan ke Ruangan Pengaduan dan dilayani oleh petugas Pengaduan
c. Petugas meja Pengaduan memasukkan laporan Pengaduan ke dalam aplikasi SIWAS MA-RI
d. Petugas meja Pengaduan memberikan nomor register Pengaduan kepada Pelapor guna memonitor tindak lanjut penanganan Pengaduan.
        
Selengkapnya bisa dilihat pada link berikut.
https://s.id/Pengaduan-PNBulukumba
`);
          break;
        case "ambil antrian":
          antrian(from, pushname)
          break;

        case "loket pidana":
          var request = require('request');
          var options = {
            'method': 'GET',
            'url': `${base_url}/antrian-pidana?wa=${from}`,
            'headers': {
            }
          };
          request(options, function(error, response) {
            if (error) throw new Error(error);
            const data = JSON.parse(response.body)
            const noAntrian = data.noAntrian
            const loket = data.loket
            const wa = data.wa
            listButton(from, `Halo ${pushname}, antrian berhasil dibuat!\n\nNomor antrian: *${noAntrian}*\nLoket: PIDANA\nWhatsApp: ${wa}`)
          });
          break;

        case "loket perdata":
          var request = require('request');
          var options = {
            'method': 'GET',
            'url': `${base_url}/antrian-perdata?wa=${from}`,
            'headers': {
            }
          };
          request(options, function(error, response) {
            if (error) throw new Error(error);
            const data = JSON.parse(response.body)
            const noAntrian = data.noAntrian
            const loket = data.loket
            const wa = data.wa
            listButton(from, `Halo ${pushname}, antrian berhasil dibuat!\n\nNomor antrian: *${noAntrian}*\nLoket: ${loket}\nWhatsApp: ${wa}`)
          });
          break;

        case "loket hukum":
          var request = require('request');
          var options = {
            'method': 'GET',
            'url': `${base_url}/antrian-hukum?wa=${from}`,
            'headers': {
            }
          };
          request(options, function(error, response) {
            if (error) throw new Error(error);
            const data = JSON.parse(response.body)
            const noAntrian = data.noAntrian
            const loket = data.loket
            const wa = data.wa
            listButton(from, `Halo ${pushname}, antrian berhasil dibuat!\n\nNomor antrian: *${noAntrian}*\nLoket: ${loket}\nWhatsApp: ${wa}`)
          });
          break;

        case "loket umum":
          var request = require('request');
          var options = {
            'method': 'GET',
            'url': `${base_url}/antrian-umum?wa=${from}`,
            'headers': {
            }
          };
          request(options, function(error, response) {
            if (error) throw new Error(error);
            const data = JSON.parse(response.body)
            const noAntrian = data.noAntrian
            const loket = data.loket
            const wa = data.wa
            listButton(from, `Halo ${pushname}, antrian berhasil dibuat!\n\nNomor antrian: *${noAntrian}*\nLoket: ${loket}\nWhatsApp: ${wa}`)
          });
          break;

        case "loket kasir":
          var request = require('request');
          var options = {
            'method': 'GET',
            'url': `${base_url}/antrian-kasir?wa=${from}`,
            'headers': {
            }
          };
          request(options, function(error, response) {
            if (error) throw new Error(error);
            const data = JSON.parse(response.body)
            const noAntrian = data.noAntrian
            const loket = data.loket
            const wa = data.wa
            listButton(from, `Halo ${pushname}, antrian berhasil dibuat!\n\nNomor antrian: *${noAntrian}*\nLoket: ${loket}\nWhatsApp: ${wa}`)
          });
          break;

        case "cek antrian":
          try {
            //sisa antrian
            const sisaPidana = await fetch(`${base_url}/api/sisa-antrian?loket=Pidana`);
            const sisaPerdata = await fetch(`${base_url}/api/sisa-antrian?loket=Perdata`);
            const sisaHukum = await fetch(`${base_url}/api/sisa-antrian?loket=Hukum`);
            const sisaUmum = await fetch(`${base_url}/api/sisa-antrian?loket=Umum`);
            const sisaKasir = await fetch(`${base_url}/api/sisa-antrian?loket=Kasir`);

            //antrian sekarang
            const sekarangPidana = await fetch(`${base_url}/api/antrian-sekarang?loket=Pidana`);
            const sekarangPerdata = await fetch(`${base_url}/api/antrian-sekarang?loket=Perdata`);
            const sekarangHukum = await fetch(`${base_url}/api/antrian-sekarang?loket=Hukum`);
            const sekarangUmum = await fetch(`${base_url}/api/antrian-sekarang?loket=Umum`);
            const sekarangKasir = await fetch(`${base_url}/api/antrian-sekarang?loket=Kasir`);

            //antrian selanjutnya
            const selanjutnyaPidana = await fetch(`${base_url}/api/antrian-selanjutnya?loket=Pidana`);
            const selanjutnyaPerdata = await fetch(`${base_url}/api/antrian-selanjutnya?loket=Perdata`);
            const selanjutnyaHukum = await fetch(`${base_url}/api/antrian-selanjutnya?loket=Hukum`);
            const selanjutnyaUmum = await fetch(`${base_url}/api/antrian-selanjutnya?loket=Umum`);
            const selanjutnyaKasir = await fetch(`${base_url}/api/antrian-selanjutnya?loket=Kasir`);

            //total antrian
            const totalPidana = await fetch(`${base_url}/api/antrian-total?loket=Pidana`);
            const totalPerdata = await fetch(`${base_url}/api/antrian-total?loket=Perdata`);
            const totalHukum = await fetch(`${base_url}/api/antrian-total?loket=Hukum`);
            const totalUmum = await fetch(`${base_url}/api/antrian-total?loket=Umum`);
            const totalKasir = await fetch(`${base_url}/api/antrian-total?loket=Kasir`);

            //fetch data
            const sisaPidanaRes = await sisaPidana.json()
            const sisaPerdataRes = await sisaPerdata.json()
            const sisaHukumRes = await sisaHukum.json()
            const sisaUmumRes = await sisaUmum.json()
            const sisaKasirRes = await sisaKasir.json()

            const sekarangPidanaRes = await sekarangPidana.json()
            const sekarangPerdataRes = await sekarangPerdata.json()
            const sekarangHukumRes = await sekarangHukum.json()
            const sekarangUmumRes = await sekarangUmum.json()
            const sekarangKasirRes = await sekarangKasir.json()

            const selanjutnyaPidanaRes = await selanjutnyaPidana.json()
            const selanjutnyaPerdataRes = await selanjutnyaPerdata.json()
            const selanjutnyaHukumRes = await selanjutnyaHukum.json()
            const selanjutnyaUmumRes = await selanjutnyaUmum.json()
            const selanjutnyaKasirRes = await selanjutnyaKasir.json()

            const totalPidanaRes = await totalPidana.json()
            const totalPerdataRes = await totalPerdata.json()
            const totalHukumRes = await totalHukum.json()
            const totalUmumRes = await totalUmum.json()
            const totalKasirRes = await totalKasir.json()

            const content = `SISA ANTRIAN
- Pidana: ${sisaPidanaRes.sisaAntrian}
- Perdata: ${sisaPerdataRes.sisaAntrian}
- Hukum: ${sisaHukumRes.sisaAntrian}
- Umum: ${sisaUmumRes.sisaAntrian}
- Kasir: ${sisaKasirRes.sisaAntrian}

ANTRIAN SEKARANG
- Pidana: ${sekarangPidanaRes.sekarang}
- Perdata: ${sekarangPerdataRes.sekarang}
- Hukum: ${sekarangHukumRes.sekarang}
- Umum: ${sekarangUmumRes.sekarang}
- Kasir: ${sekarangKasirRes.sekarang} 

ANTRIAN SELANJUTNYA
- Pidana: ${selanjutnyaPidanaRes.selanjutnya}
- Perdata: ${selanjutnyaPerdataRes.selanjutnya}
- Hukum: ${selanjutnyaHukumRes.selanjutnya}
- Umum: ${selanjutnyaUmumRes.selanjutnya}
- Kasir: ${selanjutnyaKasirRes.selanjutnya}

TOTAL ANTRIAN
- Pidana: ${totalPidanaRes.jumlahAntrian}
- Perdata: ${totalPerdataRes.jumlahAntrian}
- Hukum: ${totalHukumRes.jumlahAntrian}
- Umum: ${totalUmumRes.jumlahAntrian}
- Kasir: ${totalKasirRes.jumlahAntrian}
`
            const cekAntrian = await fetch(`${base_url}/cekantrian?wa=${from}`)
            const item = await cekAntrian.json()

            if (item.length > 0) {
              const messages = item.map((item) => {
                return `
Loket: ${item.loket}
No. Antrian: ${item.no_antrian}
Status: ${item.status === '1' ? 'Selesai' : 'Belum dipanggil'}
      `;
              });

              const resultnya = messages.join('\n---\n');
              return listButton(from, `${resultnya}\n\n${content}`);
            } else {
              return listButton(from, `*Anda belum memiliki nomor antrian*\n\n${content}`);
            }
          } catch (error) {
            console.error(error);
          }
          break;

        case "lainnya":
          listButton(from, `Halo kak ${pushname}, admin *Pengadilan Negeri Bulukumba* segera menghubungi kamu!`);
          break;
        default:
          listButton(from, `Bapak/Ibu ${pushname} yang Kami hormati, Silahkan klik tombol berikut untuk melihat layanan!`);
          break;
      }
    } catch (e) {
      console.log('Ups.. Ada yang error! silahkan ulangi kembali')
    }
  } else {
    console.log('Ups.. Ada yang error! silahkan ulangi kembali')
    return
  }
})

app.listen(port, () => {
  console.log(`Running ${port}`)
})

module.exports = app;
