import { Router } from "express";
import { methods as userController} from "./../controllers/user.controller"; //Con esto puedo usar las funciones de user.controller.js


const router = Router();

router.get("/", userController.getUser);
router.post("/", userController.addUser);
router.delete("/:id", userController.deleteUser); //Los dos puntos son porque recibe como parametro el ID
router.put("/:id", userController.updateUser);

export default router; 