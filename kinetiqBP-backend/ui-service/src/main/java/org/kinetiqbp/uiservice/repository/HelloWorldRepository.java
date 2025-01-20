package org.kinetiqbp.uiservice.repository;

import org.kinetiqbp.uiservice.model.HelloWorld;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HelloWorldRepository extends JpaRepository<HelloWorld, Long> {
}
