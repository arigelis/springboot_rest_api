package web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import web.dao.RoleDao;
import web.model.Role;
import web.model.User;
import web.service.UserService;

import java.util.List;


@RestController
@RequestMapping("/root/")
public class RootController {
    @Autowired
    private UserService userService;
    @Autowired
    private RoleDao roleDao;

    @GetMapping(value = "user")
    public User getCurrentUser() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    @PostMapping(value = "users", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<User> saveUser(@RequestBody User user) {
        if (user == null) {
            return  new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        userService.add(user);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @PutMapping (value = "users", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<User> updateUser(@RequestBody @Validated User user) {
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        userService.edit(user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
    @DeleteMapping(value ="users/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<User> deleteUser(@PathVariable("id") Long id) {
        if (id == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        User user = userService.getById(id);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        userService.delete(user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping(value = "users")
    public List<User> getAllUsers() {
        List<User> users = userService.allUsers();

        return users;
    }
    @GetMapping(value = "users/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public User getUser(@PathVariable("id") Long id) {
        User user = userService.getById(id);

        return user;
    }
    @GetMapping(value = "roles")
    public List<Role> getRoles() {
        List<Role> roles = roleDao.allRoles();
        return roles;
    }





//    @RequestMapping(value = "/admin", method = RequestMethod.GET)
//    public ModelAndView allUsers() {
//
//        List<User> listUser = userService.allUsers();
//        ModelAndView mav = new ModelAndView("admin");
//        User currUser = ((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
//        mav.addObject("userName", currUser.getName());
//        mav.addObject("listRole", currUser.getRoles());
//        mav.addObject("listUser", listUser);
//        mav.addObject("allRoles", roleDao.allRoles());
//        User user = new User();
//        mav.addObject("user", user);
//        return mav;
//    }
//
//    @RequestMapping(value = "/save", method = RequestMethod.POST)
//    public String saveUser(@ModelAttribute("user") User user,
//                           @RequestParam("userRoles") String userRole) {
//        user.setRoles(getSetRole(userRole));
//        userService.add(user);
//        return "redirect:/admin";
//    }
//
//
//    @RequestMapping(value = "/edit/{id}", method = RequestMethod.POST)
//    public String editUser(@PathVariable("id") long id, @RequestParam("editRoles") String editRoles,
//                           @ModelAttribute("user") User user) {
//        user.setRoles(getSetRole(editRoles));
//        userService.edit(user);
//        return "redirect:/admin";
//    }
//
//    @RequestMapping("/delete/{id}")
//    public String deleteUserForm(@PathVariable("id") long id) {
//        User user = new User();
//        user.setId(id);
//        userService.delete(user);
//        return "redirect:/admin";
//    }
//
//    @RequestMapping(value = "user", method = RequestMethod.GET)
//    public ModelAndView printWelcomeUser() {
//        User currUser = ((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
//
//        List<User> listUser = new ArrayList<>();
//        listUser.add(currUser);
//        ModelAndView mav = new ModelAndView("user");
//        mav.addObject("userName", currUser.getName());
//        mav.addObject("listUser", listUser);
//        mav.addObject("allRoles", currUser.getRoles());
//        return mav;
//    }
//
//    @RequestMapping(value = "login", method = RequestMethod.GET)
//    public String loginPage() {
//        return "login";
//    }
//
//    @RequestMapping(value = "/logout", method = RequestMethod.GET)
//    public String logoutPage(HttpServletRequest request, HttpServletResponse response) {
//        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//        if (auth != null) {
//            new SecurityContextLogoutHandler().logout(request, response, auth);
//        }
//        return "redirect:/";
//    }
//
//    Set<Role> getSetRole(String roles) {
//        Set<Role> roleSet = new HashSet<>();
//        if (roles.contains("test")) {
//            roleSet.add(userService.getRoleByName("test"));
//        }
//        if (roles.contains("admin")) {
//            roleSet.add(userService.getRoleByName("admin"));
//        }
//        if(roles.contains("user")){
//            roleSet.add(userService.getRoleByName("user"));
//        }
//        return roleSet;
//    }
}