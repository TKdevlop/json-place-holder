import React from "react";
import Posts from "./components/Posts/Posts";
import { Switch, Route, withRouter } from "react-router-dom";
import DetailPosts from "./components/DetailPost";
function App(props) {
  let dynamicUrl = props.history.location.pathname;
  console.log(dynamicUrl);
  let dynamicRoute = null;
  if (dynamicUrl.includes("/post")) {
    dynamicRoute = <Route path={dynamicUrl} component={DetailPosts} />;
  }
  console.log(dynamicUrl);
  return (
    <Switch>
      <Route path="/" component={Posts} exact />
      {dynamicRoute}
    </Switch>
  );
}
export default withRouter(App);
