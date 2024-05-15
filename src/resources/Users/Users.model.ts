import { Model, Column, Table, CreatedAt, UpdatedAt, DeletedAt } from 'sequelize-typescript';

interface Attributes {
    id?: number;
    name: string;
    username: string;
    hash: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

@Table({
  tableName: 'Users',
  timestamps: true,
  paranoid: true,
})
// eslint-disable-next-line no-use-before-define
export class Users extends Model<Users, Attributes> {

    @Column({ allowNull: false })
      name!: string;
    
    @Column({ allowNull: false })
      username!: string;

    @Column({ allowNull: false })
      hash!: string;
    
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

export default Users;