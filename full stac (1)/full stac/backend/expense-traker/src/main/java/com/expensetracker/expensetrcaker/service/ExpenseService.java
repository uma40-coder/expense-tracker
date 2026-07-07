package com.expensetracker.expensetrcaker.service;

import com.expensetracker.expensetrcaker.dto.ExpenseDTO;
import com.expensetracker.expensetrcaker.entity.Expense;
import com.expensetracker.expensetrcaker.repository.ExpenseRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;

    public ExpenseService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    public Expense saveExpense(Expense expense) {

        return expenseRepository.save(expense);

    }

    public List<Expense> getAllExpenses() {

        return expenseRepository.findAll();

    }

    public Expense updateExpense(Integer id, Expense updatedExpense) {

        Expense existingExpense = expenseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found"));

        existingExpense.setTitle(updatedExpense.getTitle());
        existingExpense.setAmount(updatedExpense.getAmount());
        existingExpense.setCategory(updatedExpense.getCategory());

        return expenseRepository.save(existingExpense);
    }

    public void deleteExpense(Integer id) {

        if (!expenseRepository.existsById(id)) {
            throw new RuntimeException("Expense not found");
        }

        expenseRepository.deleteById(id);

    }

    private Expense convertToEntity(ExpenseDTO dto) {

        Expense expense = new Expense();

        expense.setTitle(dto.getTitle());
        expense.setAmount(dto.getAmount());
        expense.setCategory(dto.getCategory());

        return expense;

    }

    private ExpenseDTO convertToDTO(Expense expense) {

        ExpenseDTO dto = new ExpenseDTO();

        dto.setTitle(expense.getTitle());
        dto.setAmount(expense.getAmount());
        dto.setCategory(expense.getCategory());

        return dto;

    }

    public ExpenseDTO saveExpense(ExpenseDTO dto) {

    Expense expense = convertToEntity(dto);

    Expense savedExpense = expenseRepository.save(expense);

    return convertToDTO(savedExpense);

}
}