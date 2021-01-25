import React from "react";
import axios from "axios";
import { TITLE } from "./utils/constant";
import { Input } from "./component";
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
    };
  }
  //form input
  handleChangeFiled = (value: any, field: string) => {
    this.setState({ [field]: value });
  };

  // http request
  handleRequest_CodeSending = async () => {
    //TODO
    const res = await axios.post();
  };

  handleRequest_Login = () => {
    //TODO
  };

  //normal
  handleSendCode = () => {
    //TODO
  };

  //render
  renderAddtionalElement = () => {
    return (
      <span className="additional" onClick={this.handleSendCode}>
        发送验证码
      </span>
    );
  };

  render() {
    const { firstName, secondName, telephone, code, email } = this.state;
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
