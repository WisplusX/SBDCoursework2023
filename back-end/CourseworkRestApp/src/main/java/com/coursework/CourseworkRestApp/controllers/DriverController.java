package com.coursework.CourseworkRestApp.controllers;

import com.coursework.CourseworkRestApp.models.Driver;
import com.coursework.CourseworkRestApp.models.Route;
import com.coursework.CourseworkRestApp.models.Transport;
import com.coursework.CourseworkRestApp.models.User;
import com.coursework.CourseworkRestApp.models.UserInfo;
import com.coursework.CourseworkRestApp.services.DriverService;
import com.coursework.CourseworkRestApp.services.UserInfoService;
import com.coursework.CourseworkRestApp.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/drivers")
public class DriverController {
    private final DriverService driverService;
    private final UserService userService;
    private final UserInfoService userInfoService;

    @Autowired
    public DriverController(DriverService driverService, UserService userService, UserInfoService userInfoService) {
        this.driverService = driverService;
        this.userService = userService;
        this.userInfoService = userInfoService;
    }

    @GetMapping("/{id}/route")
    public ResponseEntity<?> getRouteForDriver(@PathVariable int id) {
        Route route = driverService.getRouteForDriver(id);
        if (route != null) {
            return ResponseEntity.ok(route);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Route not found for driver with id " + id);
        }
    }

    @GetMapping("/{id}/transport")
    public ResponseEntity<?> getTransportForDriver(@PathVariable int id) {
        Transport transport = driverService.getTransportForDriver(id);
        if (transport != null) {
            return ResponseEntity.ok(transport);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Transport not found for driver with id " + id);
        }
    }

    @PostMapping
    public ResponseEntity<?> createDriver(@RequestBody Driver driver) {
        try {
            // Проверки на null и преобразование
            if (driver == null || driver.getSalary() == null) {
                return ResponseEntity.badRequest().build();
            }

            Double salary = null;
            try {
                salary = Double.parseDouble(driver.getSalary());
            } catch (NumberFormatException e) {
                return ResponseEntity.badRequest().build();
            }

            UserInfo userInfo = new UserInfo();
            userInfo.setName(driver.getName());
            userInfo.setNumber(driver.getNumber());
            userInfo.setAddress(driver.getAddress());
            userInfo.setSalary(salary);
            UserInfo createdUserInfo = userInfoService.createUserInfo(userInfo);

            User user = new User();
            user.setEmail(driver.getEmail());
            user.setPassword(driver.getPassword());
            user.setRole(driver.getRole());
            user.setUserInfo(createdUserInfo);
            userService.createUser(user);

            return ResponseEntity.ok().build();
        } catch (Exception e) {
            // Обработка ошибок
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{driverId}")
    public ResponseEntity<?> updateDriver(@PathVariable int driverId, @RequestBody Driver driver) {
        try {
            // Проверки на null и преобразование
            if (driver == null || driver.getSalary() == null) {
                return ResponseEntity.badRequest().build();
            }

            Double salary = null;
            try {
                salary = Double.parseDouble(driver.getSalary());
            } catch (NumberFormatException e) {
                return ResponseEntity.badRequest().build();
            }

            // Получите существующего водителя из базы данных
            User existingUser = userService.getUserById(driverId);

            // Если водитель не найден, верните 404 Not Found
            if (existingUser == null) {
                return ResponseEntity.notFound().build();
            }

            // Обновите информацию водителя
            UserInfo userInfo = existingUser.getUserInfo();
            userInfo.setName(driver.getName());
            userInfo.setNumber(driver.getNumber());
            userInfo.setAddress(driver.getAddress());
            userInfo.setSalary(salary);
            userInfoService.updateUserInfo(userInfo.getId(), userInfo);

            // Обновите информацию пользователя
            existingUser.setEmail(driver.getEmail());
            existingUser.setPassword(driver.getPassword());
            existingUser.setRole(driver.getRole());
            userService.updateUser(existingUser.getId(), existingUser);

            return ResponseEntity.ok().build();
        } catch (Exception e) {
            // Обработка ошибок
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
