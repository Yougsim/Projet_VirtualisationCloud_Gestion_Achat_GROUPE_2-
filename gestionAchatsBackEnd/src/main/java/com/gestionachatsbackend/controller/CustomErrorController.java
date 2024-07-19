package com.gestionachatsbackend.controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.web.bind.annotation.RequestMapping;

public class CustomErrorController implements ErrorController {
    private static final String PATH = "/error";

    @RequestMapping(value = PATH)
    public String error() {
        return "Custom Error Message"; // Vous pouvez personnaliser le message d'erreur ici
    }

    public String getErrorPath() {
        return PATH;
    }

}
