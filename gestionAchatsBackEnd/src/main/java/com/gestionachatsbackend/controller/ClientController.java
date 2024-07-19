package com.gestionachatsbackend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gestionachatsbackend.modele.Client;
import com.gestionachatsbackend.service.ClientService;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

@Controller
@RequestMapping("/client")
public class ClientController {

    private final ClientService clientService;

    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @GetMapping("/tous")
    public String getAllPersons(Model model) {
        List<Client> clients = clientService.getAllClients();
        model.addAttribute("clients", clients);
        System.out.println(clients); // Pour le débogage, imprime les clients récupérés
        return "index"; // Retourne le nom du fichier HTML sans extension (.html dans ce cas)
    }

    @GetMapping("/showFormForUpdate/{id}")
    public String showFormForUpdate(@PathVariable(value = "id") long id, Model model) {

        // get client from the service
        Client client = clientService.getClientById(id);
        System.out.println(client);
        // set client as a model attribute to pre-populate the form
        model.addAttribute("client", client);
        return "modifier";
    }

    @GetMapping("/showNewClientForm")
    public String showNewClientForm(Model model) {
        // create model attribute to bind form data
        Client client = new Client();
        model.addAttribute("client", client);
        return "newClient";
    }

    @GetMapping("/showClient/{id}")
    public String showClient(@PathVariable(value = "id") long id, Model model) {

        // get client from the service
        Client client = clientService.getClientById(id);
        System.out.println(client);
        // set client as a model attribute to pre-populate the form
        model.addAttribute("client", client);
        return "detail";
    }

    @PostMapping("/saveClient")
    public String saveClient(@ModelAttribute("client") Client client) {
        // save client to database
        clientService.saveClient(client);
        return "redirect:/client/tous";
    }

    @GetMapping("/deleteClient/{id}")
    public String deleteClient(@PathVariable(value = "id") long id) {

        this.clientService.deleteClientById(id);
        return "redirect:/client/tous";
    }

}
