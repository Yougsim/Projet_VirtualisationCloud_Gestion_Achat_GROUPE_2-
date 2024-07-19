package com.gestionachatsbackend.service;

import java.util.List;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gestionachatsbackend.modele.Client;
import com.gestionachatsbackend.repository.ClientRepository;

@Service
public class ClientService {
    @Autowired
    private ClientRepository clientRepository;

    public List<Client> getAllClients() {
        System.out.println(clientRepository.findAll());
        return clientRepository.findAll();
    }

    public Client getClientById(long id) {
        Optional<Client> optional = clientRepository.findById(id);
        Client client = null;
        if (optional.isPresent()) {
            client = optional.get();
        } else {
            throw new RuntimeException(" Employee not found for id :: " + id);
        }
        return client;
    }

    public void saveClient(Client client) {
        this.clientRepository.save(client);
    }

    public void deleteClientById(long id) {
        this.clientRepository.deleteById(id);
    }
}
