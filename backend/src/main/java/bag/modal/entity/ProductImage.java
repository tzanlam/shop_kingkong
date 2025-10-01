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


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Product product;

    @Column
    private String imageUrl;

    @Column
    private String alt;

    @Column
    private boolean isMain;


}
