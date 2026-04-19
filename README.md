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

<img width="1919" height="1029" alt="drystormfront1" src="https://github.com/user-attachments/assets/f49a7467-f6f8-4517-bc2a-46b4363f6403" />
<img width="1919" height="1033" alt="drystormfront2" src="https://github.com/user-attachments/assets/e050f502-4bdd-4b69-9a6b-425f47eaa0db" />
<img width="1919" height="1027" alt="drystormfront3" src="https://github.com/user-attachments/assets/9a823f9c-fabe-4c61-ac6e-2353b6f8a178" />
<img width="1919" height="1030" alt="drystormfront4" src="https://github.com/user-attachments/assets/ad042de1-4fbf-414f-b4bc-c74bea3104b0" />

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