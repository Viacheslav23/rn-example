import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Dimensions,
  ActivityIndicator,
  Button,
  ToastAndroid,
  PermissionsAndroid,
} from 'react-native';
import MapView, {
  Marker,
  MAP_TYPES,
  ProviderPropType,
} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

import { styles, customStyle } from './styles';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const markerIDs = ['Marker1', 'Marker2', 'Marker3', 'Marker4', 'Marker5'];

function log(eventName, e) {
  console.log(eventName, e.nativeEvent);
}

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      updatesEnabled: false,
      markerPosition: {
        latitude: 0,
        longitude: 0,
      },
      isMarkerPositionReady: false,
      initialPosition: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      a: {
        latitude: 42,
        longitude: 89,
      },
      b: {
        latitude: 42.01,
        longitude: 89.01,
      },
    };
  }

  componentDidMount() {
    this.getLocation();
  }

  hasLocationPermission = async () => {
    // if (Platform.OS === 'ios'
    //     || (Platform.OS === 'android' && Platform.Version < 23)) {
    //   return true;
    // }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) return true;

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) return true;

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  };

  getLocation = async () => {
    const hasLocationPermission = await this.hasLocationPermission();

    if (!hasLocationPermission) return;

    this.setState({ loading: true }, () => {
      Geolocation.getCurrentPosition(
        ({ coords }) => {
          console.log('Geo coords:', coords);

          const lat = parseFloat(coords.latitude);
          const long = parseFloat(coords.longitude);

          const initialRegion = {
            latitude: lat,
            longitude: long,
          };

          this.setState({
            markerPosition: initialRegion,
            loading: false,
            isMarkerPositionReady: true,
          });
        },
        (error) => {
          this.setState({ markerPosition: error, loading: false });
          console.log(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
          distanceFilter: 50,
        },
      );
    });
  };

  focus1 = async () => {
    this.focusMap([markerIDs[0], markerIDs[1]], true);
  };

  focusMap(markers, animated) {
    this.map.fitToSuppliedMarkers(markers, animated);
  }

  render() {
    const {
      loading,
      initialPosition,
      markerPosition,
      isMarkerPositionReady,
      updatesEnabled,
      a,
      b,
    } = this.state;
    const { navigation, provider } = this.props;
    const userLatitude = navigation.getParam('latitude', 0);
    const userLongitude = navigation.getParam('longitude', 0);
    const isCoords = navigation.getParam('isCoords', false);

    return (
      <View style={styles.container}>
        <MapView
          provider={provider}
          ref={(ref) => {
            this.map = ref;
          }}
          style={styles.map}
          Region={initialPosition}
          mapType={MAP_TYPES.HYBRID}
          // customMapStyle={customStyle}
        >
          <Marker identifier="Marker1" coordinate={a} />
          <Marker identifier="Marker2" coordinate={b} />

          {isMarkerPositionReady && (
            <Marker
              identifier="myLocation"
              coordinate={markerPosition}
              onSelect={e => log('onSelect', e)}
              onDrag={e => log('onDrag', e)}
              onDragStart={e => log('onDragStart', e)}
              onDragEnd={e => log('onDragEnd', e)}
              onPress={e => log('onPress', e)}
              draggable
            />
          )}

          {isCoords ? (
            <Marker
              coordinate={
                userLatitude
                  ? { latitude: userLatitude, longitude: userLongitude }
                  : {
                    latitude: 0,
                    longitude: 0,
                  }
              }
              identifier="userMarker"
              onSelect={e => log('onSelect', e)}
              onDrag={e => log('onDrag', e)}
              onDragStart={e => log('onDragStart', e)}
              onDragEnd={e => log('onDragEnd', e)}
              onPress={e => log('onPress', e)}
              draggable
            />
          ) : null}
        </MapView>
        <Button
          title="Get Location"
          onPress={() => this.getLocation}
          disabled={loading || updatesEnabled}
        />
        <Button
          title="Fit to markers"
          onPress={() => {
            this.map.fitToSuppliedMarkers([markerIDs[0], markerIDs[1]], {
              edgePadding: {
                bottom: 200,
                right: 200,
                top: 200,
                left: 200,
              },
              animated: true,
            });
          }}
        />
        <Button
          title="Fit to my marker"
          onPress={() => {
            this.map.fitToCoordinates([markerPosition], {
              edgePadding: {
                top: 300,
                right: 300,
                bottom: 300,
                left: 300,
              },
              animated: true,
            });
          }}
        />
        <Button
          title="Fit to user marker"
          onPress={() => {
            this.map.fitToSuppliedMarkers(['userMarker'], true);
          }}
        />
        {!isMarkerPositionReady && (
          <ActivityIndicator size="large" color="#0000ff" />
        )}
      </View>
    );
  }
}

Map.propTypes = {
  // eslint-disable-next-line react/require-default-props
  provider: ProviderPropType,
};

const mapStateToProps = state => ({
  users: state.users,
});

export default connect(mapStateToProps)(Map);
