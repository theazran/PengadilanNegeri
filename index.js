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
      if (chat.includes("#tilang")) {
        const args = chat.split(" ").slice(1); // Ambil argumen setelah '#tilang'

        if (args.length < 1 || !args[0].trim()) {
            kirim(from, "Kode registrasi tilang harus diberikan. Contoh: #tilang G8934466");
            return;
        }

        const kodeRegister = args[0].trim();
        const url = `https://etilang.vercel.app/api/cektilang?no_tilang=${kodeRegister}`;
        var request = require('request');

        // Fetch API
        request(url, { json: true }, (error, response, body) => {
            if (error) {
                console.error("Error API:", error.message);
                kirim(from, "Terjadi kesalahan saat memproses permintaan.");
                return;
            }

            if (body.error) {
                kirim(from, `Error: ${body.error}`);
                return;
            }

            const hasil = body.results && body.results[0];
            if (!hasil) {
                kirim(from, "Data tidak ditemukan.");
                return;
            }

            const message = `
Tilang Info:
Nama: ${hasil.nama}
Alamat: ${hasil.alamat}
Jenis Kendaraan: ${hasil.jenis_kendaraan}
No Ranmor: ${hasil.no_ranmor}
Denda: Rp${hasil.denda}
Pasal: ${hasil.pasal}
Tanggal Sidang: ${hasil.tgl_sidang || 'Belum dijadwalkan'}

Petugas Penindak:
Nama: ${hasil.nama_petugas}
NRP: ${hasil.nrp_petugas}
            `;
            kirim(from, message.trim());
        });
    } else {
        kirim(from, `Halo ${pushname}, perintah tidak dikenal. Silakan gunakan format yang benar, contoh: #tilang G8934466.`);
    }
      
      switch (chat.toLowerCase()) {
         case "info":
          listButton(from, `Bapak/Ibu ${pushname} yang Kami hormati, Silahkan klik tombol berikut untuk melihat layanan!`);
          break;
        case "profile":
          //maps(from)
          kirim(from, `PENGADILAN NEGERI BULUKUMBA
Alamat: Jl. Kenari No. 5, Kabupaten Bulukumba, Provinsi Sulawesi Selatan
Telp. / Fax: 0413-81022 / 0413-81050
Website: https://pn-Bulukumba.go.id
e-Mail: pn.bulukumba@gmail.com`);
          break;
        case "jadwal sidang":
          var request = require('request');
          var options = {
            'method': 'GET',
            'url': 'http://36.88.136.147:8080/andalan/kirimpesan/jadwalsidang',
            'headers': {
              'Cookie': 'ci_session=cn4vnq825if1gimk61lqat2g83rdh380'
            }
          };
          request(options, function (error, response) {
            if (error) throw new Error(error);
            var responseBody = response.body;
            responseBody = responseBody.replace(/<\/?pre>/g, '');
            responseBody = responseBody.replace(/ANDALAN/g, 'Pengadilan Negeri Bulukumba');
            console.log(responseBody);
            kirim(from, responseBody);
          });
          break;
        case "tilang":
          kirim(from, 'Silahkan kirim perintah berikut.\n#tilang <No. Register Tilang>\n\nContoh:\n#tilang G012345');
          break;
        case "layanan":
          kirim(from, `Bapak/Ibu ${pushname}, Pengadilan Negeri Bulukumba telah melaksanakan Sistem Pelayanan Terpadu Satu Pintu (PTSP). Seluruh pelayanan publik dilakukan pada ruang Pelayanan Terpadu Satu Pintu (PTSP) Pengadilan Negeri Bulukumba.

Terdapat 6 meja pelayanan yang dibuka, yaitu:
1. PERDATA\nMelayani segala pelayanan publik yang menjadi tupoksi Kepaniteraan Perdata. Pelayanan publik tersebut antara lain : pendaftaran perkara perdata, permohonan, gugatan.  
Untuk mengetahui lebih rinci pada pelayanan perdata klik link  e-Brosur dibawah ini
https://drive.google.com/drive/folders/1YTm5tCP5IWhNekyTNdEoK2ei9hC2sTZZ
        
2. PIDANA\nMelayani segala pelayanan publik yang menjadi tupoksi Kepaniteraan Pidana. Pelayanan publik tersebut antara lain : pendaftaran perkara pidana biasa, praperadilan, dsb.
Untuk mengetahui lebih rinci pada pelayanan pidana klik link  e-Brosur dibawah ini
https://drive.google.com/drive/folders/1Hp-OnDp1IwWLC8P31OooCM0Yd3WFJU5I
        
3. HUKUM\nMeja Hukum melayani segala pelayanan publik yang menjadi tupoksi Kepaniteraan Hukum. Pelayanan publik tersebut antara lain : pembuatan surat keterangan, pendaftaran badan hukum, pendaftaran surat kuasa, dan Pengaduan terhadap aparat peradilan, termasuk bantuan dalam penggunaan aplikasi SIWAS oleh masyarakat.
Untuk mengetahui lebih rinci pada pelayanan hukum klik link  e-Brosur dibawah ini
https://drive.google.com/drive/folders/1xJAJCVmPovBqLHI5iL2ojXXpA2Rb3Ko8
                
4. UMUM\nmelayani segala pelayanan publik yang menjadi tupoksi sub bagian umum dan keuangan. Pelayanan publik tersebut antara lain : pelayanan surat masuk dan surat keluar.
https://drive.google.com/drive/folders/1udyE9IT0BR_zLRJ1eD0wKuuZNeqyLL8S

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

3. Surat pernyataan tidak mampu membayar jasa advokat yang dibuat dan ditandatangani oleh Pemohon layanan Posbakum Pengadilan dan disetujui oleh Petugas Posbakum Pengadilan, apabila Pemohon layanan Posbakum Pengadilan tidak memiliki dokumen sebagaimana disebut dalam huruf a atau b.`);
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
       case "kritik dan saran":
        var request = require('request');
        var longUrl = `https://kritsar.vercel.app/?nama=${encodeURIComponent(pushname)}&hp=${encodeURIComponent(from)}`;
        
        var shortUrlApi = `https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`;
        request(shortUrlApi, function (error, response, body) {
            if (error) {
                console.log('Request error:', error);
                return;
            }
        
            if (response.statusCode === 200) {
                console.log(`URL pendek: ${body}`);
                kirim(from, `Silahkan klik link berikut untuk memberikan Kritik dan Saran\n${body}`);
            } else {
                console.log(`Error ${response.statusCode}: ${response.body}`);
            }
        });


      
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
