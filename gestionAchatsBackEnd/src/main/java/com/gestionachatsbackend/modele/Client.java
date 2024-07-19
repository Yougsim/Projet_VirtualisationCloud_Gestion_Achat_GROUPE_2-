package com.gestionachatsbackend.modele;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "client")

public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "nom")
    private String nom;

    @Column(name = "prenom")
    private String prenom;

    @Column(name = "type")
    private String type;

    @Column(name = "email")
    private String email;

    @Column(name = "telephone")
    private String telephone;

    @Column(name = "pays")
    private String pays;

    @Column(name = "ville")
    private String ville;

    @Column(name = "dateCreation")
    private String dateCreation;

    @Column(name = "domaine")
    private String domaine;

    @Column(name = "categorie")
    private String categorie;

}