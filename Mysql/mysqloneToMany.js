const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    waitForConnections: true,
    pool: 5, // bu kadar bağlantı oluştur
    charset: 'UTF8_GENERAL_CI',
    port: 3306,
    database: 'nodejsdb',
    debug: false,
})

//1-ÇOK TABLOLU VERİTABANI OLUŞTURMA

const createRelationalOneToManyTable=()=>{
  connection.query(
    `CREATE TABLE kisiler 
    (kisi_id int AUTO_INCREMENT PRIMARY KEY,
     kisi_ad VARCHAR(255),
     kisi_soyad VARCHAR(255))
     `
    ,(err,result)=>{
      if(!err){
        connection.query(
            `CREATE TABLE sosyal_medya 
            (sosyal_medya_id int AUTO_INCREMENT PRIMARY KEY,
             kisi_id INT NOT NULL ,
             sosyal_medya_adi VARCHAR(255),
             FOREIGN KEY (kisi_id) REFERENCES kisiler(kisi_id) ON DELETE CASCADE ON UPDATE CASCADE)` //CASCADE İŞLEMİ İLE İLİŞKİLİ TABLOLARDAKİ VERİLERİNDE SİLİNMESİ SAĞLANIR 
        )
      }
    })
}

createRelationalOneToManyTable() 


const createUser = ()=>{
    const query = `INSERT INTO kisiler (kisi_ad, kisi_soyad) VALUES (?,?)`
    const name = process.argv[2]
    const surname = process.argv[3]
    connection.query(query,[name,surname],(err,result)=>{
        if(err) throw err.message
        console.log('Data inserted!')
    })
}

createUser()


const createSocialMediaWithUser =()=>{
    const query = `INSERT INTO sosyal_medya (kisi_id,sosyal_medya_adi) VALUES (?,?)`
    connection.query(query,[1,'INSTAGRAM'],(err,result)=>{
        if(err) throw err.message
        console.log('Data inserted!',result.insertId)
    })
}

createSocialMediaWithUser()


// VERİ LİSTELEME
const getAllRelationsData = () => {
    const query = `SELECT * FROM kisiler INNER JOIN sosyal_medya ON kisiler.kisi_id = sosyal_medya.kisi_id`
    connection.query(query, (err, result) => {
        if (err) throw err.message
        console.log(result)
    })
}

getAllRelationsData()


//ID ile ilişkili verileri çekme
const getRelationsById = (id) => {
    const query = `SELECT * FROM kisiler INNER JOIN sosyal_medya ON kisiler.kisi_id = sosyal_medya.kisi_id WHERE kisiler.kisi_id = ?`
    connection.query(query, [id], (err, result) => {
        if (err) throw err.message
        console.log(result)
    })
}
getRelationsById(process.argv[2])


//VERİ GÜNCELLEME
const updateById=(kisiId,sosyalMedyaId,sosyalMedyaAdi)=>{
    const query = `UPDATE sosyal_medya SET sosyal_medya_adi = ? WHERE  kisi_id = ? AND sosyal_medya_id = ?` 
    connection.query(query, [sosyalMedyaAdi,kisiId,sosyalMedyaId], (err, result) => {
        if (err) throw err.message
        console.log(result)
    })
}

updateById(1,1,'FACEBOOK')


//VERİ SİLME
const deleteById=(kisiId)=>{
    const query = `DELETE FROM kisiler WHERE kisi_id = ?` 
    connection.query(query, [kisiId], (err, result) => {
        if (err) throw err.message
        console.log(result)
    })
}

deleteById(1)


connection.connect((err) => {
    if (err) throw err.message
    console.log('Connected!')
})