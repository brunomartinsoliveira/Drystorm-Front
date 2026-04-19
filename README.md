# 🌀 DryStorm — Landing Page Angular 17

Migração e otimização completa da landing page original (HTML/CSS puro) para **Angular 17** com as melhores práticas de performance, reatividade e manutenibilidade.

---

## 🚀 Como Executar

```bash
# Instalar dependências
npm install

# Desenvolvimento (http://localhost:4200)
npm start

# Build de produção
npm run build

# Build para GitHub Pages
npm run build:gh
```

---

## ⚡ Otimizações Aplicadas

### 1. Standalone Components (sem NgModule)
Todos os componentes usam `standalone: true`, eliminando boilerplate de módulos e melhorando tree-shaking.

### 2. ChangeDetectionStrategy.OnPush
Aplicado em **todos** os componentes. O Angular só re-renderiza quando:
- Um `@Input()` muda por referência
- Um `Signal` emite novo valor
- Um evento DOM ocorre no componente

### 3. Angular Signals (Angular 17+)
```ts
// ❌ Antes: BehaviorSubject + async pipe
private _filter$ = new BehaviorSubject<string>('all');
filter$ = this._filter$.asObservable();

// ✅ Depois: Signals — sem subscription, sem memory leak
private _filter = signal<string>('all');
readonly filter = this._filter.asReadonly();
readonly filtered = computed(() => /* recalcula só quando muda */);
```

### 4. @for com trackBy — sem re-render desnecessário
```html
<!-- ❌ Antes: *ngFor sem trackBy → recria todos os elementos -->
<div *ngFor="let p of products">

<!-- ✅ Depois: @for com track → só atualiza o que mudou -->
@for (p of products; track p.id) {
```

### 5. Lazy Loading de Imagens
```html
<img [src]="product.image" loading="lazy" />
<!-- Browser carrega só quando a imagem entra no viewport -->
```

### 6. Pipe Customizado Pure
```ts
@Pipe({ name: 'currencyBr', pure: true })
// → Só executa transform() quando o valor muda, não a cada CD cycle
```

### 7. inject() moderno
```ts
// ❌ Antes (Angular < 14)
constructor(private service: ProductService) {}

// ✅ Depois
readonly service = inject(ProductService);
```

### 8. Animações declarativas
- `fadeInStagger` — cards entram em cascata (80ms delay)
- `cardHover` — state machine `default ↔ hovered` com GPU
- `slideDown` — mobile menu com `:enter/:leave`
- `will-change: transform` — dica ao browser para GPU compositing

### 9. Reactive Forms com validação real
- `Validators.required`, `email`, `minLength`
- Feedback de erro por campo com mensagens personalizadas
- Estado `loading` e `success` via Signals
- Spinner de carregamento no botão

### 10. SEO e Meta Tags
```html
<meta name="description" .../>
<meta property="og:title" .../>
<meta name="theme-color" content="#0a0a0a"/>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
```

### 11. Build de Produção Otimizado (`angular.json`)
```json
"optimization": {
  "scripts": true,
  "styles": { "minify": true, "inlineCritical": true },
  "fonts": { "inline": true }
}
```

---

## 📁 Estrutura de Arquivos

```
src/app/
├── models/
│   └── product.interface.ts      # Tipagem TypeScript
├── services/
│   └── product.service.ts        # Dados + Signals + computed()
├── pipes/
│   └── currency-br.pipe.ts       # Formatação R$ (pure pipe)
├── animations/
│   └── animations.ts             # Todas as animações centralizadas
└── components/
    ├── navbar/                   # Scroll-aware + menu mobile animado
    ├── hero/                     # Seção principal com CTA
    ├── benefits/                 # 6 benefícios do dryfit
    ├── products/                 # Catálogo com filtro reativo
    ├── product-card/             # Card individual com skeleton loader
    ├── contact/                  # Formulário Reactive Forms
    └── footer/
```

---

## 👨‍💻 Autor

Bruno Martins de Oliveira  
[LinkedIn](https://www.linkedin.com/in/brunooliveiradev/)

## 📄 Licença

MIT
