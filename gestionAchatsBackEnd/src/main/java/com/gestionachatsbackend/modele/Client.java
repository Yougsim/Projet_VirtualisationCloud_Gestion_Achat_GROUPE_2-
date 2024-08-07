package com.gestionachatsbackend.modele;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerator;
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
@Table(name="client")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "idClient")
public class Client {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int idClient;
	
	@Column
	private String nom;
	
	@Column
	private String prenom;
	
	@Column
	private String telephone;
	
	@OneToMany(mappedBy = "client", /* fetch = FetchType.EAGER , */ cascade =CascadeType.ALL )
    private List<Achat> achats  = new ArrayList<>();

	public Client() {
		super();
	}
	
	public Client(int idClient, String nom, String prenom, String telephone) {
		super();
		this.idClient = idClient;
		this.nom = nom;
		this.prenom = prenom;
		this.telephone = telephone;
	}
	

	public int getidClient() {
		return idClient;
	}

	public void setidClient(int idClient) {
		this.idClient = idClient;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getPrenom() {
		return prenom;
	}

	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}
	

	public List<Achat> getAchats() {
		return achats;
	}

	public void setAchats(List<Achat> achats) {
		this.achats = achats;
	}

	@Override
	public String toString() {
		return "Client [idClient=" + idClient + ", nom=" + nom + ", prenom=" + prenom + ", telephone=" + telephone + "]";
	}
	
	
}
