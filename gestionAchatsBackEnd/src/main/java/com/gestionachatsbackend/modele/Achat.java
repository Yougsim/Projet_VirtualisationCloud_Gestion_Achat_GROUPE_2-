package com.gestionachatsbackend.modele;

import java.util.ArrayList;
import java.util.Date;
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
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "achat")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "idAchat")
public class Achat {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idAchat;

	@Column
	private Date dateAchat;

	@Column
	private Double montant;

	@ManyToOne(cascade = CascadeType.ALL/* ,fetch = FetchType.EAGER */)
	@JoinColumn(name = "id_client")
	private Client client;

	@OneToMany(mappedBy = "achat", cascade = CascadeType.ALL/* ,fetch = FetchType.EAGER */ )
	private List<Panier> produits = new ArrayList<>();

	public Achat() {
		super();
	}

	public Achat(Integer idAchat, Date dateAchat, Double montant) {
		super();
		this.idAchat = idAchat;
		this.dateAchat = dateAchat;
		this.montant = montant;
	}

	/*
	 * public Achat(Integer idAchat, Date dateAchat, Double montant , Client client
	 * ) { super(); this.idAchat = idAchat; this.dateAchat = dateAchat; this.montant
	 * = montant; this.client = client; }
	 */

	public Achat(Date dateAchat, Double montant/* , Client client */) {
		super();
		this.dateAchat = dateAchat;
		this.montant = montant;
		/* this.client = client; */
	}

	public Achat(Date dateAchat, Double montant, Client client, List<Panier> produits) {
		super();
		this.dateAchat = dateAchat;
		this.montant = montant;
		this.client = client;
		this.produits = produits;
	}

	public Integer getIdAchat() {
		return idAchat;
	}

	public void setIdAchat(Integer idAchat) {
		this.idAchat = idAchat;
	}

	public Date getDateAchat() {
		return dateAchat;
	}

	public void setDateAchat(Date dateAchat) {
		this.dateAchat = dateAchat;
	}

	public Double getMontant() {
		return montant;
	}

	public void setMontant(Double montant) {
		this.montant = montant;
	}

	public Client getClient() {
		return client;
	}

	public void setClient(Client client) {
		this.client = client;
	}

	@Override
	public String toString() {
		return "Achat [idAchat=" + idAchat + ", dateAchat=" + dateAchat + ", montant=" + montant + "]";
	}

	public List<Panier> getProduits() {
		return produits;
	}

	public void setProduits(List<Panier> produits) {
		this.produits = produits;
	}

}
