package org.kinetiqbp.uiservice.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class HelloWorld {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String message;
}
