package hu.flowacademy.konyhatunder.swagger;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import static springfox.documentation.builders.PathSelectors.regex;

@Configuration
@EnableSwagger2
public class SwaggerConfig {
    @Bean
    public Docket productApi() {
        return new Docket(DocumentationType.SWAGGER_2)
                .select()
                .apis(RequestHandlerSelectors.basePackage("hu.flowacademy.konyhatunder.controller"))
                .paths(regex("/api/.*"))
                .build()
                .apiInfo(metaData());
    }
    private ApiInfo metaData() {
        ApiInfo apiInfo = new ApiInfo(
                "Konyhatündér App API Endpoints",
                "You can see here the endpoint responses in JSON format",
                "1.0",
                "Terms of service",
                new Contact("Jonka, Márton, Imre, Péter, Tamás", " https://abstract-arc-112422.web.app/", "test@test.com"),
                "Flow License 2021",
                " https://abstract-arc-112422.web.app/");
        return apiInfo;
    }
}