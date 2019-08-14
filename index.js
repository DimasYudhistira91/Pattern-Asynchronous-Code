// 1. SYNCHRONOUS & ASYNCHRONOUS JAVASCRIPT
// Synchronous (blocking program -> menjalankan program sesuai sesuai dengan urutan dari atas ke bawah atau dari kiri ke kanan, jika program sebelumnya belum tereksekusi maka program selanjutnya tidak akan berjalan)

// Contoh:

// console.log('baris pertama');
// console.log('baris kedua');

// // console log kedua akan berjalan setelah log pertama selesai dieksekusi
// // ___________________________________________________


// // Asynchronous (non-blocking program -> tidak terikat dengan urutan)

// // contoh:

// console.log('satu');

// setTimeout(() => {
//   console.log('dua...');
// }, 2000);

// console.log('tiga');

// // log 2 akan muncul setelah log 3
// // _______________________________________________________


// 2. Pattern for Dealing with Asynchronous Code

// Callbacks
console.log('Before');
getUser(1, (user) => {
  getRepositories(user.gitHubUsername, (repo) => {
    console.log("Repositories: ", repo);
  });
});
console.log('After');

function getUser(id, Callbacks) {
  setTimeout(() => {
    console.log('Reading a user from a database...');
    Callbacks({id: id, gitHubUsername: 'dimas'});
  }, 2000);
}

function getRepositories(username, Callbacks) {
  setTimeout(() => {
    console.log('Calling GitHub API...');
    Callbacks(['repo1', 'repo2', 'repo3']);
  }, 2000);
}