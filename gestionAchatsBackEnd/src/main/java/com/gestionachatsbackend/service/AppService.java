package com.gestionachatsbackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gestionachatsbackend.modele.Achat;
import com.gestionachatsbackend.modele.Client;
import com.gestionachatsbackend.modele.Produit;
import com.gestionachatsbackend.repository.AchatRepository;
import com.gestionachatsbackend.repository.ClientRepository;
import com.gestionachatsbackend.repository.ProduitRepository;

@Service
public class AppService {

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private ProduitRepository produitRepository;

    @Autowired
    private AchatRepository achatRepository;

    public Client updateClient(Integer id, Client updatedClient) {
        // Recherche le client existant par son ID
        Client existingClient = clientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Client not found with id: " + id));

        // Met à jour les propriétés du client existant avec les nouvelles valeurs
        existingClient.setNom(updatedClient.getNom());
        existingClient.setPrenom(updatedClient.getPrenom());
        existingClient.setTelephone(updatedClient.getTelephone());

        // Ajoutez d'autres propriétés à mettre à jour selon votre modèle Client

        // Enregistre les modifications dans la base de données
        return clientRepository.save(existingClient);
    }

    public Produit updateProduit(Integer id, Produit updatedProduit) {
        // Recherche le produit existant par son ID
        Produit existingProduit = produitRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("product not found with id: " + id));

        existingProduit.setDesignation(updatedProduit.getDesignation());
        existingProduit.setPrix(updatedProduit.getPrix());

        // Enregistre les modifications dans la base de données
        return produitRepository.save(existingProduit);
    }

    public Achat updateAchat(Integer id, Achat updatedAchat) {
        // Recherche le produit existant par son ID
        Achat existingAchat = achatRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("achat not found with id: " + id));

        existingAchat.setDateAchat(updatedAchat.getDateAchat());
        existingAchat.setIdClient(updatedAchat.getIdClient());
        existingAchat.setIdProduit(updatedAchat.getIdProduit());

        // Enregistre les modifications dans la base de données
        return achatRepository.save(existingAchat);
    }

}
