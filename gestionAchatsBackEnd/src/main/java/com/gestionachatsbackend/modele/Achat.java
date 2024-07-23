package com.gestionachatsbackend.modele;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "achat")
public class Achat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idAchat;

    @Column
    private Integer idProduit;

    @Column
    private Integer idClient;

    @Column
    private Date dateAchat;

    public Achat() {
        super();
    }

    public Achat(Integer idAchat, Integer idProduit, Integer idClient, Date dateAchat) {
        super();
        this.idAchat = idAchat;
        this.idProduit = idProduit;
        this.idClient = idClient;
        this.dateAchat = dateAchat;
    }

    public Integer getIdAchat() {
        return this.idAchat;
    }

    public void setIdAchat(Integer idAchat) {
        this.idAchat = idAchat;
    }

    public Integer getIdProduit() {
        return this.idProduit;
    }

    public void setIdProduit(Integer idProduit) {
        this.idProduit = idProduit;
    }

    public Integer getIdClient() {
        return this.idClient;
    }

    public void setIdClient(Integer idClient) {
        this.idClient = idClient;
    }

    public Date getDateAchat() {
        return this.dateAchat;
    }

    public void setDateAchat(Date dateAchat) {
        this.dateAchat = dateAchat;
    }

}
