import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';

import { ratingSchema } from '@modules/coupon/schemas/rating.schema';
import { createCouponSchema } from '@modules/coupon/schemas/createCoupon.schema';
import { updateCouponSchema } from '@modules/coupon/schemas/updateCoupon.schema';
import { CouponController } from '@modules/coupon/infra/http/controllers/CouponController';

const couponRoutes = Router();
const couponController = new CouponController();

couponRoutes.post('', [
  celebrate({ [Segments.BODY]: createCouponSchema }, { abortEarly: false }),
  couponController.create,
]);

couponRoutes.post(
  '/employer/:id',
  celebrate({ [Segments.BODY]: ratingSchema }, { abortEarly: false }),
  couponController.employerRateEmployee
);

couponRoutes.post(
  '/employee/:id',
  celebrate({ [Segments.BODY]: ratingSchema }, { abortEarly: false }),
  couponController.employeeRateEmployer
);

couponRoutes.get('', couponController.list);

couponRoutes.get('/contract/:contractId', couponController.findByContract);

couponRoutes.get('/:id', couponController.findById);

couponRoutes.put(
  '/:id',
  [celebrate({ [Segments.BODY]: updateCouponSchema }, { abortEarly: false })],
  couponController.update
);

couponRoutes.put('/confirm-job/:id', couponController.employeeConfirmJobDone);

couponRoutes.put('/disprove-job/:id', couponController.employeeDisproveJobDone);

couponRoutes.put(
  '/confirm-payment/:id',
  couponController.employeeConfirmPayment
);

couponRoutes.put(
  '/remove-employee/:id',
  couponController.employerRemoveEmployee
);

couponRoutes.patch('/finish-job/:id', couponController.employerFinishJob);

couponRoutes.delete('/:id', couponController.softDelete);

export { couponRoutes };
