const url = "https://fakestoreapi.com/products";
const cart = [];
const barang = [];

const divProduk = document.getElementsByClassName("div-produk");
const ambilData = async () => {
  const response = await fetch(url);
  const data = await response.json();
  barang.push(data);

  data.forEach((item) => {
    divProduk[0].innerHTML += `
      <div class="bg-gray-800 p-3 text-white">
        <img src="${item.image}" class="w-full h-56 object-cover"/>
        <span class="block font-bold text-xl title">${item.title}</span>
        <span class="block semi-bold text-xl category">${item.category}</span>
        <span class="block description">${item.description}</span>
        <button onclick="ClickBerhasil()" class="bg-sky-500 px-3 py-1 rounded text-black tambah-keranjang">Tambah ke keranjang</button>
      </div>
    ` 
  });
  
  let totalkeranjang = document.getElementsByClassName("cart_count")[0]
  const btnAddCart = document.getElementsByClassName("tambah-keranjang");
  
  Array.from(btnAddCart).forEach((tombol) => {
    tombol.addEventListener("click", function () {
        
      //ambil title, category, dan desription terdekat dari tombol yang di kilk
        let title = tombol.closest("div").querySelector(".title").innerText;
        let category = tombol.closest("div").querySelector(".category").innerText;
        let description = tombol.closest("div").querySelector(".description").innerText;
        
        cart.push({"title":title,"category":category,"description":description})
        barang.push
        //update total keranjang
        totalkeranjang.innerText = cart.length
    });
  });
};
ambilData();

const searchBar = document.querySelector(".searchbar");
searchBar.addEventListener("keyup", (e) => {
  let namaBarang = e.target.value.toLowerCase();
  const hasilcari = barang[0].filter((item) => {
    return item.title.toLowerCase().includes(namaBarang);
  });
  const divProduk = document.getElementsByClassName("div-produk");
  divProduk[0].innerHTML = "";
  hasilcari.forEach((item) => {
    divProduk[0].innerHTML += `
      <div class="bg-gray-800 p-3 text-white">
        <img src="${item.image}" class="w-full h-56 object-cover"/>
        <span class="block font-bold text-xl title">${item.title}</span>
        <span class="block category">${item.category}</span>
        <span class="block description">${item.description}</span>
        <button class="bg-sky-500 px-3 py-1 rounded text-black">Tambah ke keranjang</button>
      </div>
    `;
  });
});

//Script untuk modal tambah produk ke keranjang
const modalkeranjang = document.getElementsByClassName('modal-keranjang')[0]
const btnTutup = document.getElementsByClassName("btn-tutup")[0]
const btnTampilKeranjang = document.getElementsByClassName("tampilan-keranjang")[0]
const KeranjangAnda = document.getElementsByClassName("keranjang-anda")[0] 
const btnHapus = document.getElementsByClassName("hapus-bnt")[0]

btnTutup.addEventListener("click", () => {
  modalkeranjang.classList.add("hidden")

});

//fungsi ketika tampilan keranjang di click kemudian menampilkan isi keranjang
btnTampilKeranjang.addEventListener("click", () =>{
  modalkeranjang.classList.remove("hidden")

  cart.forEach((item,index) => {
    KeranjangAnda.innerHTML +=`
    <div class="bg-white rounded my-3 p-3 text-black">
    <span class="block font-bold text-xl">${item.title}</span>
    <span class="block font-semibold texs-md">${item.category}</span>
    <span class="block ">${item.description}</span>
    <button class="bg-sky-500 px-3 py-1 rounded text-black" onclick="hapusDariKeranjang(${index})">Hapus</button>
    </div>
    `
    
  });
});

//fungsi untuk membuang produk dikeranjang
function hapusDariKeranjang(index){
  // Hapus item pada indeks yang ditentukan dari array cart
  cart.splice(index, 1);
  
  // Hapus isi elemen HTML dengan class "keranjanganda"
  KeranjangAnda.innerHTML = '';
  
   //Setelah dihapus akan  mengulangi keranjang yang telah diperbarui dan ditampilkan setiap item di elemen "keranjanganda".
  cart.forEach((item, i) => {
    KeranjangAnda.innerHTML += `
      <div class="bg-white rounded my-3 p-3 text-black">
        <span class="block font-bold text-xl">${item.title}</span>
        <span class="blovk font-semibold text-md">${item.category}</span>
        <span class="block ">${item.description}</span>
        <button class="bg-sky-500 px-3 py-1 rounded text-black" onclick="hapusDariKeranjang(${i})">Hapus</button>
      </div>
    `;
  });
  
  // Perbarui jumlah keranjang di bilah navigasi
  const tampilKeranjangElement = document.querySelector(".cart_count");
  tampilKeranjangElement.innerHTML = `${cart.length}`;
  
  // Periksa apakah keranjangnya kosong dan tutup modalnya jika kosong
  if (cart.length == 0) {
    modalkeranjang.classList.add("hidden");
  
  }

}

  
