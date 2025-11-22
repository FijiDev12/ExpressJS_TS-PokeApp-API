import { Router } from "express";
import { decryptData, encryptData } from "../controllers/generalController";
import { loginUser, get_session } from "../controllers/userController";
import { getAllRoles } from "../controllers/rolesController";
import { addNewProject, updateProject } from "../controllers/projectController";
import { addNewTask } from "../controllers/taskController";
import { authenticate } from "../middlewares/auth.middleware";
const router = Router();


router.post('/user/loginUser', loginUser);
router.post('/user/get_session', authenticate, get_session);

router.post('/project/addNewProject', authenticate, addNewProject);
router.post('/project/updateProject', authenticate, updateProject);

router.post('/task/addNewTask', authenticate, addNewTask);

// router.get('/general/getAllRoles', getAllRoles);
router.post('/general/decryptData', decryptData);


export default router;