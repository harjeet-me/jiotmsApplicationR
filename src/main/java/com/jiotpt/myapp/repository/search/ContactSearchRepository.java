package com.jiotpt.myapp.repository.search;
import com.jiotpt.myapp.domain.Contact;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Contact} entity.
 */
public interface ContactSearchRepository extends ElasticsearchRepository<Contact, Long> {
}
