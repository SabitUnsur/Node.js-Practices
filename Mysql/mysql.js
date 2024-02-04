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


/*connection.query('CREATE DATABASE nodejsdb', (err, result) => {
    if (err) throw err.message
    console.log('Database created!')
})*/ // VERİTABANI OLUŞTURMA



connection.connect((err) => {
    if (err) throw err.message
    console.log('Connected!')
    /*connection.query('CREATE TABLE IF NOT EXISTS ogrenciler (ogrenci_id int AUTO_INCREMENT,ogrenci_adi VARCHAR(255),ogrenci_soyadi VARCHAR(255),PRIMARY KEY (ogrenci_id))', (err, result) => {
        if (err) throw err.message
        console.log('Table created!')
    })*/ // TABLO OLUŞTURMA


    /*const query = `INSERT INTO ogrenciler (ogrenci_adi, ogrenci_soyadi) VALUES ('Sabit', 'Ünsür')`
    connection.query(query, (err, result) => {
        if (err) throw err.message
        console.log('Data inserted!')
    })*/ // TEK EKLEME



    /*const studentsArr = [
        ['Ahmet', 'Yılmaz'],
        ['Mehmet', 'Kaya'],
        ['Ayşe', 'Demir'],
        ['Kübra', 'Arsuz'],
    ]
    const query2 = `INSERT INTO ogrenciler (ogrenci_adi, ogrenci_soyadi) VALUES ?` //ÇOKLU EKLEME
    connection.query(query2,[studentsArr], (err, result) => {
        if (err) throw err.message
        console.log('Data inserted!')
    })*/  // ÇOKLU EKLEME


    /*const query = `INSERT INTO ogrenciler (ogrenci_adi, ogrenci_soyadi) VALUES (?,?)`
    const name = process.argv[2]
    const surname = process.argv[3] 
    connection.query(query,[name,surname], (err, result) => {
        if (err) throw err.message
        console.log('Data inserted!')
    }) */ // KOMUT SATIRINDAN VERİ EKLEME


    /*const selectMyData = () => {
        const query = `SELECT * FROM ogrenciler`
        connection.query(query, (err, result) => {
            if (err) throw err.message
            console.log(result)
        })
    } // VERİLERİ ÇEKME

    selectMyData()*/


    const findById = (id) => {
        const query = `SELECT * FROM ogrenciler WHERE ogrenci_id = ?`
        connection.query(query, [id], (err, result) => {
            if (err) throw err.message
            console.log(result)
        })
    } // VERİLERİ ID İLE ÇEKME

    findById(2)


    const deleteById = (id) => {
        const query = `DELETE FROM ogrenciler WHERE ogrenci_id = ?`
        connection.query(query, [id], (err, result) => {
            if (err) throw err.message
            console.log(result)
        })
    } // VERİLERİ ID İLE SİLME 

    deleteById(6)

    const updateById = (name,surname,id) => {
        const query = `UPDATE ogrenciler SET ogrenci_adi = '?' , ogrenci_soyadi = ? WHERE  ogrenci_id = ?`
        connection.query(query, [name,surname,id], (err, result) => {
            if (err) throw err.message
            console.log(result)
        })
    } // VERİLERİ ID İLE GÜNCELLEME
    updateById('Sabit','Ünsür',5)

 

})