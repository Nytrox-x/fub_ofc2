import { inject, injectable } from 'tsyringe';

import { ICouponDTO } from '@modules/coupon/dtos/ICouponDTO';
import { ICouponRepository } from '@modules/coupon/repositories/ICouponRepository';

@injectable()
export class FindCouponByContractIdService {
  constructor(
    @inject('CouponRepository') private couponRepository: ICouponRepository
  ) {}

  public async execute(contractId: number): Promise<ICouponDTO[]> {
    return this.couponRepository.findByContract(contractId);
  }
}
