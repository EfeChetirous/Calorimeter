# Project Rules: Kalorimetre Uygulaması

## 📋 Project Overview
- **Project Name**: Kalorimetre Uygulaması
- **Technologies**: Ionic Framework + Angular + Capacitor (Frontend), .NET Core Web API (Backend), JWT Authentication
- **Goal**: Kullanıcının günlük aldığı kalori miktarını hesaplayan, gıda verilerini görselleştiren, geçmişi raporlayan ve güvenli JWT kimlik doğrulaması kullanan bir sistem oluşturmak.

---

## 🎯 General Rules

### Code Quality & Structure
- Kod yapısı **temiz, modüler ve maintainable** olmalıdır
- Angular best practice'lerine uygun kod yazılmalıdır
- TypeScript strict mode aktif olmalıdır
- Tüm component, service, model dosyaları modüler dizin yapısında yer almalıdır
- Değişken, fonksiyon ve sınıf adları **İngilizce**, açıklama satırları **Türkçe** olmalıdır

### Frontend-Backend Communication
- Frontend ile backend arası iletişim **RESTful API** ile yapılmalıdır
- **JWT Authentication** ile güvenli hale getirilmelidir
- API endpoint'leri tutarlı naming convention kullanmalıdır
- Error handling ve loading states her API çağrısında implement edilmelidir

---

## 🔒 Authentication Rules (JWT)

### Login Process
- Kullanıcı girişi `/api/auth/registerAndLogin` endpoint'i e-posta ve şifre alır
- Backend .NET Core tarafında JWT token üretilir:
  - Token payload'ında `UserId`, `Email`, `Role`, `Exp` alanları bulunur
  - Token süresi (`expires_in`) **1 saat** olarak belirlenir
- Login sonrası token, frontend tarafında **Ionic Storage** içine kaydedilir

### Token Management
- Her API isteğinde Authorization header şu formatta gönderilir:
  ```
  Authorization: Bearer <jwt_token>
  ```
- Token süresi dolduğunda otomatik refresh mekanizması implement edilmelidir
- Logout işleminde token storage'dan temizlenmelidir

### Security Rules
- Şifreler backend'de hash'lenerek saklanmalıdır
- API endpoint'leri role-based authorization kullanmalıdır
- Sensitive data localStorage yerine secure storage kullanılmalıdır

---

## 📱 Frontend Architecture Rules

### Component Structure
```
src/app/
├── components/          # Reusable components
├── pages/              # Page components
├── services/           # Business logic services
├── models/             # TypeScript interfaces/models
├── guards/             # Route guards
├── interceptors/       # HTTP interceptors
└── utils/              # Utility functions
```

### Service Rules
- Her API endpoint için ayrı service method'u oluşturulmalıdır
- Service'ler singleton pattern kullanmalıdır
- Error handling service seviyesinde implement edilmelidir
- Loading state management service'lerde yapılmalıdır

### Component Rules
- Component'ler single responsibility principle'a uymalıdır
- Input/Output property'leri type-safe olmalıdır
- Lifecycle hook'ları doğru şekilde kullanılmalıdır
- Component'ler test edilebilir olmalıdır

---

## 🍽️ Meal Management Rules

### Data Models
```typescript
interface Meal {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  photo?: string;
  notes?: string;
  timestamp: Date;
  userId: string;
}

interface FoodItem {
  id: string;
  name: string;
  caloriesPer100g: number;
  proteinPer100g: number;
  carbsPer100g: number;
  fatPer100g: number;
  category: string;
}
```

### API Endpoints
- `GET /api/meals` - Kullanıcının öğünlerini listele
- `POST /api/meals` - Yeni öğün ekle
- `PUT /api/meals/{id}` - Öğün güncelle
- `DELETE /api/meals/{id}` - Öğün sil
- `GET /api/foods` - Gıda veritabanından arama

