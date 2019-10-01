package com.jiotpt.myapp.repository.search;
import com.jiotpt.myapp.domain.Booking;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Booking} entity.
 */
public interface BookingSearchRepository extends ElasticsearchRepository<Booking, Long> {
}
