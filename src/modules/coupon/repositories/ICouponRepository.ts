import { ICouponDTO } from '@modules/coupon/dtos/ICouponDTO';

export interface ICouponRepository {
  create(data: ICouponDTO): Promise<void>;

  list(): Promise<ICouponDTO[]>;

  findById(id: number): Promise<ICouponDTO | null>;

  update(id: number, data: Partial<ICouponDTO>): Promise<void>;

  delete(id: number): Promise<void>;

  softDelete(id: number): Promise<void>;

  findByContract(contractId: number): Promise<ICouponDTO[]>;

  employeeConfirmJobDone(id: number): Promise<void>;

  employeeDisproveJobDone(id: number): Promise<void>;

  employeeConfirmPayment(id: number): Promise<void>;

  employerFinishJob(id: number, contractId?: number): Promise<void>;

  employerRemoveEmployee(id: number, contractId?: number): Promise<void>;

  employeeRateEmployer(
    id: number,
    ratingId: number,
    employerId: number
  ): Promise<void>;

  employerRateEmployee(
    id: number,
    ratingId: number,
    employeeId: number
  ): Promise<void>;
}
