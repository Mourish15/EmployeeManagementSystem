package com.example.demo.service;
import com.example.demo.exception.EmployeeNotFoundException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Employee;
import com.example.demo.repository.EmployeeRepository;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository repository;

    // Create
    public Employee saveEmployee(Employee employee) {
        return repository.save(employee);
    }

    // Read All
    public List<Employee> getAllEmployees() {
        return repository.findAll();
    }

    // Read By ID
    public Employee getEmployeeById(Long id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new EmployeeNotFoundException(id));
    }

    // Update
    public Employee updateEmployee(Long id, Employee employee) {

        Employee existing = repository.findById(id)
                .orElseThrow(() ->
                        new EmployeeNotFoundException(id));

        existing.setName(employee.getName());
        existing.setDepartment(employee.getDepartment());
        existing.setSalary(employee.getSalary());

        return repository.save(existing);
    }

    // Delete
    public String deleteEmployee(Long id) {

        Employee employee = repository.findById(id)
                .orElseThrow(() ->
                        new EmployeeNotFoundException(id));

        repository.delete(employee);

        return "Employee Deleted Successfully";
    }
}