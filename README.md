# REST API - TOKO 

Contoh REST API dengan menggunakan Nodejs, Express, & Sequelize

API Doc : 
https://tokoapi.docs.apiary.io


## Installasi
1. Install library/dependencies dengan menjalankan perintah :

    **npm install**

2. Sesuaikan konfigurasi database pada file **config/config.json**
3. Eksekusi perintah berikut untuk membuat database, table dan migrasi data : 


    **npx sequelize db:create** <-- membuat database

    **npx sequelize db:migrate** <-- migrasi tabel

    **npx sequelize db:seed:all** <-- mengisi data default


    Jika ingin menjalankan seed untuk file tertentu maka lakukan peirntah ini : 
    
    **npx sequelize db:seed --seed {path_file}**
4. Jalankan server dengan perintah berikut : 

    **npm run dev**
    
5. Untuk informasi userlogin dapat dilihat pada file **seeders/20210808074647-users.js**
6. Selamat mencoba
7. API dapat diakses di http://localhost:3200
