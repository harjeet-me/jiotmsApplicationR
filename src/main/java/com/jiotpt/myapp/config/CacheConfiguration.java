package com.jiotpt.myapp.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import org.hibernate.cache.jcache.ConfigSettings;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache = jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, com.jiotpt.myapp.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, com.jiotpt.myapp.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, com.jiotpt.myapp.domain.User.class.getName());
            createCache(cm, com.jiotpt.myapp.domain.Authority.class.getName());
            createCache(cm, com.jiotpt.myapp.domain.User.class.getName() + ".authorities");
            createCache(cm, com.jiotpt.myapp.domain.Booking.class.getName());
            createCache(cm, com.jiotpt.myapp.domain.Booking.class.getName() + ".bookingItems");
            createCache(cm, com.jiotpt.myapp.domain.Invoice.class.getName());
            createCache(cm, com.jiotpt.myapp.domain.InvoiceItem.class.getName());
            createCache(cm, com.jiotpt.myapp.domain.Insurance.class.getName());
            createCache(cm, com.jiotpt.myapp.domain.Contact.class.getName());
            createCache(cm, com.jiotpt.myapp.domain.BookingItem.class.getName());
            createCache(cm, com.jiotpt.myapp.domain.Equipment.class.getName());
            createCache(cm, com.jiotpt.myapp.domain.Customer.class.getName());
            createCache(cm, com.jiotpt.myapp.domain.Customer.class.getName() + ".bookings");
            createCache(cm, com.jiotpt.myapp.domain.Vendor.class.getName());
            createCache(cm, com.jiotpt.myapp.domain.Container.class.getName());
            createCache(cm, com.jiotpt.myapp.domain.Driver.class.getName());
            createCache(cm, com.jiotpt.myapp.domain.Driver.class.getName() + ".bookingItems");
            createCache(cm, com.jiotpt.myapp.domain.Location.class.getName());
            createCache(cm, com.jiotpt.myapp.domain.Region.class.getName());
            createCache(cm, com.jiotpt.myapp.domain.Country.class.getName());
            createCache(cm, com.jiotpt.myapp.domain.Department.class.getName());
            createCache(cm, com.jiotpt.myapp.domain.Department.class.getName() + ".employees");
            createCache(cm, com.jiotpt.myapp.domain.Task.class.getName());
            createCache(cm, com.jiotpt.myapp.domain.Task.class.getName() + ".jobs");
            createCache(cm, com.jiotpt.myapp.domain.Employee.class.getName());
            createCache(cm, com.jiotpt.myapp.domain.Employee.class.getName() + ".jobs");
            createCache(cm, com.jiotpt.myapp.domain.Job.class.getName());
            createCache(cm, com.jiotpt.myapp.domain.Job.class.getName() + ".tasks");
            createCache(cm, com.jiotpt.myapp.domain.JobHistory.class.getName());
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache != null) {
            cm.destroyCache(cacheName);
        }
        cm.createCache(cacheName, jcacheConfiguration);
    }
}
