import { Router } from "express";
import * as summariesController from "../controllers/summaries.controller"; // Import your controllers
import AuthMiddleware from "../middlewares/auth";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Summary
 *   description: Summary endpoints
 */

/**
 * @swagger
 * /summaries/highlighted-metrics:
 *   get:
 *     summary: Get highlighted metrics
 *     tags: [Summary]
 *     description: Retrieve summary information about highlighted metrics.
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
 *                 serviceReminders:
 *                   type: object
 *                   properties:
 *                     due_in_30_days:
 *                       type: integer
 *                     overdue:
 *                       type: integer
 *                 inspection:
 *                   type: object
 *                   properties:
 *                     due_in_30_days:
 *                       type: integer
 *                     overdue:
 *                       type: integer
 *                 trucks:
 *                   type: object
 *                   properties:
 *                     active:
 *                       type: integer
 *                     in_shop:
 *                       type: integer
 *                 trailers:
 *                   type: object
 *                   properties:
 *                     active:
 *                       type: integer
 *                     in_shop:
 *                       type: integer
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
router.get("/highlighted-metrics", AuthMiddleware, summariesController.gethighlightedMetrics);

export default router;
