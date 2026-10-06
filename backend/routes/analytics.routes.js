import {Router} from "express"
import { getOverview } from "../controllers/analytics.controller.js"
import {protect} from "../middleware/auth.middleware.js"

const router = Router();
router.use(protect);

router.get("/overview", getOverview);

export default router;