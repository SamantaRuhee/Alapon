import React from 'react';
import { View, StyleSheet, FlatList } from "react-native";
import HeaderHome from "../Components/HeaderHome";

// Import getNews from news.js
import { getNews } from '../api/news';
import Article from '../Components/Article';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { articles: [], refreshing: true };
    this.fetchNews = this.fetchNews.bind(this);
  }

  componentDidMount() { this.fetchNews();}

  fetchNews() {
    getNews()
      .then(articles => this.setState({ articles, refreshing: false }))
      .catch(() => this.setState({ refreshing: false }));
  }

  handleRefresh() {
    this.setState(
      {
        refreshing: true
      },
      () => this.fetchNews()
    );
  }

  render() {
    return (
      <View >
          <HeaderHome
            DrawerFunction={() => {
              props.navigation.toggleDrawer();
            }}
          />
      <FlatList
        data={this.state.articles}
        renderItem={({ item }) => <Article article={item} />}
        keyExtractor={item => item.url}
        refreshing={this.state.refreshing}
        onRefresh={this.handleRefresh.bind(this)}
      />
      </View>
    );
  }
}