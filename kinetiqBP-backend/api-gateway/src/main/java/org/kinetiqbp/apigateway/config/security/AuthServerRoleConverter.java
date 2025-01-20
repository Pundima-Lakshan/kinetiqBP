package org.kinetiqbp.apigateway.config.security;

import org.springframework.core.convert.converter.Converter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class AuthServerRoleConverter implements Converter<Jwt, Collection<GrantedAuthority>> {

    @Override
    public Collection<GrantedAuthority> convert(Jwt jwt) {
        Map<String, Object> realmAccess = jwt.getClaim("realm_access");
        ArrayList<Object> groupPaths = jwt.getClaim("group_paths");
        if (realmAccess == null || realmAccess.isEmpty()) {
            return new ArrayList<>();
        }
        List<String> roles = (List<String>) realmAccess.get("roles");
        Collection<GrantedAuthority> grantedAuthorities = roles.stream()
                .map(roleName -> "ROLE_" + roleName)
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
        
        System.out.println(grantedAuthorities);
        System.out.println(groupPaths);

        return grantedAuthorities;
    }
}