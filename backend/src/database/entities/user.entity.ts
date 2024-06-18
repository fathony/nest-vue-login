import { BaseEntity, BeforeInsert, Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from "class-transformer";
import * as bcrypt from "bcryptjs";

@Index("IDX_user_username", ["username"], { unique: true })
@Entity("user")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { length: 100 })
  name: string;

  @Column("varchar", { length: 100 })
  username: string;

  @Column("varchar")
  @Exclude({ toPlainOnly: true })
  password: string;

  @BeforeInsert()
  async beforeInsert() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
}
