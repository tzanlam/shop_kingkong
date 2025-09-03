package bag.configuaration.moreConfig;

import io.github.cdimascio.dotenv.Dotenv;
import jakarta.annotation.PostConstruct;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DotenvConfig {
    public static Dotenv dotenv;
    @PostConstruct
    public void loadDotenv(){
        dotenv = Dotenv.configure()
                .directory("./")
                .ignoreIfMissing()
                .load();
    }

    @Bean
    public static String get(String key) {
        return dotenv.get(key);
    }
}