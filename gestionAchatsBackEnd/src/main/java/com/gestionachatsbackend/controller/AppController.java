package com.gestionachatsbackend.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.gestionachatsbackend.modele.Client;
import com.gestionachatsbackend.modele.Produit;
import com.gestionachatsbackend.modele.User;
import com.gestionachatsbackend.repository.ClientRepository;
import com.gestionachatsbackend.repository.ProduitRepository;
import com.gestionachatsbackend.repository.UserRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
public class AppController {

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private ClientRepository clientRepo;

	@Autowired
	private ProduitRepository produitRepo;

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

	@GetMapping("/deleteClient/{id}")
	public ResponseEntity<Boolean> deleteClient(@PathVariable(value = "id") Integer id) {
		clientRepo.deleteById(id);
		return null;
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

}
