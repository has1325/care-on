import { Router, type IRouter } from "express";
import healthRouter from "./health";
import caregiversRouter from "./caregivers";
import bookingsRouter from "./bookings";
import emergencyRouter from "./emergency";
import reviewsRouter from "./reviews";
import plansRouter from "./plans";
import programsRouter from "./programs";
import consultationsRouter from "./consultations";
import matchingRouter from "./matching";

const router: IRouter = Router();

router.use(healthRouter);
router.use(caregiversRouter);
router.use(bookingsRouter);
router.use(emergencyRouter);
router.use(reviewsRouter);
router.use(plansRouter);
router.use(programsRouter);
router.use(consultationsRouter);
router.use(matchingRouter);

export default router;
