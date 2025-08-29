package bag.modal.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table
public class ProductImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn
    private Product product;

    @Column
    private String imageUrl;

    @Column
    private boolean isMain;
}
