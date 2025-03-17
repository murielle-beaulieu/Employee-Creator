package io.nology.employee_creator.config;

import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.spi.MappingContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfig {

  @Bean
  public ModelMapper modelMapper() {
    ModelMapper mapper = new ModelMapper();
    // if what you're trying to map is null, skip it
    mapper.getConfiguration().setSkipNullEnabled(true);
    mapper.typeMap(String.class, String.class).setConverter(new StringTrimConverter());
    return mapper;
  }

  private class StringTrimConverter implements Converter<String, String> {

    @Override
    public String convert(MappingContext<String, String> context) {
      if (context.getSource() == null) {
        return null;
      }
      return context.getSource().trim();
    }
  }
}
