import { container, injectable } from 'tsyringe';
import { NextFunction, Request, Response } from 'express';

import { ListCouponService } from '@modules/coupon/services/ListCouponService';
import { EmployeeRateService } from '@modules/coupon/services/EmployeeRateService';
import { CreateCouponService } from '@modules/coupon/services/CreateCouponService';
import { UpdateCouponService } from '@modules/coupon/services/UpdateCouponService';
import { EmployerRateService } from '@modules/coupon/services/EmployerRateService';
import { FindCouponByIdService } from '@modules/coupon/services/FindCouponByIdService';
import { SoftDeleteCouponService } from '@modules/coupon/services/SoftDeleteCouponService';
import { EmployerFinishJobService } from '@modules/coupon/services/EmployerFinishJobService';
import { EmployeeConfirmJobDoneService } from '@modules/coupon/services/EmployeeConfirmJobDoneService';
import { EmployeeConfirmPaymentService } from '@modules/coupon/services/EmployeeConfirmPaymentService';
import { EmployerRemoveEmployeeService } from '@modules/coupon/services/EmployerRemoveEmployeeService';
import { FindCouponByContractIdService } from '@modules/coupon/services/FindCouponByContractIdService';
import { EmployeeDisproveJobDoneService } from '@modules/coupon/services/EmployeeDisproveJobDoneService';

@injectable()
export class CouponController {
  public async create(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const service = container.resolve(CreateCouponService);

      const data = request.body;

      response.status(201).json(await service.execute(data));
    } catch (err) {
      next(err);
    }
  }

  public async employerRateEmployee(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const service = container.resolve(EmployerRateService);

      const { user } = request.token.sub;
      const { ratingId } = request.body;
      const { id } = request.params;

      response.json(await service.execute(Number(id), Number(ratingId), user));
    } catch (err) {
      next(err);
    }
  }

  public async employeeRateEmployer(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const service = container.resolve(EmployeeRateService);

      const { user } = request.token.sub;
      const { ratingId } = request.body;
      const { id } = request.params;

      response.json(await service.execute(Number(id), Number(ratingId), user));
    } catch (err) {
      next(err);
    }
  }

  public async list(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const service = container.resolve(ListCouponService);

      response.json(await service.execute());
    } catch (err) {
      next(err);
    }
  }

  public async findById(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const service = container.resolve(FindCouponByIdService);

      const { id } = request.params;

      response.json(await service.execute(Number(id)));
    } catch (err) {
      next(err);
    }
  }

  public async findByContract(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const service = container.resolve(FindCouponByContractIdService);

      const { contractId } = request.params;

      response.json(await service.execute(Number(contractId)));
    } catch (err) {
      next(err);
    }
  }

  public async update(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const service = container.resolve(UpdateCouponService);

      const { user } = request.token.sub;
      const { id } = request.params;
      const data = request.body;

      response.json(await service.execute(Number(id), user, data));
    } catch (err) {
      next(err);
    }
  }

  public async employeeConfirmJobDone(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const service = container.resolve(EmployeeConfirmJobDoneService);

      const { id } = request.params;
      const { user } = request.token.sub;

      response.json(await service.execute(Number(id), user));
    } catch (err) {
      next(err);
    }
  }

  public async employeeDisproveJobDone(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const service = container.resolve(EmployeeDisproveJobDoneService);

      const { id } = request.params;
      const { user } = request.token.sub;

      response.json(await service.execute(Number(id), user));
    } catch (err) {
      next(err);
    }
  }

  public async employeeConfirmPayment(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const service = container.resolve(EmployeeConfirmPaymentService);

      const { id } = request.params;
      const { user } = request.token.sub;

      response.json(await service.execute(Number(id), user));
    } catch (err) {
      next(err);
    }
  }

  public async employerRemoveEmployee(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const service = container.resolve(EmployerRemoveEmployeeService);

      const { user } = request.token.sub;
      const { id } = request.params;

      response.json(await service.execute(Number(id), user));
    } catch (err) {
      next(err);
    }
  }

  public async employerFinishJob(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const service = container.resolve(EmployerFinishJobService);

      const { id } = request.params;
      const { user } = request.token.sub;

      response.json(await service.execute(Number(id), user));
    } catch (err) {
      next(err);
    }
  }

  public async softDelete(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const service = container.resolve(SoftDeleteCouponService);

      const { id } = request.params;

      response.json(await service.execute(Number(id)));
    } catch (err) {
      next(err);
    }
  }
}
