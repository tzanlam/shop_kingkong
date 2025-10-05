package bag.modal.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table
@EqualsAndHashCode(callSuper=true)
public class Cart extends Time {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private Account account;

    @OneToMany(mappedBy = "cart",cascade = CascadeType.ALL, orphanRemoval = true,fetch = FetchType.EAGER)
    private List<Product> products;

    @Column
    private double price;

    @Column
    private int quantity;

    @Column
    private LocalDateTime addedTime;

    @Column
    private double totalPrice;




}
