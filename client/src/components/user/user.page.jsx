import React from "react";
import { useStyles } from "./user.style.page";
import { Container } from "@mui/material";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { RadioGroup, FormControlLabel, Radio, Button } from "@mui/material";
import axios from "axios";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

function UserPage() {
  const classes = useStyles();
  const user1 = JSON.parse(localStorage.getItem("user"));
  const token = user1.token;
  const [user, setUser] = React.useState(user1.customer);
  const [value, setValue] = React.useState(0);
  const [file, setFile] = React.useState("");
  const handleChange1 = (event, newValue) => {
    setValue(newValue);
  };
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async (event) => {
    await axios
      .patch("http://localhost:5000/api/v1/user/update", user, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((res) => {
        const a = {
          customer: res.data.user,
          message: user1.message,
          token: token,
        };
        localStorage.setItem("user", JSON.stringify(a));
        alert("Cập nhật thành công");
        setUser({});
      })
      .catch((err) => {
        console.log(err);
        alert("Cập nhật thất bại, kiểm tra lại định dạng và xác thực");
      });
  };
  const uploadImg = (e) => {
    e.preventDefault();
    console.log(e.target.files[0]);
    setFile({ file: e.target.files[0] });
  };
  const handleUpload = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("user_upload", file);
    console.log(file);
    await axios
      .post("http://localhost:5000/api/v1/user/uploadImg", data, {
        headers: [
          {
            Authorization: `${token}`,
          },
        ],
      })
      .then((res) => {
        console.log(res.data["user-upload"]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(user);
  return (
    <div className={classes.root}>
      <Container>
        <div style={{ height: "74px" }}></div>
        <div className={classes.flexBox}>
          <div className={classes.box}>
            <div className={classes.boxleft}>
              <div className={classes.content}>
                <div className={classes.avtbox}>
                  <div className={classes.avt}></div>
                </div>
                <div>
                  <h5>{user.Name}</h5>
                </div>
                <div>
                  <p>{user.Email}</p>
                </div>
                <div className={classes.boxTabs}>
                  <Box>
                    <Tabs
                      orientation="vertical"
                      variant="scrollable"
                      value={value}
                      onChange={handleChange1}
                      aria-label="Vertical tabs example"
                      sx={{ borderRight: 1, borderColor: "divider" }}
                    >
                      <Tab label="Thông Tin Tài Khoản" {...a11yProps(0)} />
                      <Tab label="Đổi Mật Khẩu" {...a11yProps(1)} />
                    </Tabs>
                  </Box>
                  <form>
                    <h3>Upload Your Emoji</h3>
                    <div className="form-group">
                      <input onChange={uploadImg} type="file" />
                    </div>
                    <div className="form-group">
                      <button
                        className="btn btn-primary"
                        onClick={handleUpload}
                      >
                        Upload
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className={classes.boxright}>
              <div className={classes.content}>
                <TabPanel value={value} index={0}>
                  <div className={classes.mainBox}>
                    <form autoComplete="off">
                      <h3>THÔNG TIN TÀI KHOẢN</h3>
                      <div className={classes.item}>
                        <div className={classes.leftitem}>
                          <p>ID</p>
                        </div>
                        <div className={classes.rightitem}>
                          <div className={classes.rightitem}>
                            <p>{user.ID}</p>
                          </div>
                        </div>
                      </div>

                      <div className={classes.item}>
                        <div className={classes.leftitem}>
                          <p>Name</p>
                        </div>
                        <div className={classes.rightitem}>
                          <input
                            type="text"
                            name="Name"
                            onChange={handleChange}
                            placeholder={user.Name}
                          ></input>
                        </div>
                      </div>

                      <div className={classes.item}>
                        <div className={classes.leftitem}>
                          <p>Phone</p>
                        </div>
                        <div className={classes.rightitem}>
                          <input
                            type="phone"
                            name="Phone"
                            onChange={handleChange}
                            placeholder={user.Phone}
                          ></input>
                        </div>
                      </div>

                      <div className={classes.item}>
                        <div className={classes.leftitem}>
                          <p>Email</p>
                        </div>
                        <div className={classes.rightitem}>
                          <input
                            type="Email"
                            name="Email"
                            onChange={handleChange}
                            placeholder={user.Email}
                          ></input>
                        </div>
                      </div>
                      <div className={classes.item}>
                        <div className={classes.leftitem}>
                          <p>Address</p>
                        </div>
                        <div className={classes.rightitem}>
                          <input
                            type="Address"
                            name="Address"
                            onChange={handleChange}
                            placeholder={user.Address}
                          ></input>
                        </div>
                      </div>
                      <div className={classes.item}>
                        <div className={classes.leftitem}>
                          <p></p>
                        </div>
                        <div className={classes.rightitem}>
                          <Button
                            variant="contained"
                            type="button"
                            onClick={handleSubmit}
                          >
                            Cập Nhật
                          </Button>
                        </div>
                      </div>
                    </form>
                  </div>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <div className={classes.mainBox}>
                    <form autoComplete="off">
                      <h3>ĐỔI MẬT KHẨU</h3>
                      <div className={classes.item}>
                        <div className={classes.leftitem}>
                          <p>Mật khẩu cũ</p>
                        </div>
                        <div className={classes.rightitem}>
                          <input
                            type="password"
                            name="oldpass"
                            placeholder=""
                          ></input>
                        </div>
                      </div>

                      <div className={classes.item}>
                        <div className={classes.leftitem}>
                          <p>Mật khẩu mới</p>
                        </div>
                        <div className={classes.rightitem}>
                          <input
                            type="password"
                            name="newpass"
                            placeholder=""
                          ></input>
                        </div>
                      </div>

                      <div className={classes.item}>
                        <div className={classes.leftitem}>
                          <p>Nhập lại mật khẩu</p>
                        </div>
                        <div className={classes.rightitem}>
                          <input
                            type="password"
                            name="newpass"
                            placeholder=""
                          ></input>
                        </div>
                      </div>

                      <div className={classes.item}>
                        <div className={classes.leftitem}>
                          <p></p>
                        </div>
                        <div className={classes.rightitem}>
                          <Button variant="contained" type="submit">
                            Cập Nhật
                          </Button>
                        </div>
                      </div>
                    </form>
                  </div>
                </TabPanel>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default UserPage;
