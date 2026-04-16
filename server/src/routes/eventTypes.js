const { Router } = require("express");
const { z } = require("zod");
const { validate } = require("../middleware/validate");
const controller = require("../controllers/eventTypeController");

const router = Router();

const createSchema = z.object({
  name: z.string().min(2),
  durationMinutes: z.number().int().positive(),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/),
});

const updateSchema = z.object({
  name: z.string().min(2),
  durationMinutes: z.number().int().positive(),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/),
  isActive: z.boolean().optional(),
});

router.get("/", controller.list);
router.post("/", validate(createSchema), controller.create);
router.put("/:id", validate(updateSchema), controller.update);
router.delete("/:id", controller.remove);

module.exports = router;
