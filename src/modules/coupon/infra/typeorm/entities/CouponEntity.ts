import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ICouponDTO } from '@modules/coupon/dtos/ICouponDTO';
import { BaseEntity } from '@shared/infra/typeorm/entities/BaseEntity';
import { DefaultRatingEntity } from '@modules/defaults/rating/infra/typeorm/entities/DefaultRatingEntity';

@Entity('coupons')
export class CouponEntity extends BaseEntity implements ICouponDTO {
  @PrimaryGeneratedColumn({ name: 'id_coupon' })
  id?: number;

  @ManyToOne(() => DefaultRatingEntity)
  @JoinColumn({ referencedColumnName: 'id', name: 'id_rating' })
  ratingId: DefaultRatingEntity;

  @Column({ name: 'value' })
  value: number;

  @Column({ name: 'deadline' })
  deadline: Date;

  @Column({ name: 'is_approved' })
  isApproved: boolean;
}