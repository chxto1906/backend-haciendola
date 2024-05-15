import { Model, Column, Table, CreatedAt, UpdatedAt, DeletedAt } from 'sequelize-typescript';

interface Attributes {
    id?: number;
    title?: string;
    description?: string;
    handle?: string;
    sku?: string;
    grams?: number;
    stock?: number;
    price?: number;
    comparePrice?: number;
    barcode?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

@Table({
  tableName: 'Products',
  timestamps: true,
  paranoid: true,
})
// eslint-disable-next-line no-use-before-define
export class Products extends Model<Products, Attributes> {

    @Column
      title?: string;

    @Column
      description?: string;

    @Column
      handle?: string;

    @Column
      sku?: string;

    @Column
      grams?: number;

    @Column
      stock?: number;

    @Column
      price?: number;

    @Column
      comparePrice?: number;

    @Column
      barcode?: string;
    
    @CreatedAt
    @Column
      createdAt!: Date;

    @UpdatedAt
    @Column
      updatedAt!: Date;

    @DeletedAt
    @Column
      deletedAt!: Date;

}

export default Products;