package com.jiotpt.myapp.repository.search;
import com.jiotpt.myapp.domain.Container;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Container} entity.
 */
public interface ContainerSearchRepository extends ElasticsearchRepository<Container, Long> {
}
