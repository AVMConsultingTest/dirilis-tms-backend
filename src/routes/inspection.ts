import { Router } from "express";
import { inspectionController } from "../controllers";

export const inspectionRouter = Router();

inspectionRouter.get("/", inspectionController.getMany);
inspectionRouter.get("/:inspection_id", inspectionController.getOne);
inspectionRouter.post("/", inspectionController.create);
inspectionRouter.put("/:inspection_id", inspectionController.update);
inspectionRouter.delete("/:inspection_id", inspectionController.remove);

/**
 * @swagger
 * /inspections/summaries/violation-points:
 *   get:
 *     summary: Get violation points summary
 *     tags: [Inspections]
 *     description: Retrieve summary information about violation points.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 failing_points:
 *                   type: integer
 *                 new_points:
 *                   type: integer
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Bad Request
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */
inspectionRouter.get("/summaries/violation-points", inspectionController.getViolationPointsSummary);

/**
 * @swagger
 * /inspections/summaries/violation-points-changes:
 *   get:
 *     summary: Get violation points changes summary
 *     tags: [Inspections]
 *     description: Retrieve summary information about changes in violation points.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   unsafe_driver:
 *                     type: object
 *                     properties:
 *                       falling_point:
 *                         type: integer
 *                       new_point:
 *                         type: integer
 *                       impact:
 *                         type: string
 *                   driver_fitness:
 *                     type: object
 *                     properties:
 *                       falling_point:
 *                         type: integer
 *                       new_point:
 *                         type: integer
 *                       impact:
 *                         type: string
 *                   subtance_alcohol:
 *                     type: object
 *                     properties:
 *                       falling_point:
 *                         type: integer
 *                       new_point:
 *                         type: integer
 *                       impact:
 *                         type: string
 *                   crash_indicator:
 *                     type: object
 *                     properties:
 *                       falling_point:
 *                         type: integer
 *                       new_point:
 *                         type: integer
 *                       impact:
 *                         type: string
 *                   hos_compliance:
 *                     type: object
 *                     properties:
 *                       falling_point:
 *                         type: integer
 *                       new_point:
 *                         type: integer
 *                       impact:
 *                         type: string
 *                   vehicle_maintanence:
 *                     type: object
 *                     properties:
 *                       falling_point:
 *                         type: integer
 *                       new_point:
 *                         type: integer
 *                       impact:
 *                         type: string
 *                   hm_compliance:
 *                     type: object
 *                     properties:
 *                       falling_point:
 *                         type: integer
 *                       new_point:
 *                         type: integer
 *                       impact:
 *                         type: string
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Bad Request
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */
inspectionRouter.get("/summaries/violation-points-changes", inspectionController.getviolationPointsChangesSummary);
