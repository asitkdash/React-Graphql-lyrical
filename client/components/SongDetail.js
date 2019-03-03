import React, { Component } from "react";
import { graphql } from "react-apollo";
import { Link } from "react-router";
import songDetailQuery from "../queries/songDetailQuery";
import LyricCreate from "./LyricCreate";
import LyricList from "./LyricList";

class SongDetail extends Component {
  render() {
    const { song } = this.props.data;

    if (!song) {
      return <div>Loading .... </div>;
    }

    return (
      <div>
        <Link to="/">Back</Link>
        <h3>{song.title}</h3>
        <LyricList lyrics={song.lyrics} />
        <LyricCreate songId={this.props.params.id} />
      </div>
    );
  }
}

export default graphql(songDetailQuery, {
  //to send id to fetch data from Query with "query" tag
  //- works differently than mutation
  options: props => {
    return { variables: { id: props.params.id } };
  }
})(SongDetail);
