import fs from 'node:fs/promises';

const buffer = await fs.readFile('hello.txt');
// якщо у файлі hello.txt був текст "Hello World!"

console.log(buffer.toString('utf-8'));
// <Buffer 48 65 6c 6c 6f 20 57 6f 72 6c 64 21>

// // з кодуванням
// const data = await fs.readFile('file.txt', 'utf8');
// console.log('Вміст файлу:', data); // "Hello"

// await fs.writeFile('output.txt', 'Привіт з Node.js!', 'utf8');
// console.log('Дані успішно записані у файл.');

// await fs.appendFile('output.txt', '\nЩе один рядок', 'utf8');
// console.log('Дані успішно додані у файл.');

// await fs.rename('file.txt', 'newfile.txt');
// console.log('Файл успішно перейменовано.');

// await fs.unlink('newfile.txt');
// console.log('Файл успішно видалено.');
