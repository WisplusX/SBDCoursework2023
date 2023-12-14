package com.coursework.CourseworkRestApp.controllers;

import com.coursework.CourseworkRestApp.models.UserInfo;
import com.coursework.CourseworkRestApp.services.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user-info")
public class UserInfoController {

    private final UserInfoService userInfoService;

    @Autowired
    public UserInfoController(UserInfoService userInfoService) {
        this.userInfoService = userInfoService;
    }

    @GetMapping
    public List<UserInfo> getAllUserInfos() {
        return userInfoService.getAllUserInfos();
    }

    @GetMapping("/{userInfoId}")
    public ResponseEntity<UserInfo> getUserInfoById(@PathVariable int userInfoId) {
        UserInfo userInfo = userInfoService.getUserInfoById(userInfoId);
        return ResponseEntity.ok().body(userInfo);
    }

    @PostMapping
    public ResponseEntity<UserInfo> createUserInfo(@RequestBody UserInfo userInfo) {
        UserInfo createdUserInfo = userInfoService.createUserInfo(userInfo);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUserInfo);
    }

    @PutMapping("/{userInfoId}")
    public ResponseEntity<UserInfo> updateUserInfo(@PathVariable int userInfoId, @RequestBody UserInfo userInfo) {
        UserInfo updatedUserInfo = userInfoService.updateUserInfo(userInfoId, userInfo);
        return ResponseEntity.ok().body(updatedUserInfo);
    }

    @DeleteMapping("/{userInfoId}")
    public ResponseEntity<Void> deleteUserInfo(@PathVariable int userInfoId) {
        userInfoService.deleteUserInfo(userInfoId);
        return ResponseEntity.noContent().build();
    }
}