### Photo Management
- Kamera ile çekilen fotoğraflar base64 formatında saklanmalıdır
- Fotoğraf boyutu optimize edilmelidir (max 2MB)
- Fotoğraf upload için progress indicator gösterilmelidir

---

## 📊 Data Visualization Rules

### Charts & Graphs
- Günlük kalori alımı için line chart
- Makro besin dağılımı için pie chart
- Haftalık/aylık trend analizi için bar chart
- Chart.js veya ng2-charts kullanılmalıdır

### Reporting Features
- Günlük/haftalık/aylık raporlar
- Kalori hedefi vs gerçek alım karşılaştırması
- Makro besin analizi
- Export functionality (PDF/Excel)

---

## 🎨 UI/UX Rules

### Design System
- Ionic components kullanılmalıdır
- Consistent color palette uygulanmalıdır
- Responsive design mobile-first yaklaşımı
- Dark/Light theme support

### User Experience
- Loading states her async operation için gösterilmelidir
- Error messages kullanıcı dostu olmalıdır
- Form validation real-time yapılmalıdır
- Offline support için service worker implement edilmelidir

### Navigation
- Ionic Router kullanılmalıdır
- Route guards authentication için implement edilmelidir
- Deep linking support sağlanmalıdır

---

## 🧪 Testing Rules

### Unit Testing
- Her service için unit test yazılmalıdır
- Component'ler için test coverage %80+ olmalıdır
- Jest veya Jasmine framework kullanılmalıdır

### Integration Testing
- API integration testleri yazılmalıdır
- E2E testleri kritik user flow'lar için implement edilmelidir

---

## 📦 Build & Deployment Rules

### Development
- `npm run start` - Development server
- `npm run build` - Production build
- `npm run test` - Unit tests
- `npm run lint` - Code linting

### Production
- Environment variables ile configuration management
- API base URL production/development için ayrı
- Error logging production'da aktif
- Performance monitoring implement edilmelidir

---

## 🔧 Development Workflow

### Git Rules
- Feature branch'ler kullanılmalıdır
- Commit message'lar conventional commits formatında olmalıdır
- Pull request'ler code review'dan geçmelidir
- Main branch'e direkt commit yasaktır

### Code Review Checklist
- [ ] TypeScript strict mode compliance
- [ ] Error handling implement edilmiş
- [ ] Loading states eklenmiş
- [ ] Unit testler yazılmış
- [ ] Code documentation güncellenmiş
- [ ] Performance optimization yapılmış

---

## 📚 Documentation Rules

### Code Documentation
- Her public method için JSDoc comment
- Complex business logic için inline comment
- API endpoint'leri için Swagger documentation
- README.md dosyası güncel tutulmalıdır

### User Documentation
- User manual hazırlanmalıdır
- FAQ section eklenmelidir
- Video tutorial'lar hazırlanmalıdır

---

## 🚀 Performance Rules

### Frontend Optimization
- Lazy loading implement edilmelidir
- Image optimization yapılmalıdır
- Bundle size minimize edilmelidir
- Caching strategy implement edilmelidir

### Backend Optimization
- Database query optimization
- Response compression
- Rate limiting implement edilmelidir
- Caching layer eklenmelidir

---

## 🔍 Monitoring & Analytics

### Error Tracking
- Sentry veya benzeri error tracking tool
- User action tracking
- Performance metrics collection

### Analytics
- User engagement metrics
- Feature usage statistics
- Conversion funnel analysis

---

## 📋 Compliance & Security

### Data Protection
- GDPR compliance
- KVKK compliance (Türkiye)
- Data encryption at rest and in transit
- Regular security audits

### Privacy
- User consent management
- Data retention policies
- Right to be forgotten implementation
- Privacy policy güncel tutulmalıdır

---

*Bu project rules dosyası proje geliştirme sürecinde rehber olarak kullanılmalı ve gerektiğinde güncellenmelidir.*
