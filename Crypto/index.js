const crypto = require('crypto');

const secretKey = "sha25645544654845";
const hash = crypto.createHash('sha512',secretKey).update('benimparolam124356').digest('hex');
console.log(hash);

