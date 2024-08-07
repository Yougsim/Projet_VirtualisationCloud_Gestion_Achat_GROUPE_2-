package com.gestionachatsbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gestionachatsbackend.modele.Panier;

@Repository
public interface PanierRepository extends JpaRepository<Panier, Integer>{

}
