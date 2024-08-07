package com.gestionachatsbackend.modele;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="produit")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "idProduit")
public class Produit {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int idProduit;
	
	@Column
	private String designation;
	
	@Column
	private Double prix;

	public Produit() {
		super();
	}
	
	@OneToMany(mappedBy = "produit"/* , fetch = FetchType.LAZY */, cascade =CascadeType.ALL )
    private List<Panier> achats  = new ArrayList<>();
	
	public Produit(int idProduit, String designation, Double prix) {
		super();
		this.idProduit = idProduit;
		this.designation = designation;
		this.prix = prix;
	}


	public int getIdProduit() {
		return idProduit;
	}


	public void setIdProduit(int idProduit) {
		this.idProduit = idProduit;
	}


	public String getDesignation() {
		return designation;
	}


	public void setDesignation(String designation) {
		this.designation = designation;
	}


	public Double getPrix() {
		return prix;
	}


	public void setPrix(Double prix) {
		this.prix = prix;
	}
	
	

	public List<Panier> getAchats() {
		return achats;
	}


	public void setAchats(List<Panier> achats) {
		this.achats = achats;
	}


	@Override
	public String toString() {
		return "Produit [idProduit=" + idProduit + ", designation=" + designation + ", prix=" + prix + "]";
	}
	
	
}
