import { Repository , DataSource} from "typeorm";
import { User } from "../entities/User";
import { Product } from "../entities/Product";
import { AppDataSource } from "./data-source";

let userRepository: Repository<User>;
let productRepository: Repository<Product>;

export const initializeDatabase = async () => {
    try {
        await AppDataSource.initialize();
        console.log("[✓] BBackerei_backend veritabanına bağlantı başarılı!")
        userRepository = AppDataSource.getRepository(User);
        productRepository = AppDataSource.getRepository(Product);

        // Typeorm altındaki repository den count() methodunu çağırıyoruz .
        const userCount = await userRepository.count();
        if (userCount === 0) {
            //TODO : admin user eklenecek ...
        } else {
            console.log(`[i] BBackerei_backend veritabanında ${userCount} kullanıcı bulundu, veri eklemeye gerek yok.`);
        }

        // Ürün sayısını kontrol et
        const productCount = await productRepository.count();
        console.log(`[i] BBackerei_backend veritabanında ${productCount} ürün bulundu.`);
    } catch (error) {
        if (error.code == 'ER_BAD_DB_ERROR'){
            //Veri tabanı yoksa oluşturmayı dene
            try{
                console.log("[i] BBackerei_backend veritabanı bulunamadı, oluşturuluyor...");
                const tempDataSource = new DataSource({
                    type: "mysql",
                    host: process.env.DB_HOST,
                    port: parseInt(process.env.DB_PORT || "3306"),
                    username: process.env.DB_USER,
                    password: process.env.DB_PASSWORD
                });

                await tempDataSource.initialize();
                await tempDataSource.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
                await tempDataSource.destroy();

                // Yeni veritabanıyla tekrar bağlan
                await AppDataSource.initialize();
                console.log("[✓] BBackerei_backend veritabanı başarıyla oluşturuldu!");

                // Repository'leri ayarla
                userRepository = AppDataSource.getRepository(User);
                productRepository = AppDataSource.getRepository(Product);
                //TODO : admin user eklenecek ...
            }catch (dbError) {
                console.error("[X] BBackerei_backend veritabanı oluşturma hatası:", dbError);
                process.exit(1);
            }
        }
    }
}

export const getUserRepository = () => userRepository;
export const getProductRepository = () => productRepository;
