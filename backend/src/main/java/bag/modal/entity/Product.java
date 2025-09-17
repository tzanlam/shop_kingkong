package bag.modal.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@Data
@Entity
@Table
@EqualsAndHashCode(callSuper=true)
public class Product extends Time{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private double price;

    @Column(nullable = false)
    private int quantity;

    @OneToMany(mappedBy = "product")
    private List<ProductImage> image;

    @ManyToOne
    @JoinColumn
    private Category category;


}
