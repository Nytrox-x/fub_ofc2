import { container, inject, injectable } from 'tsyringe';

import { ICouponRepository } from '@modules/coupon/repositories/ICouponRepository';
import { RetrieveContractAndCouponService } from '@shared/services/RetrieveContractAndCouponService';
import { GenerateNotificationOfContractService } from '@shared/services/GenerateNotificationOfContractService';
import { AppError } from '@shared/errors/AppError';

@injectable()
export class EmployeeRateService {
  constructor(
    @inject('CouponRepository')
    private couponRepository: ICouponRepository
  ) {}

  public async execute(
    id: number,
    ratingId: number,
    user: { id: number }
  ): Promise<void> {
    const service = container.resolve(RetrieveContractAndCouponService);

    const { coupon, contract } = await service.execute(id);

    if (contract.employee.id !== user.id) {
      throw new AppError('You can not rate this employee');
    }

    if (coupon.employeeRating) {
      throw new AppError('You already rated this job');
    }

    await this.couponRepository.employeeRateEmployer(
      id,
      ratingId,
      Number(contract.employer.id)
    );

    const notificationService = container.resolve(
      GenerateNotificationOfContractService
    );

    await notificationService.execute(
      contract,
      `O usuário ${contract.employee.name} avaliou sua recepção no bico ${contract.title}`,
      contract.employer.id as unknown as { id: number }
    );
  }
}
