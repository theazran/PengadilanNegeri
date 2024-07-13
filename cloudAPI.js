var request = require('request');
require('dotenv').config(); // this loads env vars

var TOKEN = process.env.TOKEN
async function kirim(from, text) {
  var options = {
    'method': 'POST',
    'url': 'https://graph.facebook.com/v18.0/107927808943061/messages',
    'headers': {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + TOKEN
    },
    body: JSON.stringify({
      "messaging_product": "whatsapp",
      "recipient_type": "individual",
      "to": from,
      "type": "text",
      "text": {
        "preview_url": true,
        "body": text
      }
    })
  };
  request(options, function(error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
  });
}

async function listButton(from, content) {
  var options = {
    'method': 'POST',
    'url': 'https://graph.facebook.com/v18.0/107927808943061/messages',
    'headers': {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + TOKEN
    },
    body: JSON.stringify({
      "messaging_product": "whatsapp",
      "recipient_type": "individual",
      "to": from,
      "type": "interactive",
      "interactive": {
        "type": "list",
        "body": {
          "text": content
        },
        "action": {
          "button": "Menu",
          "sections": [
            {
              "title": "PN BULUKUMBA",
              "rows": [
                {
                  "id": "1",
                  "title": "Profile",
                  "description": "Informasi Profile Pengadilan Negeri Bulukumba"
                },
                {
                  "id": "2",
                  "title": "Jadwal Sidang",
                  "description": "Informasi Jadwal Sidang Hari ini"
                },
                {
                  "id": "3",
                  "title": "Tilang",
                  "description": "Informasi mengenai denda tilang"
                },
                {
                  "id": "4",
                  "title": "Layanan",
                  "description": "Informasi layanan PTSP"
                },
                {
                  "id": "5",
                  "title": "Posbakum",
                  "description": "Informasi Layanan Bantuan Hukum secara Gratis"
                },
                {
                  "id": "6",
                  "title": "Pengaduan",
                  "description": "Informasi mengenai prosedur pengaduan di Pengadilan"
                },
                  {
                    "id": "19",
                    "title": "Kritik & Saran",
                    "description": ""
                  },
                {
                  "id": "10",
                  "title": "Lainnya",
                  "description": ""
                }
              ]
            }
          ]
        }
      }
    })

  };
  request(options, function(error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
  });
}

async function antrian(from, name) {
  var options = {
    'method': 'POST',
    'url': 'https://graph.facebook.com/v18.0/107927808943061/messages',
    'headers': {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + TOKEN
    },
    body: JSON.stringify({
      "messaging_product": "whatsapp",
      "recipient_type": "individual",
      "to": from,
      "type": "interactive",
      "interactive": {
        "type": "list",
        "body": {
          "text": `Bapak/Ibu ${name} yang Kami hormati, Silahkan pilih Loket terlebih dahulu!`
        },
        "action": {
          "button": "Pilih Loket",
          "sections": [
            {
              "title": "PENGADILAN NEGERI",
              "rows": [
                {
                  "id": "1",
                  "title": "Loket Pidana",
                  "description": ""
                },
                {
                  "id": "2",
                  "title": "Loket Perdata",
                  "description": ""
                },
                {
                  "id": "3",
                  "title": "Loket Hukum",
                  "description": ""
                },
                {
                  "id": "4",
                  "title": "Loket Umum",
                  "description": ""
                },
                {
                  "id": "5",
                  "title": "Loket Kasir",
                  "description": ""
                },
                {
                  "id": "6",
                  "title": "Kembali Ke Menu Utama",
                  "description": ""
                }
              ]
            }
          ]
        }
      }
    })

  };
  request(options, function(error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
  });

}


async function sendButton(from, name) {
  var request = require('request');
  var options = {
    'method': 'POST',
    'url': 'https://graph.facebook.com/v18.0/107927808943061/messages',
    'headers': {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + TOKEN
    },
    body: JSON.stringify({
      "messaging_product": "whatsapp",
      "recipient_type": "individual",
      "to": from,
      "type": "template",
      "template": {
        "name": "info",
        "language": {
          "code": "id"
        },
        "components": [
          {
            "type": "body",
            "parameters": [
              {
                "type": "text",
                "text": name
              }
            ]
          }
        ]
      }
    })
  };
  request(options, function(error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
  });

}

async function maps(from) {
  var request = require('request');
  var options = {
    'method': 'POST',
    'url': 'https://graph.facebook.com/v18.0/107927808943061/messages',
    'headers': {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + TOKEN
    },
    body: JSON.stringify({
      "messaging_product": "whatsapp",
      "recipient_type": "individual",
      "to": from,
      "type": "template",
      "template": {
        "name": "maps",
        "language": {
          "code": "id"
        }
      }
    })

  };
  request(options, function(error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
  });

}
// listButton('6285255646434', 'M Asran')

module.exports = { antrian, kirim, listButton, sendButton, maps }
