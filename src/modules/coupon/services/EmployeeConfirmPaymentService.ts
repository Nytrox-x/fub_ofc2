import { container, inject, injectable } from 'tsyringe';
import { ICouponRepository } from '@modules/coupon/repositories/ICouponRepository';
import { CouponHandlerService } from '@shared/services/CouponHandlerService';
import { GenerateNotificationOfContractService } from '@shared/services/GenerateNotificationOfContractService';
import { AppError } from '@shared/errors/AppError';

@injectable()
export class EmployeeConfirmPaymentService {
  constructor(
    @inject('CouponRepository') private couponRepository: ICouponRepository
  ) {}

  public async execute(id: number, user: { id: number }): Promise<void> {
    const service = container.resolve(CouponHandlerService);

    const { coupon } = await service.execute(id, user, 'employee');

    if (!coupon.isFinished) {
      throw new AppError('This job is not finished yet');
    }

    if (coupon.isPaid) {
      throw new AppError(
        'You already confirmed that this contract has been paid'
      );
    }

    await this.couponRepository.employeeConfirmPayment(id);

    const notificationService = container.resolve(
      GenerateNotificationOfContractService
    );

    await notificationService.execute(
      coupon.contract,
      `Seu empregado confirmou que recebeu o pagamento no bico ${coupon.contract.title}, você agora pode finalizá-lo`,
      coupon.contract.employer.id as unknown as { id: number }
    );
  }
}
