import { injectable } from 'tsyringe';
import { Repository } from 'typeorm';

import dataSource from '@shared/infra/typeorm';
import { ICouponRepository } from '@modules/coupon/repositories/ICouponRepository';
import { CouponEntity } from '@modules/coupon/infra/typeorm/entities/CouponEntity';

@injectable()
export class CouponRepository implements ICouponRepository {
  private repository: Repository<CouponEntity>;

  constructor() {
    this.repository = dataSource.getRepository(CouponEntity);
  }

  async create(data: CouponEntity): Promise<void> {
    await this.repository.save(await this.repository.create(data));
  }

  async list(): Promise<CouponEntity[]> {
    return this.repository.find({
      relations: ['employeeRating', 'employerRating'],
    });
  }

  async findById(id: number): Promise<CouponEntity | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['contract', 'employeeRating', 'employerRating'],
      loadEagerRelations: true,
    });
  }

  async update(id: number, data: Partial<CouponEntity>): Promise<void> {
    await this.repository.update(id, data);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async softDelete(id: number): Promise<void> {
    await this.repository.softDelete(id);
  }

  async findByContract(contractId: number): Promise<CouponEntity[]> {
    return this.repository.find({ where: { contract: { id: contractId } } });
  }

  async employeeConfirmJobDone(id: number): Promise<void> {
    await this.repository
      .createQueryBuilder('coupon')
      .update()
      .set({ isFinished: true })
      .where('id_coupon = :id', { id })
      .execute();
  }

  async employeeDisproveJobDone(id: number): Promise<void> {
    await this.repository
      .createQueryBuilder('coupon')
      .update()
      .set({ isFinished: false })
      .where('id_coupon = :id', { id })
      .execute();
  }

  async employeeConfirmPayment(id: number): Promise<void> {
    await this.repository
      .createQueryBuilder('coupon')
      .update()
      .set({ isPaid: true })
      .where('id_coupon = :id', { id })
      .execute();
  }

  async employerFinishJob(id: number, contractId: number): Promise<void> {
    await this.repository
      .createQueryBuilder('coupon')
      .softDelete()
      .where('id_coupon = :id', { id })
      .execute();

    await this.repository
      .createQueryBuilder('coupon')
      .leftJoin('id_contract', 'contracts')
      .update('ContractEntity')
      .set({ statusContract: { id: 4 } })
      .andWhere('id_contract = :contractId', { contractId })
      .execute();
  }

  async employerRemoveEmployee(id: number, idContract: number): Promise<void> {
    await this.repository
      .createQueryBuilder('coupon')
      .softDelete()
      .where('id_coupon = :id', { id })
      .execute();

    await this.repository
      .createQueryBuilder('coupon')
      .leftJoin('id_contract', 'contracts')
      .update('contracts')
      .set({
        employee: null,
        statusContract: { id: 1 },
        generatedCoupon: false,
      })
      .where('id_contract = :idContract', { idContract })
      .execute();
  }

  async employeeRateEmployer(
    id: number,
    ratingId: number,
    idEmployer: number
  ): Promise<void> {
    await this.repository
      .createQueryBuilder('coupon')
      .update()
      .set({ employeeRating: { id: ratingId } })
      .where('id_coupon = :id', { id })
      .execute();

    await this.repository
      .createQueryBuilder('coupon')
      .leftJoin('id_contract', 'contracts')
      .leftJoin('id_employer', 'users')
      .insert()
      .into('aux_users_default_rating')
      .values({ id_user: idEmployer, id_default_rating: ratingId })
      .execute();
  }

  async employerRateEmployee(
    id: number,
    ratingId: number,
    idEmployee: number
  ): Promise<void> {
    await this.repository
      .createQueryBuilder('coupon')
      .update()
      .set({ employerRating: { id: ratingId } })
      .where('id_coupon = :id', { id })
      .execute();

    await this.repository
      .createQueryBuilder('coupon')
      .leftJoin('id_contract', 'contracts')
      .leftJoin('id_employee', 'users')
      .insert()
      .into('aux_users_default_rating')
      .values({ id_user: idEmployee, id_default_rating: ratingId })
      .execute();
  }
}
