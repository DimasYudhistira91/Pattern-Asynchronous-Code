// 1. SYNCHRONOUS & ASYNCHRONOUS JAVASCRIPT
// Synchronous (blocking program -> menjalankan program sesuai sesuai dengan urutan dari atas ke bawah atau dari kiri ke kanan, jika program sebelumnya belum tereksekusi maka program selanjutnya tidak akan berjalan)

// Contoh:

// console.log('baris pertama');
// console.log('baris kedua');

// // console log kedua akan berjalan setelah log pertama selesai dieksekusi
// // ___________________________________________________\\


// // Asynchronous (non-blocking program -> tidak terikat dengan urutan)

// // contoh:

// console.log('satu');

// setTimeout(() => {
//   console.log('dua...');
// }, 2000);

// console.log('tiga');

// // log 2 akan muncul setelah log 3
// // _____________________________________________________\\


// 2. Pattern for Dealing with Asynchronous Code

// Callbacks (Asynchronous)
// console.log('Before');
// getUser(1, (user) => {
//   getRepositories(user.gitHubUsername, (repos) => {
//     getCommit(repos[0], (commits) => {
//       // deep nested structure ( CALLBACK HELL )
//     });
//   });
// });
// console.log('After');

// // // Synchronous (lebih mudah dibaca)
// // console.log('Before')
// // const user = getUser(1);
// // const repos = getRepositories(user.gitHubUsername);
// // const commits = getCommit(repo[0]);
// // console.log('After');

// function getUser(id, Callbacks) {
//   setTimeout(() => {
//     console.log('Reading a user from a database...');
//     Callbacks({id: id, gitHubUsername: 'dimas'});
//   }, 2000);
// }

// function getRepositories(username, Callbacks) {
//   setTimeout(() => {
//     console.log('Calling GitHub API...');
//     Callbacks(['repo1', 'repo2', 'repo3']);
//   }, 2000);
// }

// function getCommits(repo, Callbacks) {
//   setTimeout(() => {
//     console.log('Calling GitHub API...');
//     Callbacks(['commit']);
//   }, 2000);
// }

// ________________________________________________________________________\\

// // Cara memperbaiki Callbacks Hell

// console.log('Before');
// getUser(1, getRepositories);
// console.log('After');

// // pakai named function
// function getRepositories(user) {
//   getRepositories(user.gitHubUsername, getCommits);
// }

// function getCommits(repos) {
//   getCommits(repo, displayCommits);
// }

// function displayCommits(commits) {
//   console.log(commits);
// }


// function getUser(id, Callbacks) {
//   setTimeout(() => {
//     console.log('Reading a user from a database...');
//     Callbacks({id: id, gitHubUsername: 'dimas'});
//   }, 2000);
// }

// function getRepositories(username, Callbacks) {
//   setTimeout(() => {
//     console.log('Calling GitHub API...');
//     Callbacks(['repo1', 'repo2', 'repo3']);
//   }, 2000);
// }

// function getCommits(repo, Callbacks) {
//   setTimeout(() => {
//     console.log('Calling GitHub API...');
//     Callbacks(['commit']);
//   }, 2000);
// }

// ______________________________________________________________________\\

// *Replacing Callbacks with Promises

console.log('Before');

// getUser(1, (user) => {
//   console.log(user);
//   getRepositories(user.gitHubUsername, (repos) => {
//     console.log(repos[1]);
//     getCommits(repos[0], (commits) => {
//       console.log(commits);
//       // deep nested structure ( CALLBACK HELL )
//     });
//   });
// });

getUser(1)
  .then(user => getRepositories(user.gitHubUsername))
  .then(repos => getCommits(repos[0]))
  .then(commits => console.log('Commit:', commits))
  .catch(err => console.log('Error', err.message));

console.log('After');


function getUser(id) {
  return new Promise((resolve, reject) => {     // gunakan promises
    setTimeout(() => {
      console.log('Reading a user from a database...');
      resolve({id: id, gitHubUsername: 'dimas'});
    }, 2000);
  });
}

function getRepositories(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Calling GitHub API...');
      resolve(['repo1', 'repo2', 'repo3']);
    }, 2000);
  });
}

function getCommits(repo, Callbacks) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Calling GitHub API...');
      resolve(['commit']);
    }, 2000);
  });
}


// _____________________________________________________________\\

// ASYNC & AWAIT

console.log('Before');

// Promise-based approach
// getUser(1)
//   .then(user => getRepositories(user.gitHubUsername))
//   .then(repos => getCommits(repos[0]))
//   .then(commits => console.log('Commit:', commits))
//   .catch(err => console.log('Error', err.message));


// Async & Await approach
async function displayCommits() {
  try {
    const user = await getUser(1);
    const repos = await getRepositories(user.gitHubUsername);
    const commits = await getCommits(repos[0]);
    console.log(commits);
  }
  catch (err) {
    console.log('Error', err.message);
  }
}
displayCommits();

console.log('After');


function getUser(id) {
  return new Promise((resolve, reject) => {     // gunakan promises
    setTimeout(() => {
      console.log('Reading a user from a database...');
      resolve({id: id, gitHubUsername: 'dimas'});
    }, 2000);
  });
}

function getRepositories(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Calling GitHub API...');
      // resolve(['repo1', 'repo2', 'repo3']);
      reject(new Error('Could not get the repos.'))
    }, 2000);
  });
}

function getCommits(repo, Callbacks) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Calling GitHub API...');
      resolve(['commit']);
    }, 2000);
  });
}