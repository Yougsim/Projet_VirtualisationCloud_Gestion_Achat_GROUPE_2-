package com.gestionachatsbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gestionachatsbackend.modele.Client;

public interface ClientRepository extends JpaRepository<Client, Long> {

}
