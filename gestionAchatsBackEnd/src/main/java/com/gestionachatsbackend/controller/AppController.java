package com.gestionachatsbackend.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.gestionachatsbackend.modele.Achat;
import com.gestionachatsbackend.modele.Client;
import com.gestionachatsbackend.modele.Produit;
import com.gestionachatsbackend.modele.User;
import com.gestionachatsbackend.repository.AchatRepository;
import com.gestionachatsbackend.repository.ClientRepository;
import com.gestionachatsbackend.repository.ProduitRepository;
import com.gestionachatsbackend.repository.UserRepository;
import com.gestionachatsbackend.service.AppService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
public class AppController {

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private ClientRepository clientRepo;

	@Autowired
	private ProduitRepository produitRepo;

	@Autowired
	private AchatRepository achatRepo;

	@Autowired
	private AppService clientService;

	@Autowired
	private AppService produService;

	@GetMapping("/allUsers")
	public ResponseEntity<List<User>> getAllUsers() {
		try {
			List<User> userList = new ArrayList<>();
			userRepo.findAll().forEach(userList::add);

			if (userList.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(userList, HttpStatus.OK);
		} catch (Exception ex) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/allClients")
	public ResponseEntity<List<Client>> getAllClients() {
		try {
			List<Client> clientList = new ArrayList<>();
			clientRepo.findAll().forEach(clientList::add);

			if (clientList.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(clientList, HttpStatus.OK);
		} catch (Exception ex) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/addClient")
	public ResponseEntity<Client> addClient(@RequestBody Client client) {
		Client clientObj = clientRepo.save(client);

		return new ResponseEntity<>(clientObj, HttpStatus.OK);
	}

	@DeleteMapping("/deleteClient/{id}")
	public ResponseEntity<Void> deleteClient(@PathVariable Integer id) {
		clientRepo.deleteById(id);
		return ResponseEntity.noContent().build();
	}

	@GetMapping("/showClient/{id}")
	public ResponseEntity<Client> showClient(@PathVariable(value = "id") Integer id) {

		Optional<Client> optional = clientRepo.findById(id);
		Client client = null;
		if (optional.isPresent()) {
			client = optional.get();
		} else {
			throw new RuntimeException(" client not found for id :: " + id);
		}

		return new ResponseEntity<>(client, HttpStatus.OK);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Client> updateClient(@PathVariable Integer id, @RequestBody Client updatedClient) {
		try {
			Client updated = clientService.updateClient(id, updatedClient);
			return ResponseEntity.ok(updated);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@GetMapping("/allProduits")
	public ResponseEntity<List<Produit>> getAllProduits() {
		try {
			List<Produit> ProduitList = new ArrayList<>();
			produitRepo.findAll().forEach(ProduitList::add);

			if (ProduitList.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(ProduitList, HttpStatus.OK);
		} catch (Exception ex) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/addProduit")
	public ResponseEntity<Produit> addProduit(@RequestBody Produit Produit) {
		Produit ProduitObj = produitRepo.save(Produit);

		return new ResponseEntity<>(ProduitObj, HttpStatus.OK);
	}

	@DeleteMapping("/deleteProduit/{id}")
	public ResponseEntity<Void> deleteProduit(@PathVariable Integer id) {
		produitRepo.deleteById(id);
		return ResponseEntity.noContent().build();
	}

	@GetMapping("/showProduit/{id}")
	public ResponseEntity<Produit> showProduit(@PathVariable(value = "id") Integer id) {

		Optional<Produit> optional = produitRepo.findById(id);
		Produit produit = null;
		if (optional.isPresent()) {
			produit = optional.get();
		} else {
			throw new RuntimeException(" product not found for id :: " + id);
		}

		return new ResponseEntity<>(produit, HttpStatus.OK);
	}

	@PutMapping("/produit/{id}")
	public ResponseEntity<Produit> updateProduit(@PathVariable Integer id, @RequestBody Produit updateProduit) {
		try {
			Produit updated = produService.updateProduit(id, updateProduit);
			return ResponseEntity.ok(updated);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	///////////////////////// Achat Controller///////////////////////////////
	@GetMapping("/allAchats")
	public ResponseEntity<List<Achat>> getAllAchat() {
		try {
			List<Achat> AchatList = new ArrayList<>();
			achatRepo.findAll().forEach(AchatList::add);
			if (AchatList.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(AchatList, HttpStatus.OK);
		} catch (Exception ex) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@PostMapping("/addAchat")
	public ResponseEntity<Achat> addAchat(@RequestBody Achat achat) {
		Achat achatObj = achatRepo.save(achat);

		return new ResponseEntity<>(achatObj, HttpStatus.OK);
	}

	@DeleteMapping("/deleteAchat/{id}")
	public ResponseEntity<Void> deleteAchat(@PathVariable Integer id) {
		Optional<Achat> optional = achatRepo.findById(id);
		if (optional.isPresent()) {
			achatRepo.deleteById(id);
		} else {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "achat not found for id :: " + id);
		}
		return ResponseEntity.noContent().build();
	}

	@GetMapping("/showAchat/{id}")
	public ResponseEntity<Achat> showAchat(@PathVariable(value = "id") Integer id) {

		Optional<Achat> optional = achatRepo.findById(id);
		Achat achat = null;
		if (optional.isPresent()) {
			achat = optional.get();
		} else {
			throw new RuntimeException(" achat not found for id :: " + id);
		}

		return new ResponseEntity<>(achat, HttpStatus.OK);
	}

	@PutMapping("/achat/{id}")
	public ResponseEntity<Achat> updateAchat(@PathVariable Integer id, @RequestBody Achat updateachat) {
		try {
			Achat updated = produService.updateAchat(id, updateachat);
			return ResponseEntity.ok(updated);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

}
