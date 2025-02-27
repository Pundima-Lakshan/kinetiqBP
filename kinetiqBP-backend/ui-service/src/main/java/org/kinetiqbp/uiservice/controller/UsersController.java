package org.kinetiqbp.uiservice.controller;

import org.kinetiqbp.uiservice.model.User;
import org.kinetiqbp.uiservice.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
public class UsersController {
    
    private final UsersService usersService;
    
    @Autowired
    public UsersController(UsersService usersService) {
        this.usersService = usersService;
    }
    
    @GetMapping
    public ResponseEntity<List<User>> getUsers() {
        List<User> users = usersService.getUsers();
        return ResponseEntity.ok(users);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable String id) {
        User user = usersService.getUserById(id);
        return ResponseEntity.ok(user);
    }
    
}
