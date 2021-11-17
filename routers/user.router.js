import {
  deleteUser,
  getListUser,
  jion,
  login,
  updateUser,
  uploadImgUser,
} from "../controllers/user.controller";
import { authenticate } from "../middlewares/Auth/authenticate";
import {
  check_rules_jion,
  check_rules_update,
} from "../middlewares/Rules/rules";
import { upload } from "../middlewares/Upload/upload-image";
const express = require("express");
const userRouter = express.Router();
userRouter.post("/jion", check_rules_jion, jion);
userRouter.post("/login", login);
userRouter.post(
  "/uploadImg",
  authenticate,
  upload.single("user_upload"),
  uploadImgUser
);
userRouter.patch("/update", check_rules_update, authenticate, updateUser);
userRouter.get("/", getListUser);
userRouter.delete("/:id", deleteUser);
export default userRouter;
