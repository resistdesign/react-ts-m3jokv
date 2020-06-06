import React, { Component } from "react";
import { render } from "react-dom";
import Hello from "./Hello";
import "./style.css";
import {
  IncarnateRouter,
  IncarnateRoute,
  IncarnateSwitch
} from "incarnate-dom";

interface AppProps {}
interface AppState {
  firstName: string;
  lastName: string;
}

class App extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "Ryan",
      lastName: "Graff"
    };
  }

  onNameInputChange = (event: {
    nativeEvent: {
      data: string;
    };
    target: {
      value: string;
      selectionStart: number;
      selectionEnd: number;
      setSelectionRange: Function;
    };
    preventDefault: Function;
  }) => {
    const {
      nativeEvent: { data = "" } = {},
      target,
      target: { value: name = "", selectionStart = 0, selectionEnd = 0 } = {}
    } = event;
    const [firstName = "", lastName = ""] = name.split("⏎");

    this.setState({ firstName, lastName });
  };

  onNameInputKeyDown = ({ target, target: {value = ''}, nativeEvent: { keyCode, shiftKey } }) => {
    const { selectionStart = 0, selectionEnd = 0 } = target;
    
    if(keyCode === 8 && value[selectionStart - 1] === "⏎"){
      event.preventDefault();
    }else if (keyCode === 13 && shiftKey) {
      event.preventDefault();
      target.setRangeText("⏎");
      target.setSelectionRange(selectionStart + 1, selectionEnd + 1);
    }
  };

  render() {
    const { firstName = "", lastName = "" } = this.state;

    return (
      <IncarnateRouter name="Thing">
        <div>
          <a href="home">Home</a>
          <a href="about">About</a>
        </div>
        <IncarnateRoute subPath="/">
          <IncarnateSwitch defaultSubPath="home">
            <IncarnateRoute subPath="home">
              <h1>Home</h1>
            </IncarnateRoute>
            <IncarnateRoute subPath="about">
              <pre>{JSON.stringify(this.state, null, "  ")}</pre>
              <small>(Press SHIFT+ENTER to Add a new field)</small>
              <br/>
              <textarea
                placeholder="Name"
                value={[firstName, lastName].join("⏎")}
                onChange={this.onNameInputChange}
                onKeyDown={this.onNameInputKeyDown}
              />
            </IncarnateRoute>
          </IncarnateSwitch>
        </IncarnateRoute>
      </IncarnateRouter>
    );
  }
}

render(<App />, document.getElementById("root"));
