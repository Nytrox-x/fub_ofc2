import { container, inject, injectable } from 'tsyringe';

import { CouponHandlerService } from '@shared/services/CouponHandlerService';
import { ICouponRepository } from '@modules/coupon/repositories/ICouponRepository';
import { GenerateNotificationOfContractService } from '@shared/services/GenerateNotificationOfContractService';
import { AppError } from '@shared/errors/AppError';

@injectable()
export class EmployeeConfirmJobDoneService {
  constructor(
    @inject('CouponRepository')
    private couponRepository: ICouponRepository
  ) {}

  public async execute(id: number, user: { id: number }): Promise<void> {
    const service = container.resolve(CouponHandlerService);

    const { coupon } = await service.execute(id, user, 'employee');

    if (coupon.isFinished) {
      throw new AppError('You already finished this job');
    }

    await this.couponRepository.employeeConfirmJobDone(id);

    const notificationService = container.resolve(
      GenerateNotificationOfContractService
    );

    await notificationService.execute(
      coupon.contract,
      `Seu empregado confirmou que finalizou o bico ${coupon.contract.title}`,
      coupon.contract.employer.id as unknown as { id: number }
    );
  }
}
