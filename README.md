# BBackerei Backend

## Proje Açıklaması
BBackerei, Express.js ve TypeScript kullanılarak geliştirilmiş, bir fırın yönetim sistemi için tasarlanmış güçlü bir backend uygulamasıdır. Uygulama, modern web geliştirme standartlarını takip eden, güvenli ve ölçeklenebilir bir mimari üzerine inşa edilmiştir.

## Kullanılan Teknolojiler ve Paketler
- **Node.js ve Express.js (5.1.0)**: Web sunucusu ve API çerçevesi
- **TypeScript (5.8.3)**: Tip güvenliği sağlayan JavaScript süper kümesi
- **TypeORM (0.3.24)**: Nesne-İlişkisel Eşleme (ORM) kütüphanesi
- **MySQL2 (3.14.1)**: Veritabanı yönetim sistemi
- **bcrypt-ts (7.0.0)**: Şifre hashleme kütüphanesi
- **reflect-metadata (0.2.2)**: Dekoratörler için meta veri desteği
- **express-rate-limit (7.5.0)**: API isteklerini sınırlandırma
- **helmet (8.1.0)**: HTTP güvenlik başlıkları için middleware
- **cors (2.8.5)**: Cross-Origin Resource Sharing desteği
- **dotenv (16.5.0)**: Ortam değişkenleri yönetimi
- **ts-node (10.9.2)**: TypeScript dosyalarını doğrudan çalıştırma
- **nodemon (3.1.10)**: Otomatik sunucu yeniden başlatma

## Mimari Pattern

Proje, yazılım mühendisliğinin en iyi uygulamalarını takip eden birden fazla mimari pattern kullanmaktadır:

### 1. Katmanlı Mimari (Layered Architecture)
Uygulama, sorumlulukları açıkça tanımlanmış katmanlara bölünmüştür:

- **Presentation Layer**: HTTP isteklerini karşılayan kontrolcü katmanı (/src/controllers)
- **Business Logic Layer**: İş mantığını içeren servis katmanı (/src/services)
- **Data Access Layer**: Veritabanı işlemlerini yöneten repository katmanı (/src/repositories)
- **Entity Layer**: Veri modellerini içeren katman (/src/entities)

### 2. MVC (Model-View-Controller) Pattern
Backend API olduğu için klasik MVC'nin bir adaptasyonu uygulanmıştır:

- **Model**: TypeORM entity sınıfları veri modelini temsil eder (/src/entities)
- **View**: Frontend yerine JSON yanıtları kullanılmaktadır
- **Controller**: İstekleri karşılar, servisleri çağırır ve yanıt döner (/src/controllers)

### 3. Repository Pattern
Veri erişim katmanını soyutlar, bu sayede:

- Veri erişim detayları uygulama mantığından izole edilir
- Veritabanı operasyonları için tutarlı bir API sağlanır
- Test edilebilirlik artırılır
- `/src/repositories` altında interface ve implementasyonlar bulunur

### 4. Dependency Injection Pattern
Nesneler arası bağımlılıklar dışarıdan enjekte edilir:

- Repository'ler service'lere enjekte edilir
- Service'ler controller'lara enjekte edilir
- Bağımlılıklar daha kolay mock edilebilir (test için)

### 5. DTO (Data Transfer Object) Pattern
- İstemci ve sunucu arasında veri transferi için özel nesneler kullanılır
- Entity'lerin doğrudan dışa açılması engellenir
- İstek ve yanıtlar için ayrı DTO sınıfları tanımlanmıştır (/src/dtos)

### 6. Middleware Pattern
- İstek-yanıt döngüsünü işlemden önce veya sonra değiştirmek için kullanılır
- Hata işleme, kimlik doğrulama, yetkilendirme, loglama vb. için middleware'ler kullanılmıştır
- `/src/middlewares` altında tanımlanmıştır

### 7. Error Handling Pattern
Merkezi bir hata işleme stratejisi kullanılmaktadır:
- Özel hata tipleri (`ValidationError`, `NotFoundError` vb.)
- Async handler ile tüm Promise hataları yakalanır
- Hata tiplerine göre uygun HTTP yanıtları döndürülür

### 8. Singleton Pattern
Veritabanı bağlantısı gibi kaynak yoğun nesneler için:
- Tek bir instance oluşturulur ve paylaşılır
- Örnek: Veritabanı bağlantısı ve repository provider'lar

## API Endpoints

API, RESTful prensiplerine uygun olarak tasarlanmıştır ve aşağıdaki endpointleri sunar:

### Kullanıcı Endpointleri

| Metot   | Endpoint        | Açıklama                         | İstek Gövdesi                              | Yanıt                                  |
|---------|-----------------|----------------------------------|-------------------------------------------|----------------------------------------|
| GET     | /api/users      | Tüm kullanıcıları listeler       | -                                         | Kullanıcı nesneleri dizisi             |
| GET     | /api/users/:id  | ID'ye göre kullanıcı getirir     | -                                         | Tek kullanıcı nesnesi                  |
| POST    | /api/users      | Yeni kullanıcı oluşturur         | {firstName, lastName, password, address}  | Oluşturulan kullanıcı                  |
| PUT     | /api/users/:id  | Kullanıcı bilgilerini günceller  | {firstName?, lastName?, address?}         | Güncellenmiş kullanıcı                 |
| DELETE  | /api/users/:id  | Kullanıcıyı siler                | -                                         | Başarı mesajı                          |

### Kimlik Doğrulama Endpointleri (Planlanan)

| Metot   | Endpoint               | Açıklama                        | İstek Gövdesi                       | Yanıt                              |
|---------|------------------------|---------------------------------|------------------------------------|------------------------------------|
| POST    | /api/auth/login        | Kullanıcı girişi                | {email, password}                  | {user, token}                      |
| POST    | /api/auth/register     | Yeni kullanıcı kaydı            | {email, password, name}            | {user, token}                      |
| POST    | /api/auth/refresh      | Access token yenileme           | {refreshToken}                     | {accessToken, refreshToken}        |
| POST    | /api/auth/logout       | Kullanıcı çıkışı                | {token}                            | Başarı mesajı                      |
| GET     | /api/auth/me           | Mevcut kullanıcı bilgisi        | -                                  | Kullanıcı bilgileri                |

### Ürün Endpointleri (Planlanan)

| Metot   | Endpoint               | Açıklama                        | İstek Gövdesi                       | Yanıt                              |
|---------|------------------------|---------------------------------|------------------------------------|------------------------------------|
| GET     | /api/products          | Tüm ürünleri listeler           | -                                  | Ürün nesneleri dizisi              |
| GET     | /api/products/:id      | ID'ye göre ürün getirir         | -                                  | Tek ürün nesnesi                   |
| POST    | /api/products          | Yeni ürün oluşturur             | {name, price, category, stock}     | Oluşturulan ürün                   |
| PUT     | /api/products/:id      | Ürün bilgilerini günceller      | {name?, price?, category?, stock?} | Güncellenmiş ürün                  |
| DELETE  | /api/products/:id      | Ürünü siler                     | -                                  | Başarı mesajı                      |
| GET     | /api/products/category/:category | Kategoriye göre ürünleri listeler | - | Ürün nesneleri dizisi |
