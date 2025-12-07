# 🏁 ROSSI AUTO - Concessionaria Premium

Un sito moderno, dinamico e responsivo per una concessionaria automobili con design professionale e UX elevata.

## ✨ Caratteristiche

### 🎨 Design Moderno
- **Dark Mode Premium**: Palette colori elegante con accenti rossi
- **Responsive Design**: Perfetto su desktop, tablet e mobile
- **Animazioni Fluide**: Effetti parallax, hover dinamici, transizioni smooth
- **Gradient Moderni**: Sfondi e effetti visivi di alta qualità

### 🚀 Performance & Interattività
- **Menu Mobile**: Hamburger menu responsivo con animazioni
- **Filtri Dinamici**: Filtra veicoli per categoria in tempo reale
- **Modal Test Drive**: Popup prenotazioni con validazione form
- **Scroll Animations**: Elementi che si animano al passaggio nella viewport
- **Parallax Effects**: Effetto profondità al scroll della hero section

### 🎯 Sezioni Principali

1. **Navigation Bar**
   - Logo con icona
   - Link di navigazione smooth scroll
   - CTA "Prenota Test Drive"
   - Menu responsive mobile

2. **Hero Section**
   - Titolo animato con gradient
   - Background con parallax
   - Effetto mouse-follow sul gradient blur
   - Due CTA buttons primari

3. **Vetrina Veicoli**
   - Grid responsiva con 6 auto in evidenza
   - Filtri per categoria (Tutti, Nuovi, Usati, SUV, Sedan)
   - Hover effects con overlay e immagine che ingrandisce
   - Badge per status (Nuovo/Usato)
   - Specifiche tecniche per ogni veicolo
   - Prezzi e bottone confronta

4. **Servizi**
   - 6 carte servizi con hover animations
   - Icons emoji per visual appeal
   - Descrizioni e link per CTAs

5. **Perché Sceglierci**
   - Lista feature con animazione hover
   - 4 statistiche con animazione counter

6. **Chi Siamo**
   - Descrizione azienda
   - Immagine con hover zoom
   - Bottoni per azioni secondarie

7. **Contatti**
   - Info card con telefono, email, indirizzo, orari
   - Form di contatto con validazione
   - Responsive layout

8. **Footer**
   - Link utili e servizi
   - Social links animati
   - Informazioni aziendali

### 🛠️ Tecnologie Utilizzate

- **HTML5**: Struttura semantica e accessibile
- **CSS3**: 
  - Flexbox e Grid layout
  - CSS Custom Properties (variables)
  - Media queries per responsive
  - Animazioni keyframes
  - Gradient e backdrop filters
- **JavaScript Vanilla**: 
  - No dependencies
  - Event listeners dinamici
  - Intersection Observer API
  - DOM manipulation

### 📱 Responsive Breakpoints

- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: < 768px

### �� Animazioni & Effetti

- **Fade In**: Elementi che appaiono al scroll
- **Slide In**: Transizioni smooth all'ingresso nel viewport
- **Scale Up**: Effetto zoom su hover delle card
- **Parallax**: Background che si muove al scroll
- **Mouse Follow**: Gradient che segue il mouse nella hero
- **Floating**: Animazione infinita del gradient blur
- **Counter**: Numeri che contano al raggiungimento della sezione

### 🔧 Funzionalità JavaScript

1. **Menu Mobile Toggle**
   - Hamburger menu con icona animata
   - Close automatico al click su link

2. **Navbar Sticky**
   - Effetto scroll con shadow dinamica
   - Logo sempre visibile

3. **Modal Test Drive**
   - Apertura/chiusura con ESC
   - Validazione form base
   - Reset dopo submit

4. **Filtri Veicoli**
   - Filtraggio real-time
   - Transizioni smooth
   - Stato attivo visuale

5. **Form Validation**
   - Email validation al blur
   - Visual feedback border color
   - Prevenzione default submit

6. **Smooth Scroll**
   - Scroll behavior smooth per anchor links
   - Active link detection nel nav

7. **Lazy Loading**
   - Immagini caricate solo quando visibili
   - Performance ottimizzata

8. **Statistics Counter**
   - Anima i numeri delle statistiche
   - Triggera quando elemento entra in view

### 🎨 Tavolozza Colori

```
Primario: #1a1a1a (dark)
Secondario: #2d3436 (dark-light)
Accento: #ff6b6b (red)
Accento Light: #ff8787 (red-light)
Testo: #f5f5f5
Testo Scuro: #e0e0e0
Border: rgba(255,255,255,0.1)
```

### 📦 Struttura File

```
/Codecar
├── index.html       (Struttura HTML)
├── styles.css       (Styling con CSS3)
├── script.js        (Interattività JS)
└── README.md        (Questo file)
```

### 🚀 Come Utilizzare

1. **Aprire il sito**: Apri `index.html` in un browser moderno
2. **Navigare**: Usa il menu per scrollare alle diverse sezioni
3. **Testare responsività**: Usa F12 e device tools per mobile/tablet
4. **Prenotare Test Drive**: Clicca "Prenota Test Drive" per aprire modal
5. **Filtrare Veicoli**: Usa i bottoni filtro per categoria

### 🔄 Customizzazione

**Per cambiare i colori:**
```css
:root {
    --accent: #ff6b6b; /* Cambia il colore accent */
    --primary: #1a1a1a; /* Cambia il colore primario */
}
```

**Per aggiungere veicoli:**
```html
<!-- Copia la struttura di una vehicle-card e modifica i dati -->
<div class="vehicle-card" data-category="new suv">
    <!-- ... -->
</div>
```

**Per modificare i servizi:**
```html
<!-- Modifica il contenuto di una service-card -->
<div class="service-card">
    <!-- ... -->
</div>
```

### ⚡ Performance Tips

- Immagini ottimizzate (Unsplash placeholder)
- Lazy loading su immagini
- CSS minificato e organizzato
- JavaScript efficiente senza framework
- Smooth scroll experience

### 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### 📝 Note di Sviluppo

- Il sito usa Unsplash API per le immagini di placeholder
- Form submission mostra alert (può essere collegato a backend)
- Tutti gli effetti hover sono ottimizzati per performance
- Mobile-first approach nel design

### 🎯 Future Enhancements

- [ ] Backend per form submissions
- [ ] Carrello comparazione veicoli
- [ ] Login clienti
- [ ] Configuratore auto personalizzato
- [ ] Integrazione chat live
- [ ] Sistema prenotazioni avanzato
- [ ] Galleria immagini per auto

---

**Creato con ❤️ per una concessionaria premium**
*Design moderno, dinamico e al passo con i tempi*
