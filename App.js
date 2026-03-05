import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, View, StatusBar, ActivityIndicator, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system/legacy';

export default function App() {
  const webviewRef = useRef(null);
  const [htmlContent, setHtmlContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadHTML();
  }, []);

  async function loadHTML() {
    try {
      const asset = Asset.fromModule(require('./assets/atomviz.html'));
      await asset.downloadAsync();
      const content = await FileSystem.readAsStringAsync(asset.localUri);
      setHtmlContent(content);
      setLoading(false);
    } catch (err) {
      console.error('Error loading HTML:', err);
      setError(err.message);
      setLoading(false);
    }
  }

  const onMessage = useCallback((event) => {
    console.log('WebView message:', event.nativeEvent.data);
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar hidden />
        <ActivityIndicator size="large" color="#00c8ff" />
        <Text style={styles.loadingText}>Cargando AtomViz 3D...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar hidden />
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <WebView
        ref={webviewRef}
        source={{ html: htmlContent, baseUrl: 'https://cdnjs.cloudflare.com' }}
        style={styles.webview}
        originWhitelist={['*']}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowsFullscreenVideo={true}
        mediaPlaybackRequiresUserAction={false}
        mixedContentMode="always"
        allowUniversalAccessFromFileURLs={true}
        allowFileAccessFromFileURLs={true}
        allowFileAccess={true}
        onMessage={onMessage}
        scrollEnabled={true}
        bounces={false}
        overScrollMode="never"
        automaticallyAdjustContentInsets={false}
        contentInsetAdjustmentBehavior="never"

        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn('WebView error: ', nativeEvent);
        }}
        onHttpError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn('WebView HTTP error: ', nativeEvent);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#030912',
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#030912',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#00c8ff',
    marginTop: 16,
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: '#f43f5e',
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
