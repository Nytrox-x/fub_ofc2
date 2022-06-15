import { container, inject, injectable } from 'tsyringe';

import { ICouponRepository } from '@modules/coupon/repositories/ICouponRepository';
import { RetrieveContractAndCouponService } from '@shared/services/RetrieveContractAndCouponService';
import { GenerateNotificationOfContractService } from '@shared/services/GenerateNotificationOfContractService';
import { AppError } from '@shared/errors/AppError';

@injectable()
export class EmployerRateService {
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

    if (contract.employer.id !== user.id) {
      throw new AppError('You can not rate this employee');
    }

    if (coupon.employerRating) {
      throw new AppError('You already rated this job');
    }

    await this.couponRepository.employerRateEmployee(
      id,
      ratingId,
      Number(contract.employee.id)
    );

    const notificationService = container.resolve(
      GenerateNotificationOfContractService
    );

    await notificationService.execute(
      contract,
      `O usuário ${contract.employer.name} avaliou seu serviço no bico ${contract.title}`,
      contract.employee.id as unknown as { id: number }
    );
  }
}
