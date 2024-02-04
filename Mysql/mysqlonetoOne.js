//1-1 VERİTABANI OLUŞTURMA

const createOneToOneTable=()=>{
    connection.query(
      `CREATE TABLE personel_cv 
      (personel_cv_id int AUTO_INCREMENT PRIMARY KEY,
      personel_cv_ad VARCHAR(255))
       `
      ,(err,result)=>{
        if(!err){
          connection.query(
              `CREATE TABLE personel 
              (personel_id int AUTO_INCREMENT PRIMARY KEY,
               personel_cv_id INT NOT NULL ,
               personel_adi VARCHAR(255),
               personel_soyadi VARCHAR(255),
               personel_maas VARCHAR(255),
               FOREIGN KEY (personel_cv_id) REFERENCES personel_cv(personel_cv_id) ON DELETE CASCADE ON UPDATE CASCADE)` //CASCADE İŞLEMİ İLE İLİŞKİLİ TABLOLARDAKİ VERİLERİNDE SİLİNMESİ SAĞLANIR 
          )
        }
      })
  }
  
  createOneToOneTable() 
  
  
  const createPersonel = (user) => {
      const query = `INSERT INTO personel_cv (personel_cv_ad) VALUES (?)`
      connection.query(query,[process.argv[2]],(err,result)=>{
          const cvId = result.insertId
          const query = `INSERT INTO personel (personel_cv_id,personel_adi,personel_soyadi,personel_maas) VALUES (?,?,?,?)`
          connection.query(query,[cvId,user.ad,user.soyad,user.maas],(err,result)=>{
              if(err) throw err.message
              console.log('Data inserted!')
      })
  })
  }
  
  //VERİ LİSTELEME
  const getAllRelations = () => {
      const query = `SELECT * FROM personel_cv INNER JOIN personel ON personel_cv.personel_cv_id=personel.personel_cv_id`
      connection.query(query,(err,result)=>{
          if(err) throw err.message
          console.log(result)
      })
  }
  
  //getAllRelations()
  
  createPersonel({
      ad:'Sabit',
      soyad:'Ünsür',
      maas:'50000'
  })
  
  //VERİ GÜNCELLEME
  const updateCv = (id) => {
      const query = `UPDATE personel_cv SET personel_cv_ad = ? WHERE personel_cv_id = ?`
      const cvname = process.argv[2]
      connection.query(query,[cvname,id],(err,result)=>{
          if(err) throw err.message
          console.log('Data updated!')
      })
  } 
  
  updateCv(3)
  
  //VERİ SİLME
  const deleteCv = (id) => {
      const query = `DELETE FROM personel_cv WHERE personel_cv_id = ?`
      connection.query(query,[id],(err,result)=>{
          if(err) throw err.message
          console.log('Data deleted!')
      })
  }
  
  deleteCv(3)
  
  