package ac.at.hcw.bears;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@SpringBootApplication
public class BearsApplication {

	static void main(String[] args) {
		SpringApplication.run(BearsApplication.class, args);
	}

	@Bean
	public RestTemplate restTemplate() {
		RestTemplate restTemplate = new RestTemplate();
		
		ClientHttpRequestInterceptor interceptor = (request, body, execution) -> {
//		 	 wikipedia api requires setting the header `User-Agent`, otherwise 403 status code is returned
//			 "Please set a user-agent and respect our robot policy https://w.wiki/4wJS.
		 	request.getHeaders().add("User-Agent", "BearsApp/1.0 (Educational Project)");
		 	return execution.execute(request, body);
		};

		restTemplate.setInterceptors(List.of(interceptor));
		return restTemplate;
	}

}
