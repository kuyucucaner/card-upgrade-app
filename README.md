# 🚀 Card Upgrade Study Case (Next.js + MongoDB)

Bu proje bir HTML5 web uygulamasıdır. Kullanıcılar kartlarını tıklayarak geliştirir, her tıklama kartın ilerleme (**progress**) çubuğunu artırır ve enerji harcar. Enerji sınırlıdır ve zamanla otomatik olarak yenilenir.

---

## 📌 Özellikler

- ✅ Kullanıcı başına **10 adet kart** oluşturulur.
- ✅ Her kartın seviyesi **1 - 3** arasında değişir.
- ✅ Kullanıcı, kartı **progress** butonlarıyla geliştirir.
- ✅ Her tıklama kartın ilerlemesini artırır ve enerji harcar.
- ✅ Enerji dakikada **1 birim** yenilenir.
- ✅ Kart ilerlemesi %100 olduğunda **Level Up** butonu aktif olur.
- ✅ Kart seviyesi en fazla **3** olur.
- ✅ Tüm veriler **MongoDB** veritabanında saklanır.

---

## ⚙️ Kullanılan Teknolojiler

- **Next.js 13+ (App Router)**
- **TypeScript**
- **MongoDB & Mongoose**
- **Tailwind CSS**
- **Axios**

---

## 🗂️ Ortam Değişkenleri (`.env.local`)

Proje kök dizininde bir `.env.local` dosyası oluşturun ve MongoDB bağlantı cümlenizi ekleyin:

MONGODB_URI=<mongodb_connection_string>

---

### 1️⃣ Repoyu Klonla

```bash
git clone https://github.com/kuyucucaner/card-upgrade-app
cd card-upgrade-app
npm install 
npm run dev 
