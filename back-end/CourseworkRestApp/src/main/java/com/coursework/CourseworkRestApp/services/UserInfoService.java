package com.coursework.CourseworkRestApp.services;

import com.coursework.CourseworkRestApp.models.UserInfo;
import com.coursework.CourseworkRestApp.repositories.UserInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserInfoService {

    private final UserInfoRepository userInfoRepository;

    @Autowired
    public UserInfoService(UserInfoRepository userInfoRepository) {
        this.userInfoRepository = userInfoRepository;
    }

    public List<UserInfo> getAllUserInfos() {
        return userInfoRepository.findAll();
    }

    public UserInfo getUserInfoById(int userInfoId) {
        Optional<UserInfo> optionalUserInfo = userInfoRepository.findById(userInfoId);
        return optionalUserInfo.orElse(null);
    }

    public UserInfo createUserInfo(UserInfo userInfo) {
        return userInfoRepository.save(userInfo);
    }

    public UserInfo updateUserInfo(int userInfoId, UserInfo updatedUserInfo) {
        Optional<UserInfo> optionalUserInfo = userInfoRepository.findById(userInfoId);
        if (optionalUserInfo.isPresent()) {
            UserInfo existingUserInfo = optionalUserInfo.get();
            existingUserInfo.setName(updatedUserInfo.getName());
            existingUserInfo.setNumber(updatedUserInfo.getNumber());
            existingUserInfo.setAddress(updatedUserInfo.getAddress());
            existingUserInfo.setSalary(updatedUserInfo.getSalary());
            return userInfoRepository.save(existingUserInfo);
        }
        return null;
    }

    public void deleteUserInfo(int userInfoId) {
        userInfoRepository.deleteById(userInfoId);
    }
}
