package org.kinetiqbp.uiservice.service;

import org.kinetiqbp.uiservice.model.User;
import org.kinetiqbp.uiservice.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsersService {
    UsersRepository usersRepository;
   
    @Autowired
    public UsersService(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }
    
    public List<User> getUsers() {
        return usersRepository.findAll();
    }
    
    public User getUserById(String id) {
        return usersRepository.findById(id).orElseThrow();
    }
}
