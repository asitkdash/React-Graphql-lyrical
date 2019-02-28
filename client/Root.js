import React, { Component } from "react";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";

import SongList from "./components/SongList";

const client = new ApolloClient({});

class Root extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <SongList />
      </ApolloProvider>
    );
  }
}

export default Root;
