package com.example.employee.service;

import com.example.employee.entity.Employee;
import com.example.employee.repository.EmployeeRepository;

import jakarta.persistence.Access;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.lang.String;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public Employee postEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public void deleteEmployee(Integer id) {
        if (!employeeRepository.existsById(id)) {
            throw new EntityNotFoundException("Employee with id " + id + " not found");
        }
        employeeRepository.deleteById(id);
    }

    public void updateEmployee(Employee updatedEmployee, Integer id) {
        // Check if the employee exists by ID
        if (!employeeRepository.existsById(id)) {
            throw new EntityNotFoundException("Employee with id " + id + " not found");
        }

        // Fetch the existing employee to update
        Employee existingEmployee = employeeRepository.findById(id).orElseThrow(() ->
                new EntityNotFoundException("Employee with id " + id + " not found"));

        // Update the existing employee's fields with the new data
        existingEmployee.setName(updatedEmployee.getName());
        existingEmployee.setEmail(updatedEmployee.getEmail());  // Corrected line
        existingEmployee.setPhone(updatedEmployee.getPhone());  // Corrected line
        existingEmployee.setDepartment(updatedEmployee.getDepartment());

        // Save the updated employee
        employeeRepository.save(existingEmployee);
    }


}
