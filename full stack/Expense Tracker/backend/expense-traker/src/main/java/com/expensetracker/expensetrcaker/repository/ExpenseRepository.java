package  com.expensetracker.expensetrcaker.repository;
import com.expensetracker.expensetrcaker.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Integer> {
    List<Expense> findByUsername(String username);
}