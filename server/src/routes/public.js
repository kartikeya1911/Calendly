const { Router } = require("express");
const { z } = require("zod");
const { validate } = require("../middleware/validate");
const controller = require("../controllers/publicController");

const router = Router();

const bookSchema = z.object({
  startsAt: z.string().datetime(),
  name: z.string().min(2),
  email: z.string().email(),
});

router.get("/:slug", controller.getEventType);
router.get("/:slug/slots", controller.getSlots);
router.post("/:slug/book", validate(bookSchema), controller.book);

module.exports = router;
