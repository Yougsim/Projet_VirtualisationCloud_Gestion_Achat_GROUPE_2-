package com.gestionachatsbackend.controller;

import java.util.ArrayList;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jackson.JsonObjectDeserializer;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gestionachatsbackend.modele.Achat;
import com.gestionachatsbackend.modele.Client;
import com.gestionachatsbackend.modele.Panier;
import com.gestionachatsbackend.modele.Produit;
import com.gestionachatsbackend.modele.User;
import com.gestionachatsbackend.repository.AchatRepository;
import com.gestionachatsbackend.repository.ClientRepository;
import com.gestionachatsbackend.repository.PanierRepository;
import com.gestionachatsbackend.repository.ProduitRepository;
import com.gestionachatsbackend.repository.UserRepository;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@CrossOrigin(origins = "*")
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
	private PanierRepository panierRepo;
	
	
	@GetMapping("/allUsers")
	public ResponseEntity<List<User>> getAllUsers(){
		try {
			List<User> userList = new ArrayList<>();
			userRepo.findAll().forEach(userList::add);
			
			if (userList.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			
			return new ResponseEntity<>(userList,HttpStatus.OK);
		} catch (Exception ex) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	
	@GetMapping("/allClients")
	public ResponseEntity<List<Client>> getAllClients(){
		try {
			List<Client> clientList =new ArrayList<>();
			clientRepo.findAll().forEach((client)->{
				List<Achat> achatList =new ArrayList<>();
				client.getAchats().forEach((achat)->{
					achatList.add(new Achat(achat.getIdAchat(),achat.getDateAchat(),achat.getMontant()));
				});
				
				Client currentClient = new Client(client.getidClient(),client.getNom(),client.getPrenom(),client.getTelephone());
				currentClient.setAchats(achatList);
				clientList.add(currentClient);
				 
			});
			
			
			if (clientList.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			
			return new ResponseEntity<>(clientList,HttpStatus.OK);
		} catch (Exception ex) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	
	@PostMapping("/addClient")
	public ResponseEntity<Client> addClient(@RequestBody Client client) {
		Client clientObj = clientRepo.save(client);
		
		return new ResponseEntity<>(clientObj,HttpStatus.OK);
	}
	
	
	@GetMapping("/allProduits")
	public ResponseEntity<List<Produit>> getAllProduits(){
		try {
			List<Produit> ProduitList = new ArrayList<>();
			//produitRepo.findAll().forEach(ProduitList::add);
			
			produitRepo.findAll().forEach((produit)->{
				Produit currentProduit= new Produit(produit.getIdProduit(),produit.getDesignation(),produit.getPrix());
				
				//currentAchat.setProduits(achat.getProduits());
				List<Panier> panierList = new ArrayList<>();
				produit.getAchats().forEach((achat)->{
					Panier panier = new Panier(achat.getQuantite(),new Achat(achat.getAchat().getIdAchat(),achat.getAchat().getDateAchat(),achat.getAchat().getMontant()));
					panierList.add(panier);
				});
				currentProduit.setAchats(panierList);
				ProduitList.add(currentProduit);
				 
			});
			
			if (ProduitList.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			
			return new ResponseEntity<>(ProduitList,HttpStatus.OK);
		} catch (Exception ex) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	
	@PostMapping("/addProduit")
	public ResponseEntity<Produit> addProduit(@RequestBody Produit Produit) {
		Produit ProduitObj = produitRepo.save(Produit);
		
		return new ResponseEntity<>(ProduitObj,HttpStatus.OK);
	}
	
	@PostMapping("/addAchat/{idClient}")
	public ResponseEntity<Achat>  addAchat(@PathVariable int idClient,@RequestBody Achat achat) throws Exception {
		System.out.println(achat.getProduits());
		Client client = clientRepo.findById(idClient).get();
		Achat achatTosave = new Achat(achat.getDateAchat(), achat.getMontant()/*, achat.getProduits()*/);
		achatTosave.setClient(client);
		achatTosave.setProduits(achat.getProduits());
		Achat achatSaved = achatRepo.save(achatTosave);
		
		
		
		achat.getProduits().forEach((panier) -> {
			
			Panier panierTosave = new Panier();
			panierTosave.setQuantite(panier.getQuantite());
			panierTosave.setAchat(achatTosave);
			//System.out.println(panier.id_produit);
			panierTosave.setProduit(produitRepo.findById(panier.id_produit).get());
			System.out.println(panierTosave);
			panierRepo.save(panierTosave);
			//panier.setProduit(produitRepo.findById(panier.));
		});
		
		
		return new ResponseEntity<>(achatTosave, HttpStatus.OK);
	}
	
	@GetMapping("/allAchats")
	public ResponseEntity<List<Achat>> allAchats() throws Exception {
		try {
			
			List<Achat> AchatList = new ArrayList<>();
			//System.out.println(AchatList.get(3));
			//achatRepo.findAll().forEach(AchatList::add);
			
			achatRepo.findAll().forEach((achat)->{
				Achat currentAchat = new Achat(achat.getIdAchat(),achat.getDateAchat(),achat.getMontant());
				currentAchat.setClient(new Client(achat.getClient().getidClient(),achat.getClient().getNom(),achat.getClient().getPrenom(),achat.getClient().getTelephone()));
				
				//currentAchat.setProduits(achat.getProduits());
				List<Panier> panierList = new ArrayList<>();
				achat.getProduits().forEach((produit)->{
					Panier panier = new Panier(produit.getQuantite(),new Produit(produit.getProduit().getIdProduit(),produit.getProduit().getDesignation(),produit.getProduit().getPrix()));
					panierList.add(panier);
				});
				currentAchat.setProduits(panierList);
				AchatList.add(currentAchat);
			});
			
			if (AchatList.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			
			return new ResponseEntity<>(AchatList,HttpStatus.OK);
		} catch (Exception ex) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	
	@PostMapping("/process")
	public void process(@RequestBody String payload) throws Exception {
		System.out.println(payload);
		//JsonObjectDeserializer json = new JsonObjectDeserializer(string); 
		//JsonObject jsonObject = JsonParser.parseString(payload).getAsJsonObject();
		//Gson gson = new Gson();
		//Gson gson = gson.toJson(payload); 
		//System.out.println(jsonObject.get("nom"));
		JSONObject js = new JSONObject(payload.toString());
		//ObjectMapper mapper = new ObjectMapper();
		//Object c = mapper.readValue(payload, Achat.class);
		System.out.println(js.get("dateAchat"));

	}
	
}
