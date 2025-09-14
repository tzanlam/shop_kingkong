package bag.modal.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn
    private Account account;

    @OneToMany(mappedBy = "cart")
    private List<Product> products;

    @Column
    private int quantity;

    @Column
    private LocalDateTime addedTime;

    @Column
    private double totalPrice;

}
