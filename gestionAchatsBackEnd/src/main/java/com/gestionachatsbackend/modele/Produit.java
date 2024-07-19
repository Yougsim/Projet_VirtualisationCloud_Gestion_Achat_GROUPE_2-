package com.gestionachatsbackend.modele;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="produit")
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

	@Override
	public String toString() {
		return "Produit [idProduit=" + idProduit + ", designation=" + designation + ", prix=" + prix + "]";
	}
	
	
}
