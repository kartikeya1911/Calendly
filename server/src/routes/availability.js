const { Router } = require("express");
const { z } = require("zod");
const { validate } = require("../middleware/validate");
const controller = require("../controllers/availabilityController");

const router = Router();

const updateSchema = z.object({
  timezone: z.string().min(2),
  rules: z.array(
    z.object({
      dayOfWeek: z.number().int().min(0).max(6),
      startTime: z.string().regex(/^\d{2}:\d{2}$/),
      endTime: z.string().regex(/^\d{2}:\d{2}$/),
    })
  ),
});

router.get("/", controller.get);
router.put("/", validate(updateSchema), controller.update);

module.exports = router;
