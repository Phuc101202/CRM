import {Router} from "express";
import {createLead, getLeads, getLead, updateLead, deleteLead, reorderLeads} from "../controllers/lead.controller.js";
import {protect} from "../middleware/auth.middleware.js";

const router = Router();

router.use(protect);

router.route("/").get(getLeads).post(createLead);
router.route("/:id").get(getLead).put(updateLead).delete(deleteLead);
router.route("/reorder", reorderLeads);

export default router;