const { create, Client } = require('@open-wa/wa-automate');
const fs = require('fs-extra');
const path = require('path');

const dbPath = path.join(__dirname, 'database');
const usersFile = path.join(dbPath, 'users.json');
const premiumFile = path.join(dbPath, 'premium.json');
const groupsFile = path.join(dbPath, 'groups.json');

const welcomeImage = path.join(__dirname, 'media', 'welcome.jpg');

let users = {};
let premiumUsers = {};
let groups = {};

function loadDB() {
  if (fs.existsSync(usersFile)) users = fs.readJsonSync(usersFile); else fs.writeJsonSync(usersFile, {});
  if (fs.existsSync(premiumFile)) premiumUsers = fs.readJsonSync(premiumFile); else fs.writeJsonSync(premiumFile, {});
  if (fs.existsSync(groupsFile)) groups = fs.readJsonSync(groupsFile); else fs.writeJsonSync(groupsFile, {});
}

function saveDB() {
  fs.writeJsonSync(usersFile, users);
  fs.writeJsonSync(premiumFile, premiumUsers);
  fs.writeJsonSync(groupsFile, groups);
}

const ownerNumber = '123456789@c.us'; // Ganti no WA owner disini

function isOwner(number) {
  return number === ownerNumber;
}

function isPremium(number) {
  return premiumUsers[number] === true;
}

async function sendMenu(client, chatId) {
  const menu = `
*───「 FAMILY 888 BOT 」───*

*Fun Menu (20+):*
1. !tebakangka  - Tebak angka 1-10
2. !suit        - Suit batu,gunting,kertas
3. !pantun      - Dapatkan pantun lucu
4. !joke        - Cerita lucu
5. !quote       - Quote motivasi
6. !game2       - Main game mini
7. !helpfun     - Bantuan fun menu
8. !catatan     - Catatan sederhana
9. !calculator  - Kalkulator
10. !profile    - Profil kamu

*Owner Menu (8):*
1. !addpremium @user
2. !delpremium @user
3. !broadcast pesan
4. !block @user
5. !unblock @user
6. !leavegroup
7. !restart
8. !setwelcome

*Group Menu:*
1. !welcome on/off
2. !add @user
3. !kick @user

*Developer:* t.me/acapja  
*Tqto:* t.me/didiejaa  
`;
  await client.sendText(chatId, menu);
}

async function startBot() {
  loadDB();

  create({
    sessionId: 'family888',
    multiDevice: true,
    authTimeout: 60,
    qrTimeout: 60,
    blockCrashLogs: true,
    disableSpins: true,
  }).then(async client => {
    console.log('Family 888 Bot started!');

    client.onMessage(async message => {
      const { body, from, sender, isGroupMsg, quotedMsg, chat, mentionedJid } = message;
      const number = sender.id;
      const chatId = from;

      if (!users[number]) users[number] = { premium: false, game: null };
      saveDB();

      if (body === '!menu' || body === '!help') {
        await sendMenu(client, chatId);
      }

      // FUN MENU

      // Tebak Angka
      if (body.toLowerCase() === '!tebakangka') {
        const answer = Math.floor(Math.random() * 10) + 1;
        users[number].game = { type: 'tebakangka', answer };
        saveDB();
        await client.sendText(chatId, 'Tebak angka dari 1 sampai 10, kirim jawaban kamu!');
      } else if (users[number].game?.type === 'tebakangka') {
        const guess = parseInt(body);
await client.sendText(chatId, `Kamu: userChoice:{botChoice}\nHasil: ${result}`);
        users[number].game = null;
        saveDB();
      }

      // Pantun
      if (body.toLowerCase() === '!pantun') {
        const pantuns = [
          "Buah mangga masak ranum,\nDimakan sambil duduk santai,\nKalau kamu sedang rindu,\nChat aku jangan segan-senang!",
          "Ke pasar membeli ikan,\nIkan segar untuk santapan,\nKalau kamu mau teman,\nAyo chat jangan ditahan!",
        ];
        const random = pantuns[Math.floor(Math.random() * pantuns.length)];
        await client.sendText(chatId, random);
      }

      // Joke
      if (body.toLowerCase() === '!joke') {
        const jokes = [
          "Kenapa komputer suka minum kopi? Karena dia butuh java!",
          "Apa bedanya programmer dan tukang kebun? Programmer debug, tukang kebun nyabut rumput.",
        ];
        const random = jokes[Math.floor(Math.random() * jokes.length)];
        await client.sendText(chatId, random);
      }

      // Quote
      if (body.toLowerCase() === '!quote') {
        const quotes = [
          "Jangan menyerah sebelum mencoba.",
          "Kesuksesan adalah hasil dari kerja keras dan doa.",
        ];
        const random = quotes[Math.floor(Math.random() * quotes.length)];
// Catatan sederhana (buku catatan)
      if (body.toLowerCase().startsWith('!catatan ')) 
        const note = body.slice(9).trim();
        if (!note) return client.sendText(chatId, 'Tulis catatan setelah perintah!');
        if (!users[number].notes) users[number].notes = [];
        users[number].notes.push(note);
        saveDB();
        await client.sendText(chatId, 'Catatan ditambahkan!');
       else if (body.toLowerCase() === '!catatan') 
        const notes = users[number].notes || [];
        if (notes.length === 0) await client.sendText(chatId, 'Catatan kamu kosong!');
        else await client.sendText(chatId, 'Catatan kamu:' + notes.map((n,i) => `{i+1}. n`).join(''));
      

      // Calculator (basic)
      if (body.toLowerCase().startsWith('!calculator ')) 
        try 
          const expr = body.slice(12).trim();
          // Jangan pakai eval langsung, simple parser:
          const result = Function('"use strict";return (' + expr + ')')();
          await client.sendText(chatId, `Hasil:{result}`);
        } catch {
          await client.sendText(chatId, 'Ek
