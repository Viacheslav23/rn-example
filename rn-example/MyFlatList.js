import React, { Component } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';

class MyFlatList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isRefreshing: false,
    };
  }

  handleLoadMore = () => {
    const { page } = this.state;
    const { makeRequest } = this.props;
    this.setState(
      {
        page: page + 1,
      },
      () => {
        console.log('handleLoadMore function.');
        makeRequest();
      },
    );
  };

  handleRefresh = () => {
    const { makeRefreshRequest } = this.props;
    this.setState(
      {
        page: 1,
      },
      () => {
        console.log('handleRefresh function.');
        makeRefreshRequest();
      },
    );
  };

  renderHeader = () => (
    <SearchBar placeholder="Type Here..." lightTheme round />
  );

  renderFooter = () => {
    const { isLoaded } = this.props;
    if (!isLoaded) return null;

    return (
      <React.Fragment>
        <View
          style={{
            paddingVertical: 20,
            borderTopWidth: 1,
            borderColor: '#CED0CE',
          }}
        >
          <ActivityIndicator animating size="large" />
        </View>
      </React.Fragment>
    );
  };

  clickOnUser = (item) => {
    const { navigation } = this.props;
    const longitude = parseFloat(item.location.coordinates.longitude);
    const latitude = parseFloat(item.location.coordinates.latitude);

    navigation.navigate('Map', {
      latitude,
      longitude,
      isCoords: true,
    });
  };

  render() {
    const { users, isLoaded } = this.props;
    const { isRefreshing } = this.state;
    return (
      <View>
        {isLoaded ? (
          <FlatList
            data={users}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  this.clickOnUser(item);
                }}
              >
                <ListItem
                  title={`${item.name.first} ${item.name.last}`}
                  subtitle={item.email}
                  avatar={{ uri: item.picture.thumbnail }}
                />
              </TouchableOpacity>
            )}
            keyExtractor={item => item.email}
            ListHeaderComponent={this.renderHeader}
            ListFooterComponent={this.renderFooter}
            onRefresh={this.handleRefresh}
            refreshing={isRefreshing}
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={0.5}
          />
        ) : (
          <ActivityIndicator animating size="large" />
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
  isLoaded: state.isLoaded,
});
const mapDispatchToProps = dispatch => ({
  makeRequest: () => {
    dispatch({ type: 'MAKE_REQUEST' });
  },
  makeRefreshRequest: () => {
    dispatch({ type: 'MAKE_REFRESH_REQUEST' });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyFlatList);
