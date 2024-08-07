package com.gestionachatsbackend.modele;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;

@Entity
@Table(name = "panier")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "idPanier")
public class Panier {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idPanier;
	
	@Column
	private Integer quantite;
	
	@Transient
	public Integer id_produit;
	
	@ManyToOne(cascade = CascadeType.ALL /* ,fetch = FetchType.LAZY */ )
    @JoinColumn(name = "id_achat")
    private Achat achat;
	
	@ManyToOne(cascade = CascadeType.ALL /* , fetch = FetchType.EAGER */ )
    @JoinColumn(name = "id_produit")
    private Produit produit;
	
	public Panier() {
		super();
	}


	public Panier(Integer idPanier, Integer quantite) {
		super();
		this.idPanier = idPanier;
		this.quantite = quantite;
	}
	
	

	public Panier(Integer quantite, Produit produit) {
		super();
		this.quantite = quantite;
		this.produit = produit;
	}


	public Panier(Integer quantite, Achat achat) {
		super();
		this.quantite = quantite;
		this.achat = achat;
	}
	
	


	public Integer getIdPanier() {
		return idPanier;
	}

	public void setIdPanier(Integer idPanier) {
		this.idPanier = idPanier;
	}

	public Integer getQuantite() {
		return quantite;
	}

	public void setQuantite(Integer quantite) {
		this.quantite = quantite;
	}

	public Achat getAchat() {
		return achat;
	}

	public void setAchat(Achat achat) {
		this.achat = achat;
	}

	public Produit getProduit() {
		return produit;
	}

	public void setProduit(Produit produit) {
		this.produit = produit;
	}

	@Override
	public String toString() {
		return "Panier [idPanier=" + idPanier + ", quantite=" + quantite + ", achat=" + achat + ", produit=" + produit
				+ "]";
	}
	
	
	
}
