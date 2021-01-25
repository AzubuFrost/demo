import React from "react";
import axios from "axios";
import { interval } from "rxjs";
import { map, take } from "rxjs/operators";
import { get } from "lodash";
import { TITLE } from "./utils/constant";
import { Input } from "./component";
import { dummy } from "./utils/util";
import "./App.css";

class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      firstName: "",
      secondName: "",
      telephone: "",
      code: "",
      email: "",
      token: "",
      count: 0,
    };
  }
  //form input
  handleChangeFiled = (value: any, field: string) => {
    this.setState({ [field]: value }, () => {
      //additional justify code
      const { telephone } = this.state;
      if (field === "code" && value.length === 6 && !!telephone) {
        this.handleRequest_Login();
      }
    });
  };

  // http request
  handleRequest_CodeSending = async () => {
    const { telephone } = this.state;
    try {
      const res = await axios.post(
        "https://dev-server.unifyxp.com/shopper/sendVerificationCode",
        {
          areaCode: "+86",
          telephone,
          storeUuid: "8028743f-f70d-45ec-9a5f-8fa190ab7105",
        },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      const status = get(res, "data.status");
      const payload = get(res, "data.payload");
      this.setState({ token: payload });
      if (status !== 0) {
        throw Error("request failed");
      }
    } catch (e) {
      console.error(e, "code sending error");
    }
  };

  handleRequest_Login = async () => {
    try {
      const { telephone, code, token } = this.state;
      const res = await axios.post(
        "https://dev-server.unifyxp.com/shopper/login/sms",
        {
          host: "shopper-dev.unifyxp.com",
          clientChannel: "DESKTOP",
          areaCode: "+86",
          telephone,
          token,
          verificationCode: code,
        },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      const status = get(res, "data.status");
      if (status === 0) {
        console.log("登录成功");
      }
    } catch (e) {
      const res = get(e, "response.data", {});
      console.error(res);
      console.error("登录失败", e);
    }
  };

  //normal
  handleSendCode = () => {
    this.handleRequest_CodeSending();
    interval(1000)
      .pipe(
        map((v) => 60 - v),
        take(61)
      )
      .subscribe(
        (num) => {
          this.setState({ count: num });
        },
        dummy,
        () => {
          this.setState({ count: 0 });
        }
      );
  };

  //render
  renderAddtionalElement = () => {
    const { telephone, count } = this.state;
    return (
      <span
        className="additional"
        onClick={telephone && count === 0 ? this.handleSendCode : dummy}
        style={{
          cursor: telephone && count === 0 ? "pointer" : "not-allowed",
        }}
      >
        {count === 0 ? "发送验证码" : `${count}S`}
      </span>
    );
  };

  render() {
    const { firstName, secondName, telephone, code, email, count } = this.state;
    return (
      <div className={"container"}>
        <div className={"body"}>
          <div className="header">{TITLE}</div>
          <div className="form">
            <Input
              field={"secondName"}
              title="姓氏"
              isRequired
              onChange={this.handleChangeFiled}
              value={secondName}
              placeholder="请填写姓氏"
              borderBottomStyle={"solid 1px rgba(0,0,0,0.1)"}
            />
            <Input
              field={"firstName"}
              title="名字"
              isRequired
              onChange={this.handleChangeFiled}
              value={firstName}
              placeholder="请填写名字"
              borderBottomStyle={"solid 1px rgba(0,0,0,0.1)"}
            />
            <Input
              field={"telephone"}
              title="联络电话"
              isRequired
              onChange={this.handleChangeFiled}
              value={telephone}
              placeholder="必填"
              borderBottomStyle={"solid 1px rgba(0,0,0,0.1)"}
            />
            <Input
              field={"code"}
              title="验证码"
              isRequired
              onChange={this.handleChangeFiled}
              value={code}
              placeholder="必填"
              borderBottomStyle={"solid 1px rgba(0,0,0,0.1)"}
              additionalElement={this.renderAddtionalElement()}
              disabled={count === 0}
            />
            <Input
              field={"email"}
              title="E-mail"
              isRequired
              onChange={this.handleChangeFiled}
              value={email}
              placeholder="必填"
              borderBottomStyle={""}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
