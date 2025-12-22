# 🧮 Rams’s Scientific Calculator

**Rams’s Scientific Calculator** adalah aplikasi **scientific calculator desktop portable** yang dibangun tanpa `eval()`, menggunakan engine parsing ekspresi sendiri, dan dirancang untuk menunjukkan praktik **software engineering yang rapi, aman, dan terkontrol**.

Project ini dibuat sebagai **portfolio project**, dengan fokus pada:
- logika matematika yang eksplisit
- arsitektur modular
- UI desktop realistis
- kesiapan dibungkus menjadi aplikasi `.exe`

---

## ✨ Fitur Utama
- Operasi dasar: + − × ÷
- Trigonometri: sin, cos, tan (mode DEG)
- Logaritma: log, ln
- Pangkat & akar (x², √x)
- Konstanta matematika: π dan e
- Persentase (%)
- Tombol **DEL (⌫)** & **AC**
- History perhitungan (1 baris terakhir)
- Keyboard input support
- Light / Dark mode
- Offline & portable

---

## 🧠 Pendekatan Teknis
- ❌ Tidak menggunakan `eval()`
- ✅ Parsing ekspresi manual (Shunting Yard Algorithm)
- ✅ Pemisahan UI, parser, dan engine matematika
- ✅ Error handling eksplisit (÷0, log ≤ 0, dll)

Struktur utama:
rams-scientific-calculator/
├── index.html
├── style.css
├── main.js
├── core/
│ ├── calculator.js
│ ├── parser.js
│ ├── math.js
│ └── errors.js
├── README.md
└── LICENSE


---

## 🚀 Menjalankan Aplikasi (Web)
Buka langsung file:
```bash
index.html
