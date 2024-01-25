import { Router } from "express";
import {
  addUserName,
  addUserPreference,
  createUser,
  loginUser,
  logoutUser,
  readUser,
  readUserCookie,
  updateStarted,
  verifyUser,
} from "../controller/userController";

const router: Router = Router();

router.route("/create-user").post(createUser);
router.route("/verify-user/:ID").patch(verifyUser);
router.route("/login-user").patch(loginUser);
router.route("/update-started/:userID").patch(updateStarted);
router.route("/read-user-cookie").get(readUserCookie);
router.route("/read-user/:userID").get(readUser);
router.route("/logout-user").delete(logoutUser);
router.route("/add-user-name/:userID").patch(addUserName);
router.route("/add-user-pref/:userID").patch(addUserPreference);

export default router;
