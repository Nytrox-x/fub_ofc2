import { container, inject, injectable } from 'tsyringe';

import { ContractApplicationService } from '@shared/services/ContractApplicationService';
import { IContractRepository } from '@modules/contract/repositories/IContractRepository';
import { GenerateNotificationOfContractService } from '@shared/services/GenerateNotificationOfContractService';
import { AppError } from '@shared/errors/AppError';

@injectable()
export class ApplyToContractService {
  constructor(
    @inject('ContractRepository')
    private contractRepository: IContractRepository
  ) {}

  public async execute(id: number, user: { id: number }): Promise<void> {
    const service = container.resolve(ContractApplicationService);

    const { contract, userInfo } = await service.execute(id, user);

    if (user.id === contract.employer.id) {
      throw new AppError('You cannot apply to your own contract');
    }

    contract.interested.forEach((interestedUser) => {
      if (interestedUser.id === user.id) {
        throw new AppError('You already has applied to this job');
      }
    });

    if (contract.employee) {
      throw new AppError('Contract already have employee');
    }

    await this.contractRepository.applyToContract(id, userInfo);

    const notificationService = container.resolve(
      GenerateNotificationOfContractService
    );

    await notificationService.execute(
      contract,
      `O usuário ${userInfo.name} se candidatou a seu bico: ${contract.title}`,
      contract.employer.id as unknown as { id: number }
    );
  }
}
