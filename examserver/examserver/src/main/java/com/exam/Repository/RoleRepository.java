package com.exam.Repository;

import com.exam.Model.Role;
import com.exam.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role,Long> {

}
