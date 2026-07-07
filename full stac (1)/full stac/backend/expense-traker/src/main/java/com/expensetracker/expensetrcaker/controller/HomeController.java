package com.expensetracker.expensetrcaker.controller;

import com.expensetracker.expensetrcaker.dto.ExpenseDTO;
import com.expensetracker.expensetrcaker.entity.Expense;
import com.expensetracker.expensetrcaker.service.ExpenseService;
import com.expensetracker.expensetrcaker.response.ApiResponse;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/expenses")
public class HomeController {

    @Autowired
    private ExpenseService expenseService;

    @PostMapping
    public ApiResponse<ExpenseDTO> saveExpense(
            @Valid @RequestBody ExpenseDTO dto) {

        ExpenseDTO savedExpense = expenseService.saveExpense(dto);

        return new ApiResponse<>(
                true,
                "Expense created successfully",
                savedExpense);
    }

    @GetMapping
    public ApiResponse<List<Expense>> getAllExpenses() {

        List<Expense> expenses = expenseService.getAllExpenses();

        return new ApiResponse<>(
                true,
                "Expense retrieved successfully",
                expenses);
     }

    @PutMapping("/{id}")
    public ApiResponse<Expense> updateExpense(@PathVariable Integer id,
            @Valid@RequestBody Expense expense) {

        return new ApiResponse<>(
                true,
                "Expense updated successfully",
                expenseService.updateExpense(id, expense)
        );

    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteExpense(@PathVariable Integer id) {

        expenseService.deleteExpense(id);

    return new ApiResponse<>(
            true,
            "Expense deleted successfully",
            null
    );

    }

}