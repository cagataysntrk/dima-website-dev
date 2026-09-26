# ARCHIVED CHECKLIST

> Historical implementation record only. Do not execute this file as the current plan.
> Current website branch: `refactor/dima-brand-foundation`.
> Current architecture and product-proof authority: `DECISIONS.md` D-067 and the root `README.md`.
> Test counts, branch names and verification receipts below are historical snapshots.

# Website revizyonu — checklist

Plan: `~/.claude/plans/pasted-content-id-1603-website-revizyon-sparkling-axolotl.md`
Branch: `feat/site-revision` (site) → master; design-system `feat/form-fields` → master (PR #1–#6, 2026-09-24)

## 0. Hazırlık
- [x] Baseline: typecheck, test, build (e2e baseline atlandı; sonda tam e2e koşulacak)
- [x] Mobil üst bar / navbar çakışmasını 390px'te yeniden üret, kök nedeni doğrula

## 1. Kaldırmalar
- [x] "Ne yapıyoruz" ürün badge'leri
- [x] Landing'den "Nasıl çalışıyoruz" + "Bir çalışmanın dört adımı"
- [x] `howWeWork`, `engagementSteps` içerik + test temizliği

## 2. Navbar
- [x] DS Nav `align="center"`
- [x] Mobil çakışma fix'i (fixed nav + tam `--nav-offset`)

## 3. CTA
- [x] Rainbow Button (token renkleri, nav'da glow yok), ShimmerButton'u değiştir

## 4. Hero
- [x] Globe hero'nun sağına (lg+), Prism kaldır, Sektörler globe'suz

## 5. Dima demo
- [x] Senaryolu sohbet demosu, AnalyticsDemo yerine (landing + /solutions)
- [x] Unit + e2e testleri

## 6. Dima görselleri
- [x] `capture:screens` scripti, yeni dima-desktop/mobile.webp

## 7. Responsive + doküman
- [x] Route taraması 360/390/768/1024/1440
- [x] e2e: overlap, yatay taşma, JS bütçesi
- [x] DECISIONS.md / README

## Review

**Adım 0 bulgusu (doğrulandı, 390px):** nav `sticky top-4`, alt kenarı 86px; `--nav-offset` 80px.
Yasal sayfalardaki mobil `<details>` barı 80px'e yapışıp nav'ın 6px altına giriyordu; tüm
non-landing sayfalarda nav akışta yer kapladığı için `main`'in 80px padding'i çift boşluk
yapıyordu (h1 198px). Fix sonrası: nav `fixed`, `main` padding 86px = nav alt kenarı, details
86px'te, h1 134px.

**Ek bulgu:** `rounded-button` utility'si hiç üretilmiyordu (`--radius-button` `@theme`'de
değil `:root`'taydı) — D-032'nin kapsül CTA'ları köşeli çıkıyordu. `@theme`'e taşındı.

**Responsive taraması (18 route × 5 genişlik):** yatay taşma yok; nav her genişlikte 70px,
1024'te ortalanmış linkler çakışmıyor. Düzeltilen: /cozumler kategori ve ürün çipleri (21–31px →
dokunmatikte 44px), SSS akordeon butonları (24px → 44px, görünüm aynı). Bırakılan: harita zoom
kontrolleri (vendor mapcn, 32px, harita tıklanınca yüklenir), çerez politikasındaki metin içi
buton.

**Doğrulama:** `bun run test` 38/38, `typecheck` temiz, `build` temiz, e2e 16/16 (üst üste 3
koşu). DS: ui + storybook typecheck, `bun test` 47/47.
İlk yükleme JS (master → branch): /tr 232,4 → 237,0 kB; /tr/cozumler 214,3 → 220,0 kB (bütçe 250).

**Açık kalanlar:** ilk tur commit ve push'u kullanıcı yaptı (site `1c4cbc7`, `5c3cced`; DS
`6a18896`, origin'de). Doğrulama turundaki düzeltmeler commit edilmedi.

## Doğrulama turu (bağımsız inceleme + görsel denetim)
- [x] İkincil CTA'lar gerçekten kapsül (`rounded-button!`; DS cn site token'ını tanımıyor)
- [x] Demo: ilk soruda/butonda odak kaybı yok; Stop/Yeni sohbet ref'i hemen bırakıyor; her hata
      turu bitiriyor; Stop ekran okuyucuya duyuruluyor; `useId`
- [x] Demo yüksekliği ekran altına sınırlı, telefonda kaydırma kilidi yok (overscroll-contain kalktı)
- [x] "neden/why" anahtar kelimeleri kaldırıldı (OEE sorusu duruşa gidiyordu) + test
- [x] 320px: örnek-veri rozeti kırpılmıyor (reset telefonda ikon), ürün adı küçülmüyor; nav sığıyor
- [x] Globe: boyut yalnızca değişince, çizim yalnızca açı değişince (+ ilk 1 sn doku yüklemesi)
- [x] Panel ürünü id ile buluyor (`products[0]` değil)
- [x] Eski yorumlar (particles, home.tsx Principles, D-034 yolu), home.ts baştaki boş satır
- [x] Stop e2e testi eklendi

## Responsive pass (tam tur)
- [x] Programatik denetim: 19 route × 11 viewport (320→1920 + yatay telefon) — yatay taşma,
      kırpılmış/sıkışmış metin, 12px altı cümle, bozuk görsel, 44px altı dokunma hedefi, nav altı
- [x] Görsel denetim: 51 sayfa×genişlik seti (482 dilim), 5 paralel inceleme; yüksek bulgular
      normal viewport'ta doğrulandı (4'ü ekran görüntüsü aracının yapaylığıydı)
- [x] Düzeltmeler: DECISIONS.md D-042 (telefon tabloları, dokunma hedefleri, 404, mockup,
      ürün adı kırılması, grid hizası, akış, tarih sütunu, ekip, başlık girintisi, menü, footer)
- [x] Doğrulama: unit 38/38, DS 47/47, typecheck, build, e2e 18/18 ×3, hedefli ekran görüntüleri
- Kapsam dışı (içerik, responsive değil): KVKK sayfasındaki "metni yazacak kişi için" kutusu
  (bilinçli yer tutucu), blog "Takip edin" formu yok, iletişim sayfasında tekrar eden cümleler,
  ham Unsplash foto kimliği
