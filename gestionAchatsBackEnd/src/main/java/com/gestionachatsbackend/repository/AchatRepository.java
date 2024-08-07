package com.gestionachatsbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gestionachatsbackend.modele.Achat;

@Repository
public interface AchatRepository extends JpaRepository<Achat, Integer> {

}
