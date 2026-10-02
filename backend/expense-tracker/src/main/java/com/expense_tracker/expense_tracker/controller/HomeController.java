package com.expense_tracker.expense_tracker.controller;

import com.expense_tracker.expense_tracker.dto.ExpenseDTO;
import com.expense_tracker.expense_tracker.entity.Expense;
import com.expense_tracker.expense_tracker.service.ExpenseService;

import jakarta.validation.Valid;

import java.util.List;

import org.springframework.web.bind.annotation.*;
// import com.expense_tracker.expense_tracker.dto.ExpenseDTO;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/expenses")
public class HomeController {

    private final ExpenseService expenseService;

    public HomeController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    @PostMapping
    public ExpenseDTO saveExpense(@Valid @RequestBody ExpenseDTO dto) {

        return expenseService.saveExpense(dto);

    }

    @GetMapping
    public List<Expense> getAllExpenses() {

        return expenseService.getAllExpenses();

    }

    @PutMapping("/{id}")
    public Expense updateExpense(@PathVariable Integer id,
                                @RequestBody Expense expense) {

        return expenseService.updateExpense(id, expense);

    }

    @DeleteMapping("/{id}")
    public String deleteExpense(@PathVariable Integer id) {

        expenseService.deleteExpense(id);

        return "Expense deleted successfully.";

    }

    
    

}