import { Redirect } from "expo-router";

export default function Index() {
  const isLoggedIn = false;

  if (isLoggedIn) {
    return <Redirect href="/(drawer)/home" />;
  } else {
    return <Redirect href="/(tabs)/SpotifyLogin" />;
  }
}
