const { Router } = require("express");
const { z } = require("zod");
const { validate } = require("../middleware/validate");
const controller = require("../controllers/meetingController");

const router = Router();

const rescheduleSchema = z.object({
  startsAt: z.string().datetime(),
  endsAt: z.string().datetime(),
});

router.get("/", controller.list);
router.patch("/:id/cancel", controller.cancel);
router.patch("/:id/reschedule", validate(rescheduleSchema), controller.reschedule);

module.exports = router;
