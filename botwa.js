const qrcode = require('qrcode-terminal');
const { Client, Location, Poll, List, Buttons, LocalAuth, LegacySessionAuth, MessageMedia } = require('whatsapp-web.js');
const client = new Client({
    authStrategy: new LocalAuth({
        clientId: "client"
    }),
    puppeteer: {
        headless: false,
    }
})
// ganti nomer bot
let myNumber = '620000000000' + '@c.us'

client.on('loading_screen', (percent, message) => {
    console.log('LOADING SCREEN', percent, message);
});

let pairingCodeRequested = false;
client.on('qr', async (qr) => {
    console.log('QR RECEIVED', qr);

    const pairingCodeEnabled = false;
    if (pairingCodeEnabled && !pairingCodeRequested) {
        const pairingCode = await client.requestPairingCode('96170100100');
        console.log('Pairing code enabled, code: ' + pairingCode);
        pairingCodeRequested = true;
    }
});

client.on('authenticated', (session) => {
    console.log(session);
});

client.on('ready', async () => {
    console.log('READY');
    const debugWWebVersion = await client.getWWebVersion();
    console.log(`WWebVersion = ${debugWWebVersion}`);

    client.pupPage.on('error', function (err) {
        console.log('Page error: ' + err.toString());
    });

});

client.on('message', async msg => {
    if (msg.body) {
        const chat = await msg.getChat();
        const body = msg.body;

        if (msg.from == myNumber || msg.author == myNumber) {
            switch (true) {
                case body.startsWith('send'):
                    let split = msg.body.split('.')
                    let number = split[1] + '@c.us';
                    let message = split[2]
                    msg.reply('Siap bos !')
                    client.sendMessage(number, message)
                    break;
                // tambah fungsi atau method sendiri . dokumentasi https://docs.wwebjs.dev/
                // contoh
                // case 'pin':
                //     client.pinChat(msg.from);
                //     break;
                default:
                    msg.reply('Halo bro')
            }
        } else {
            msg.reply('Halo Siapa Ya')
        }

    }
});

client.initialize();

